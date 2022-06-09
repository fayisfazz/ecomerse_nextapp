import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    email:{
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    }},
    {
        timestamps: true
    })

    export default mongoose.models?.customers ? mongoose.models.users : mongoose.model("user", userSchema);