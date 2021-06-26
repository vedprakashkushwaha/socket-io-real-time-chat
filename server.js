const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const Messages = mongoose.model('Messages', {
    name: String,
    message: String
});


const dbUrl = 'mongodb+srv://ved_prakash:YpoMxoFCfRjwUau8@chat-app.xbcra.mongodb.net/node-app?retryWrites=true&w=majority'
mongoose.connect(dbUrl, (err)=>{
    if(err) {
        console.log("unable to connect database\n");
    }
    else{
        console.log("db connected");
    }
    
})

var messages = [
]
app.get('/messages', (req,res) => {
    Messages.find({}, (err, data) => {
        if(err) res.sendStatus(500);
        res.send(data)
    })
})

app.post('/messages', (req,res) => {
    // messages.push(req.body)
    message = new Messages(req.body);
    message.save((err)=>{
        if(err){
            console.log(err);
            res.sendStatus(500);
        }

        io.emit('message', req.body);
        res.sendStatus(200);
    })
})


io.on('connection', (socket) => {
    console.log("socket connected..")
})

const server = http.listen(port, ()=>{
    console.log("server is running on : ", port);
});



