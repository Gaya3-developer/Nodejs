const db = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "PRODUCTAPI";

const User = db.users;
const Login=db.Login


//create user or signUp
const addUser = async (req, res) => {
 
  const { id, u_name, password, role } = req.body;
  
  console.log(req.body);




  

  
  console.log(Login)
  try {
    const existingUser = await User.findOne({where:{ u_name: u_name }});
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const newUser = await User.create({
      id: id,
      u_name: u_name,
      password: hashedPassword,
      role: role,
    });
    
    res.status(201).json({
      user: newUser,
      message:"created user/admin"
      // token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signIn=async (req,res)=>{
  const {u_name,password}=req.body
  console.log(req.body)
  try{
    const existUser=await User.findOne({where:{u_name:u_name}})
    console.log(existUser)
    if(!existUser){
      return res.status(404).json({message:"User not exist:("})
    }
    const matchPassword=await bcrypt.compare(password,existUser.password)
      if(!matchPassword){
        return res.status(400).json({message:"invalid password"})
      }
      const token = jwt.sign(
        { u_name: existUser.u_name, id: existUser.id },SECRET_KEY
      );
        res.status(201).json({
          userName: existUser.u_name,
          message:"Successfully Logged in",
          token: token,
  
        });
      // }).catch(err=>{
      //   console.log(err)
      //   res.status(500).send("There was a error logging in")
      // })

  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}




//get all users

const getAllUsers=(async(req,res)=>{
    let users=await User.findAll({})
    res.status(200).send(users)
})


//gew single user by id
const getSingleUser=(async(req,res)=>{
    let id=req.params.id
    let user=await User.findOne({where:{id:id}})
    res.status(200).send(user)
})


//update user
const updateUser=(async(req,res)=>{
    let id=req.params.id
    let user=await User.update(req.body,{where:{id:id}})
    res.status(200).send(user)
})


//delete product by id
const deleteUser=(async(req,res)=>{
    let id=req.params.id
    await User.destroy({where:{id:id}})
    res.status(200).send(`user ${id} deleted` )
})



module.exports={
  addUser,getAllUsers,updateUser,deleteUser,getSingleUser,signIn
    
}

