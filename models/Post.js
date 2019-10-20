const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  postname: {
    type: String,
    required: true
  },
  name: {
    // username
    type: String
  },
  about: {
    type: String,
    required: true
  },
  attendees: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      }
    }
  ]
});

module.exports = Post = model("post", PostSchema);
