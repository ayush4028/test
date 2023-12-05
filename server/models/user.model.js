import{Schema,model} from "mongoose"

const uSchema=new Schema({

    name:{
        type:'String',
       
        trim:true, // start and ending space trim
        
        },
     email:{
        type:'String',
        lowercase:true,
        trim:true,
        unique:true,
        match:[/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/],
        },    
        address:{

            type:"String",
        },
        phoneNumber:{
            type:"String"
        },
        image: {
            type: 'String', // Assuming the image URL is stored as a string
        },

});
const User=model('User',uSchema);

export default User;