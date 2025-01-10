import express from 'express';
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let storage = [
  { name: "Alice", title: "The Beauty of Nature", text: "Nature is a beautiful and essential part of our lives." },
  { name: "John", title: "Technological Advances", text: "Technology has changed the way we live, work, and communicate." }
];

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/blog", (req, res) => {
  res.render("blog.ejs");
});

app.get("/read", (req, res) => {
  res.render("read.ejs", { storage });
});

app.post("/newPost", (req, res) => {
  const { name, title, text } = req.body;
  const post = { name: name || "Anonymous", title: title || "Untitled", text: text || "No content provided" };
  storage.push(post);
  res.redirect("/read");
});

app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  storage.splice(id, 1);
  res.redirect("/read");
});

app.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  const post = storage[id];
  if (post) {
    res.render("edit.ejs", { post, id });
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, title, text } = req.body;
  storage[id] = { name, title, text };
  res.redirect("/read");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
