import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: String,
    username: {
        type: String,
        unique: true,
        required: true,
    },
});

UserSchema.pre('save', function(next) {

    const user = this;

    // Make sure not to rehash the password if it is already hashed
    if (!user.isModified('password')) { return next(); }

    // Generate a salt and use it to hash the user's password
    bcrypt.genSalt(10, (err, salt) => {

        if (err) { return next(err); }

        bcrypt.hash(user.password, salt, (error, hash) => {

            if (error) { return next(error); }
            user.password = hash;
            next();

        });

    });

});

UserSchema.methods.checkPassword = function(attempt, callback) {

    const user = this;

    bcrypt.compare(attempt, user.password, (err, isMatch) => {
        if (err) { return callback(err); }
        callback(null, isMatch);
    });

};
