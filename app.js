const express = require("express");
const mongoose = require("mongoose");
const Blog = require('./models/blog')

const app = express();
//XOD3PMyGFFTbIe2V
const dbURI =
  "mongodb+srv://bhavi:fezseDsKhwFYg6Mm@cluster0.gdwiclh.mongodb.net/node?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
app.set("view engine", "ejs");
app.use(express.static("public"));

// app.get('/add-blog',(req,res) => {
//   const blog = new Blog({
//     title:'new blog3',
//     snippet:'aboout new blog',
//     body:'more aboout new blog'
//   }) 
//   blog.save()
//   .then((result) => {
//     res.send(result)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// })
// app.get('/all-blog',(req,res) => {
//   Blog.find()
//   .then((result) => {
//     res.send(result)
//   })
//   .catch((er) => {
//     console.log(err)
//   })
// })
// app.get('/single-blog',(req,res) => {
//   Blog.findById('639d6dda8f2db35f1c363767')
//   .then((result) => {
//     res.send(result)
//   })
//   .catch((er) => {
//     console.log(err)
//   })
// })


app.get("/", (req, res) => {
  Blog.find().sort({createdAt : -1})
  .then((result) => {
    res.render("index", { title: "Home", blogs:result });
  })
  // const blogs = [
  //   { title: "blog1", snippet: "nice blog1" },
  //   { title: "blog2", snippet: "nice blog2" },
  // ];

});
app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});
app.get("/create", (req, res) => {
  res.render("create", { title: "create" });
});
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
