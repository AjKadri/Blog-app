import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.get("/posts", (req, res) => {
	res.render("posts");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});