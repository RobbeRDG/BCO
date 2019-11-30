const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    voornaam: {
        type: String,
        required: true,
        trim: true,
    },
    achternaam: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,       
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        //throw new Error({ error: 'Invalid login credentials' })
        return null;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        //throw new Error({ error: 'Invalid login credentials' })
        return null;
    }
    return user;
}

userSchema.statics.findByEmail = async(email) => {
    const user = await User.findOne({email})
    if (user) {
        return user;
    } 
    return null;
}

const User = mongoose.model('User', userSchema)

module.exports = User