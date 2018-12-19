const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//npm install --save validator
const validator = require("validator"); //--package for custom validation
//npm install --save bcryptjs
const bcryptjs = require("bcryptjs");
//npm install --save jsonwebtoken
const jsonwebtoken = require("jsonwebtoken");
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    //validat the format of the email---custom validation
    //now we are doing custom validaton using a package called as validator
    validate: {
      validator: function(value) {
        return validator.isEmail(value);
      },
      message: function() {
        return "invalid email format";
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 128,
    trim: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
    trim: true,
    validate: {
      validator: function(value) {
        return validator.isNumeric(value);
      },
      message: function() {
        return "invalid mobile format";
      }
    }
  },
  tokens: [
    {
      token: {
        type: String
      }
    }
  ]
});

// to define our own instance methods
userSchema.methods.generateToken = function() {
  let user = this;
  console.log(user);
  let tokenData = {
    userId: this._id
  };
  let jwtToken = jwt.sign(tokenData, "supersecret");
  user.tokens.push({ token: jwtToken });

  return user.save().then(function(user) {
    return jwtToken;
  });
};

userSchema.pre("save", function(next) {
  let user = this;
  //console.log("this function was called even before saving the record", this);
  bcryptjs
    .genSalt(10)
    .then(function(salt) {
      bcryptjs.hash(user.password, salt).then(function(encrypted) {
        user.password = encrypted;
        next();
      });
    })
    .catch(function(err) {
      console.log(err);
    });
});

userSchema.statics.findByCredentials = function(email, password) {
  let User = this;
  return User.findOne({ email: email }).then(function(user) {
    if (!user) {
      return Promise.reject("invalid email or password");
    }
    return bcryptjs.compare(password, user.password).then(function(res) {
      if (res) {
        return Promise.resolve(user);
      } else {
        return Promise.reject("invalid email or password");
      }
    });
  });
};

//pre validate - function()
//actual validation
//post validation -function()
//pre save -function()
//actual save
//post save - function()

const User = mongoose.model("User", userSchema);

module.exports = {
  User
};
