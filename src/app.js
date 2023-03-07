const express = require("express")
const path = require("path")
const app = express()
const port = 8080
const IP = "192.168.101.74"

app.set('view engine', 'pug')
app.set('views' , path.join(__dirname, 'views'))

app.listen(port , ()=>{
    console.log("http://" + IP + ":" + port + "/")
})

// TODO ROUTES

app.use(require('./routes/index.route'))

// TODO STATIC FILES

app.use(express.static(path.join(__dirname, '../public')))

app.use((req, res)=>{
    res.sendFile(path.join(__dirname, '../public/404.html'))
})
