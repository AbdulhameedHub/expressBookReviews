const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    const doesExist = (username)=>{
        let userswithsamename = users.filter((user)=>{
          return user.username === username
        });
        if(userswithsamename.length > 0){
          return true;
        } else {
          return false;
        }
      }
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{
        let validusers = users.filter((user)=>{
          return (user.username === username && user.password === password)
        });
        if(validusers.length > 0){
          return true;
        } else {
          return false;
        }
       //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {

        const username = req.body.username;
        const password = req.body.password;
      
        if (!username || !password) {
            return res.status(404).json({message: "Error logging in"});
        }
       if (authenticatedUser(username,password)) {
          let accessToken = jwt.sign({
            data: password
          }, 'access', { expiresIn: 60 * 60 });
      
          req.session.authorization = {
            accessToken,username
        }
        return res.status(200).send("User successfully logged in");
        } else {
          return res.status(208).json({message: "Invalid Login. Check username and password"});
        }});
  //Write your code here
 

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const username = req.params.username;
    users = users.filter((user) => user.username != username);
    res.send(`User ${username} reviews deleted.`);
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
