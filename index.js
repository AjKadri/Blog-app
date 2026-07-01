import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
const posts = []; // saves the posts in memory for now, i will replace this with a database later

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

app.post("/compose", (req, res) => {
	const newPost = {
        id: Date.now(),
		title: req.body.title,
		content: req.body.content,
	};

	posts.push(newPost);
	res.redirect("/posts");
});

app.get("/posts", (req, res) => {
	res.render("posts", { posts });
});

app.get("/posts/:id/edit", (req, res) => {

    const id = Number(req.params.id);

    const post = posts.find(post => post.id === id);

    res.render("edit", { post });

});

app.post("/posts/:id/edit", (req, res) => {
	const id = Number(req.params.id);
	const post = posts.find((post) => post.id === id);

	post.title = req.body.title;
	post.content = req.body.content;

	res.redirect("/posts");
});

// app.post("/posts/:id/edit", (req, res) => {
    //     const id = Number(req.params.id);
    //     const updatedPost = {
    //         id,
    //         title: req.body.title,
    //         content: req.body.content
    //     };
    //     const postIndex = posts.findIndex((post) => post.id === id);
    //     if (postIndex !== -1) {
    //         posts[postIndex] = updatedPost;
    //     }
    //     res.redirect("/posts");
    // });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});