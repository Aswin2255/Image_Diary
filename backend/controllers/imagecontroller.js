import imagemodel from "../models/imagemodel.js";
import cloudstorage from "../services/cloudinary.js";
const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};
export const Imageupload = async (req, res) => {
  try {
    const { image } = req.body;
   const imageurl =  await cloudstorage.uploader.upload(image,opts)
  
    const newimage = new imagemodel({
        userid : req.user,
        imageurl : imageurl.secure_url
    })
    await newimage.save()
    const getallimage = await imagemodel.find({userid:req.user}).sort({_id:-1}).select({imageurl:1})
    res.status(200).json({status:true,getallimage,message:'image uploaded succesfully'})
  } catch (error) {
    console.log(process.env.API_KEY)
    console.log(error)
    res
    .status(400)
    .json({
      status: false,
      errorcode: 2,
      message: "unexpected error ocured",
    });
  }
};

export const getallimage = async (req,res)=>{
    try {
        const getallimage = await imagemodel.find({userid:req.user}).sort({_id:-1}).select({imageurl:1})
        
        res.status(200).json({status:true,getallimage,message:'image fetched sucessfully'})
    } catch (error) {
       res.status(400).json({status:false,message:'unexpected error ocured'})
        
    }
}