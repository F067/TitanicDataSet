import mongoose from 'mongoose'
import pkg from 'bcryptjs';

const { genSalt, hash, compare } = pkg;

let userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

//retirer le mot de passe des recherches en front
userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    },
});

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        // Génération du sel pour le hashage
        const salt = await genSalt(10);

        // Hashage du mot de passe
        const hashedPassword = await hash(this.password, salt);

        // Remplacement du mot de passe clair par le mot de passe hashé
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// bon mot de passe?
userSchema.methods.matchPassword = async function (password) {
    try {
        return await compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

let userModel = mongoose.model("users", userSchema)

export default userModel