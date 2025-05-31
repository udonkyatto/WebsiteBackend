import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js"

// app 配置
const app=express()
const port = 4000

// 中间件
app.use(express.json())
app.use(cors())

// db 连接
connectDB()

// api 节点
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))

app.use('/api/user',userRouter)
app.use("/api/cart",cartRouter)

app.get("/",(req,res)=>{
    res.send("Api Working")
})

app.listen(port,() => {
    console.log(`Server Started on http://localhost:${port}`)
})

