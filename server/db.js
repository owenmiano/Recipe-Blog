const mongoose=require('mongoose')
const mongoURI=`mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.q4r64.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`
const connectDB=async()=>{
    try {
        await mongoose.connect(mongoURI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
    } catch (err) {
        console.error(err)
    }
}

module.exports=connectDB