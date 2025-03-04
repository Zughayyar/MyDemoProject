const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [3, "First name must be at least 3 characters"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [3, "Last name must be at least 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email address'
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"]
    }
}, {timestamps: true});


UserSchema.virtual('confirmPassword')
    .get(function() {
        return this._confirmPassword;
    })
    .set(function(value) {
        this._confirmPassword = value;
});

UserSchema.pre('validate', function(next) {
    if (this.password !== this._confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords do not match');
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then((hashedPassword) => {
        this.password = hashedPassword;
        next();
    }).catch(next)
})


module.exports.User = mongoose.model('User', UserSchema);