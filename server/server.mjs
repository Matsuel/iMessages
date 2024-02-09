import express from 'express';
import { createServer } from 'http';
import {Server} from 'socket.io';
import cors from 'cors';
import {connectMongo} from './Functions/ConnectMongo.mjs';
import {login} from './Sockets/Login.mjs';
import {register} from './Sockets/Register.mjs';
import { getConversations, createConversation, getMessages, newMessage } from './Sockets/Conversations.mjs';
import {getUsers} from './Sockets/Users.mjs';
import {Message} from './Models/Message.mjs';
import {Conversation} from './Models/Conversation.mjs';
import jwt from 'jsonwebtoken';
import checkToken from './Functions/CheckToken.mjs';
const secretTest = "84554852585915452156252015015201520152152252"


const app = express();
app.use(cors())
const server = createServer(app);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

let connectedUsers = {};

connectMongo();

io.on('connection', (socket) => {

    socket.on('synchro', (data) => {
        if (!connectedUsers[data.userId]) {
            connectedUsers[data.userId] = socket;
            console.log(Object.keys(connectedUsers));
        }
    })

    socket.on('newmessage', async (data) => {
        const { cookies, conversation_id, content } = data;
        if (await checkToken(cookies)) {
            const sender_id = jwt.verify(cookies, secretTest).userId;
            let message = new Message({ sender_id, conversation_id, date: new Date().toISOString(), content });
            await message.save();
            socket.emit('newmessage', { sent: true });
            otherSynchroMessage(cookies, conversation_id);
        } else {
            socket.emit('newmessage', { sent: false });
        }
    })

    async function otherSynchroMessage (cookies, conversation_id) {
        const sender_id = jwt.verify(cookies, secretTest).userId;
        const conversation = await Conversation.findById(conversation_id);
        const otherId = conversation.users_id.filter((id) => id !== sender_id)[0];
        if (connectedUsers[otherId]) connectedUsers[otherId].emit('syncmessages', {messages : await Message.find({ conversation_id })});
    }



    login(socket);
    register(socket);
    getConversations(socket);
    createConversation(socket);
    getMessages(socket);
    // newMessage(socket); 

    getUsers(socket);
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});

export default server;