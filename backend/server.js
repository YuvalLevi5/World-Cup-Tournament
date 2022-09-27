const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const http = require('http').createServer(app)

app.use(express.static('public'))
app.use(express.json())

const authRoutes = require('./api/auth/auth.routes')

if (process.env.NODE_ENV === 'production') {
    console.log("production")
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    console.log("DEV")
    const corsOptions = {
        origin: ['http://127.0.0.1:5173', 'http://127.0.0.1:8080',
            'http://localhost:8080', 'http://127.0.0.1:3000',
            'http://localhost:3000', 'http://127.0.0.1:3030',
            'http://localhost:3030', 'http://localhost:5173'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

app.use('/api/auth', authRoutes)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


const port = process.env.PORT || 3030
http.listen(port, () => {
    console.log('server is running on port' + port)
})