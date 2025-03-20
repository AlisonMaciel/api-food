require("express-async-errors")
require("dotenv/config")

const cookieParser = require("cookie-parser")
const cors = require("cors")
const express = require("express")
const routes = require("./routes/index.js")

const AppError = require("./utils/AppError.js")
const { UPLOADS_FOLDER } = require("./config/uploads.js")

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true
}))
app.use("/files", express.static(UPLOADS_FOLDER))

app.use(routes)

app.use((error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            message: error.message,
            status: "error"
        })
    }

    return response.status(500).json({
        message: "Erro interno no servidor"
    })
}) 

const PORT = process.env.PORT || 8080 

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))