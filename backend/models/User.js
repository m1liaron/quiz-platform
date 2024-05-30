const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name:{
      type: String,
      required: [true, 'Please enter a name'],
  },
  email: {
      type: String,
      required:[true, 'Please provide email'],
      match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Please provide a valid email',
      ],
      unique: true // unique index
  },
  password: {
      type: String,
      required: [true, 'Please enter a password'],
  },
  profile_picture:{
    type: String,
  },
  own_quizzes: [
      {
          quizId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Quiz',
          },
          title: {
              type: String,
          }
      }
  ],
  completed_quizzes: [
        {
           title: {
               type: String,
               required: true,
           },
            resultId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Result',
            }
        }
    ]
}, { timestamps: true })

UserSchema.pre('save', function(next){ // functions to hash password before save
    const user = this;
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err){
            return next(err)
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err){
                return next(err)
            }
            user.password = hash;
            next()
        })
    })
})

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, name: this.name },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    )
}

UserSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve, reject)=>{
        bcrypt.compare(candidatePassword, user.password, (err, isMatch)=>{
            if(err){
                return reject(err)
            }
            if(!isMatch){
                return reject(err)
            }
            resolve(true)
        })
    })
}

const User = mongoose.model('User', UserSchema);

module.exports = User;