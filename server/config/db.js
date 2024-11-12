import mongoose from 'mongoose'




export const connectDB = async() => {
    try{

      mongoose.connect(process.env.MONGODB_URL)
      console.log("Datebases Connected Successfully")
    }catch(err){
        console.log(err)

    }

}