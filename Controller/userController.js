const { json } = require("express");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

const { route } = require("../router/userRouter");
const { ConnectionStates } = require("mongoose");

const register = async (req, res) => {
console.log(req.body);
const images=req.file.filename
  console.log(req.file);
//  const image= req.file.filename
//  console.log(req.file.filename);

 const {name,email,password}=req.body

  const data = await userModel.create({ name, email, password,image:images});
  // console.log(data);
  const token = jwt.sign({ user_id: data._id }, process.env.SECRET_KEY);

  res
    .cookie("Register_token", token, {
      httpOnly: true,
    })
    .send(data);
  console.log(req.cookies);
  // res.status(201).send({token,data})
};

const getImage=async(req,res)=>{
     const image=await userModel.find()
     console.log(image);
}

const login = async (req, res) => {

  const { email, password } = req.body;
  const data = await userModel.findOne({ email: email, password: password });
  console.log(data);

  if (data) {
    const token = jwt.sign({ user_id: data._id }, process.env.SECRET_KEY);
    res.cookie(
      "Login_token",
      token,
      {
        httpOnly: true,
      },
      // { session: false }
    );

    res.status(201).send("logined");
  } else if (email=="admin@gmail.com" && password=="admin123") {
    const login_token=jwt.sign({admin_id:"678468364824"},process.env.SECRET_KEY);
    res.cookie(
      "admin_token",
       login_token,
      {
        httpOnly:true,
    })
    res.send("ok")
  } else {
    res.send("not logined")
  }
  // data ? res.status(201).send(true) : res.send(false);
};

const logout = async (req, res) => {
  res
    .cookie("Login_token", "", {
      expires: new Date(0),
    })
    .send("logout");
};
const loggedIn = async (req, res) => {
  const token = req.cookies.Login_token; // Assuming the cookie name is "Register_token"

  if (!token) {
    return res.json(false); // No token found, user is not logged in
  }

  // Verify the JWT token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      // JWT verification failed, handle the error
      console.error(err);
      return res.json(false); // User is not logged in due to verification failure
    }

    // JWT verification successful, user is logged in
    res.json(true);
  });
};

const adminLogged=async(req,res)=>{
   const token=req.cookies.admin_token
   if (!token) {
    return res.json(false)
   }
   
   jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
      if (err) {
        return res.json(false)
      }
      res.json(true)
   })

}

const getUser = async (req, res) => {
  const token = req.cookies.Login_token;
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  console.log(decoded);
  //  res.send(decoded.user_id)
  const data = await userModel.findById(decoded.user_id);
  console.log(data.image);
  res.send(data);
};

const userData = async (req, res) => {
  const model = await userModel.find();
  res.send(model);
};

const userDelete = async (req, res) => {
  const { id } = req.body;
  // console.log(id);
  const model = await userModel.findByIdAndDelete({ _id: id });
  if (model) {
    console.log("deleted");
  } else {
    console.log("not deleted");
  }
  res.send("deleted");
};

const findUser = async (req, res) => {
  // "dsmdsklmlskm"
  const { id } = req.body;

  const model = await userModel.findById({ _id: id });
  res.send(model);
  if (model) {
    console.log(model);
  } else {
    console.log("Server Error");
  }
};

const UpdateUser = async (req, res) => {
  const { name, email } = req.body;
  const model = await userModel.findOneAndUpdate({ name: name, email: email });
  if (model) {
    console.log("updated");
  } else {
    console.log("not updated");
  }
};

module.exports = {
  register,
  login,
  logout,
  loggedIn,
  getUser,
  userData,
  userDelete,
  findUser,
  UpdateUser,
  adminLogged,
  getImage
};
