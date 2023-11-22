import exportAdmin from "../model/admin";
import bcrypt from "bcrypt";

const AdminsignUp =async (req, res)=> {
    //check if the email already exists
    const checkEmail = await exportAdmin.findOne({email: req.body.email})
    if(checkEmail) return res.status(409).send("This email already exists");
    
    //decrypt the password
    const passwordHashValue = await bcrypt.genSalt(10);
    const passwordHashed =  await bcrypt.hash(req.body.password, passwordHashValue);

// Create a new admin user object with hashed password
    const userSignUp = new exportAdmin({
        name:req.body.name,
        email:req.body.email,
        password:passwordHashed
    })
    //save user to the database 
    await userSignUp.save();
    res.send(userSignUp);

}

export default AdminsignUp;