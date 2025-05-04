const { Schema, model } = require('mongoose')


const UserSchema = new Schema({
    userName: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowerCase: true,
        maxLength: 30,
        minLength: 3
    },
    userEmail: {
        type: String,
        match: [/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,"Formato de email incorrecto"],
        unique: true
    },
    password: {
        type: String,
        minLength: [8, 'Limite minimo 8 caracteres']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    status:{
        type: Boolean,
        default: false
    }
})

const UserModel = model('usuarios', UserSchema)

module.exports = UserModel