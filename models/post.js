const mongoose = require('mongoose');
// Optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
  },  
  content: {
    type: String,
  },
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);