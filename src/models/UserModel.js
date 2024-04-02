const { Schema, models, model } = require("mongoose");
var bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  name:{type: String},
  email: {type: String, required: true, unique: true},
  password: {
    type: String, 
    required: true,
  },
  image: {type:String},
}, {timestamps: true});

export const User = models.User || model('User', UserSchema);