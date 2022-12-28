const {model, Schema} = require("mongoose")

const testSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    }
})

module.exports = model("test", testSchema)