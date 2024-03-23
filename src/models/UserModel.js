const { Schema, models, model } = require("mongoose");
var bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {
    type: String, 
    required: true, 
    validate: pass => {
      if(!pass?.length || pass.length < 5){
        new Error("password must have 5 characters.");
        return false;
      }
    }}
}, {timestamps: true});

UserSchema.post('validate', function(user) {
  const password = user.password;
  const salt = bcrypt.genSaltSync(10);
  const hashedPwd = bcrypt.hashSync(password, salt);
  user.password = hashedPwd;
})
export const User = models.User || model('User', UserSchema);