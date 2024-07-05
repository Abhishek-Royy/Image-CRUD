const express = require("express");
const app = express();
const path = require("path");

const databaseConnection = require("./database/db");
const userSchema = require("./models/user.model");

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

/* CREATE */
app.post("/create", async (req, res) => {
  try {
    const { name, email, phone, image } = req.body;
    const createdUser = await userSchema.create({ name, email, phone, image });
    res.redirect("read");
    console.log(createdUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

/* READ */
app.get("/read", async (req, res) => {
  try {
    const readUser = await userSchema.find();
    res.render("read", { readUser }); // Pass readUser to the EJS template
    console.log(readUser);
  } catch (error) {
    console.error("Error reading users:", error);
    res.status(500).send("Internal Server Error");
  }
});

/* UPDATE */
app.get("/edit/:userId", async (req, res) => {
  const updatedUser = await userSchema.findOne({ _id: req.params.userId });
  res.render("edit", { updatedUser });
  console.log(updatedUser);
});

app.post("/update/:userId", async (req, res) => {
  const { name, email, phone, image } = req.body;
  const updatedUser = await userSchema.findOneAndUpdate(
    {
      _id: req.params.userId,
    },
    { name, email, image, phone },
    { new: true }
  );
  res.redirect("/read");
  console.log(updatedUser);
});

/* DELETE */
app.get("/delete/:id", async (req, res) => {
  const deletedUser = await userSchema.findOneAndDelete({
    _id: req.params.id,
  });
  res.redirect("/read");
  console.log(deletedUser);
});

databaseConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server run at:- http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    console.log("Internal & External error");
  });
