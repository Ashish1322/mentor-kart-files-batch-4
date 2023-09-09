const mongoose = require("mongoose")

// [5,6,7]
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ""
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        enum: ["male","female","others"],
        default: "male",
        required: true
    },
    todos: [
        {
            title: String,
            description: String,
            completed: {
                type: Boolean,
                default: false,
                required: true
            }
        }
    ]
})

const User = mongoose.model("User1234",userSchema)

module.exports = {User}