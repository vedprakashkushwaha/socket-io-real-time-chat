const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);



app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var messages = [
    {
        name: "ved",
        message: "Hi"
    }, {
        name: "kamal",
        message: "hello"
    }
]
app.get('/messages', (req,res) => {
    res.send(messages)
})

app.post('/messages', (req,res) => {
    messages.push(req.body)
    io.emit('message', req.body);
    res.sendStatus(200);
})


io.on('connection', (socket) => {
    console.log("socket connected..")
})
const PORT = 3010;
http.listen(PORT, ()=>{
    console.log("server is running on : ", PORT);
});



