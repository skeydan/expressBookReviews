const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

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

const authenticatedUser = (username,password)=>{
  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});

// Get the book list available in the shop using promises
public_users.get('/promise/',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });
    get_books.then(() => console.log("Promise: book list sent"));
  });

// Get the book list available in the shop using async-await
public_users.get('/async/', async function (req, res) {
  try {
    await new Promise(resolve => setTimeout(resolve, 10)); // Simulating an async operation
    res.send(JSON.stringify({ books }, null, 4));
    console.log("Async: book list sent");
  } catch (error) {
    console.error("Error while getting book list:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
 });

// Get book details based on ISBN using promises
public_users.get('/promise-isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  book_for_isbn = new Promise((resolve, reject) => {
    resolve(res.send(books[isbn]));
  });
  book_for_isbn.then(() => console.log("Promise: book for isbn was sent"));
 });

// Get book details based on ISBN using async-await
public_users.get('/async-isbn/:isbn',async function (req, res) {  
  try {
    const isbn = req.params.isbn;
    await new Promise(resolve => setTimeout(resolve, 10)); // Simulating an async operation
    res.send(books[isbn]);
    console.log("Async: book for isbn was sent");
  } catch (error) {
    console.error("Error while getting book for isbn:", error);
    res.status(500).json({ message: "Internal server error" });
  }
 });



// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  author = req.params.author;
  Object.entries(books).forEach(([key, value]) => {
    if (value.author === author) {
      return res.send(JSON.stringify(value,null,4));
    }
  });
});

// Get book details based on author using promises
public_users.get('/promise-author/:author',function (req, res) {
  author = req.params.author;
  book_for_author = new Promise((resolve, reject) => {
  Object.entries(books).forEach(([key, value]) => {
    if (value.author === author) {
      res.send(JSON.stringify(value,null,4));     
    }
  });
});
  book_for_author.then(() => console.log("Promise: book for author was sent"));
});


// Get book details based on author using async-await
public_users.get('/async-author/:author',async function (req, res) {
  author = req.params.author;
  try {
  await new Promise(resolve => setTimeout(resolve, 10)); // Simulating an async operation
  Object.entries(books).forEach(([key, value]) => {
    if (value.author === author) {
      return res.send(JSON.stringify(value,null,4));
    }
  });
  console.log("Async: book for author was sent");
  } catch (error) {
    console.error("Error while getting book for author:", error);
    res.status(500).json({ message: "Internal server error" });
  }  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  title = req.params.title;
  Object.entries(books).forEach(([key, value]) => {
    if (value.title === title) {
      return res.send(JSON.stringify(value,null,4));
    }
  });
});

// Get all books based on title using promises
public_users.get('/promise-title/:title',function (req, res) {
  title = req.params.title;
  book_for_title = new Promise((resolve, reject) => {
  Object.entries(books).forEach(([key, value]) => {
    if (value.title === title) {
      res.send(JSON.stringify(value,null,4));     
    }
  });
});
  book_for_title.then(() => console.log("Promise: book for title was sent"));
});

// Get book details based on title using async-await
public_users.get('/async-title/:title',async function (req, res) {
  title = req.params.title;
  try {
  await new Promise(resolve => setTimeout(resolve, 10)); // Simulating an async operation
  Object.entries(books).forEach(([key, value]) => {
    if (value.title === title) {
      return res.send(JSON.stringify(value,null,4));
    }
  });
  console.log("Async: book for title was sent");
  } catch (error) {
    console.error("Error while getting book for title:", error);
    res.status(500).json({ message: "Internal server error" });
  }  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
