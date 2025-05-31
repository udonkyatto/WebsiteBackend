import userModel from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

// login user
const loginUser = async (req, res) => {
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email})
        if(!user) {
            return res.json({success: false,message: "User Dosen't exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) {
            return res.json({success: false,message: "Invalid credentials"})
        }

        const token = createToken(user._id)
        res.json({success: true,token})
    } catch (error) {
        console.log(error)
        res.json({success: false,message:"Error"})
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// 注册 user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body
    try {
        // 检查用户是否已存在
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already exisits" })
        }

        // 验证邮箱格式 & 强密码要求
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a vaild email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // 对用户密码进行加密
        const salt = await bcrypt.genSalt(10)// 生成盐值
        const hashedPassword = await bcrypt.hash(password, salt)// 使用盐值对用户的密码进行加密，返回加密后的密码
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        })

        const user = await newUser.save()
        // 生成 JWT token
        const token = createToken(user._id)
        res.json({ success: true, token })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}
export { loginUser, registerUser }