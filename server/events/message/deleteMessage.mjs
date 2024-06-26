import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Conversation } from '../../Models/Conversation.mjs';
import { sendLastDeletedMessage } from '../../Functions/Message.mjs';
import checkToken from '../../Functions/CheckToken.mjs';
dotenv.config();
const secretTest = process.env.SECRET;

export const deleteMessage = (socket, connectedUsers) => {
    return async (data) => {
        const { cookies, message_id, conversationActive } = data;
        if (await checkToken(cookies)) {
            const sender_id = jwt.verify(cookies, secretTest).userId;
            let MessageModel = mongoose.model('Messages' + conversationActive);
            const messageToDelete = await MessageModel.findById(message_id);
            if (messageToDelete.sender_id === sender_id) {
                await MessageModel.deleteOne({ _id: message_id });
                let lastMessage = await MessageModel.findOne().sort({ date: -1 });
                let conversation = await Conversation.findById(conversationActive);
                conversation.last_message_date = lastMessage ? lastMessage.date : new Date().toISOString();
                conversation.last_message_content = lastMessage ? lastMessage.content : null;
                conversation.last_message_sender = lastMessage ? lastMessage.sender_id : null;
                await conversation.save();
                // au leiu d'envoyer ça fo envoyer l'id du message supprimé
                // otherSynchroMessage(cookies, conversationActive, connectedUsers);
                sendLastDeletedMessage(conversationActive, connectedUsers, message_id, sender_id);
                socket.emit('deletemessage', { deleted: true, message_id: message_id });
                socket.emit('syncconversations')
            }

        }
    }
}