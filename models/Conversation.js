const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  user1: {
    type: Schema.Types.ObjectId,
    ref: 'user1',
  },
  user2: {
    type: Schema.Types.ObjectId,
    ref: 'user2',
  },
  messages: [
    {
      fromUser: {
        type: Schema.Types.ObjectId,
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
