import mongoose from "mongoose";
const imageschema = new mongoose.Schema({
    userid : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
    },
    imageurl : {
        type : String,
    }
    
},{
    timestamps : true
})
const imagemodel = mongoose.model("image",imageschema)
export default imagemodel