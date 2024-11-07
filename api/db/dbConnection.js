const  mongoose = require('mongoose')

const connectDb = async () =>{
    try{
        await mongoose.connect(process.env.URI);
        console.log(`Successful connected to database`)
    }catch(error){
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

module.exports = connectDb;