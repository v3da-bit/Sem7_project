const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },

    cpassword: {

        type: String,
        require: true
    },
    voterId: {
        type: String,
        require: true
    },
    isVoted:{
        type:Boolean,
        require:true
    },
    confirmationCode:{
        type:String,
        require:true
    },
    tokens: [
        {
            token: {
                type: String,
                require: true
            }
        }
    ],
    faceResult:{
        x:{
            type:Number,
            require: true
        },
        y:{
            type:Number,
            require:true
        },
        score:{
            type:Number,
            require:true
        }
    },
    date: {
        type: Date,
        default: Date.now()
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    messages: [
        {
            name: {
                type: String,
                require: true
            },
            email: {
                type: String,
                require: true
            },
            phone: {
                type: Number,
                require: true
            },
            subject: {
                type: String,
                require: true
            },
            message: {
                type: String,
                require: true
            }

        }
    ]
})

userSchema.pre('save', async function (next) {
    console.log("pre func called")
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)

    }
    next();
})
userSchema.methods.generateToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token })
        await this.save()
        return token
    } catch (err) {
        console.log(err);
    }
}
// userSchema.methods.voterId=async function(){
//     try{

//     }
// }
userSchema.methods.contactUs = async function (name, email, phone, subject, message) {
    try {
        console.log(name, email, phone, subject, message)
        this.date = this.date
        this.messages = this.messages.concat({
            name,
            email,
            phone,
            subject,
            message

        })
        await this.save()
    } catch (err) {
        console.log(err)
    }
}

const User = mongoose.model('VOTING_SYSTEM', userSchema)

module.exports = User
