/* eslint-disable no-useless-escape */
import { Schema, model } from 'mongoose';

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('card', cardSchema);
