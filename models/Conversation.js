const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user1',
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user2',
  },
  messages: [
    {
      fromUser: {
        type: Number, //One stands for User1, Two stands for User2
        ref: 'fromUser',
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = Conversation = mongoose.model(
  'conversation',
  ConversationSchema
);
