const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const forgot= require('./controllers/forgot');
const resetpassword= require('./controllers/resetpassword');

require("dotenv").config();

//Middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let storage = multer.memoryStorage();
let upload = multer({ storage: storage }).single("image");

const cors = require("cors");
app.use(cors({ credentials: true }));

const database = require("./database");

// app.listen(process.env.PORT, () => {
//   console.log(`Ready on port ${process.env.PORT}`);
// });

app.listen(5000, () => {
  console.log(`Ready on port ${5000}`);
});
// //Root
app.get("/", require("./controllers/root.js"));
// //Topic
app.post("/topic", upload, require("./controllers/postTopic.js"));
app.get("/topic/:id", require("./controllers/getTopic.js"));
app.get("/topic/", require("./controllers/getTopics.js"));
app.delete("/topic/:id", require("./controllers/deleteTopic.js"));
app.get("/topicPie", require("./controllers/getTopicPieChart.js"));
app.get("/categoryTopics/:id", require("./controllers/getCategoryTopics.js"));
app.patch("/topic/:id", require("./controllers/patchTopic.js"));
app.patch(
  "/topicImage/:id",
  upload,
  require("./controllers/patchTopicImage.js")
);

// // //Opinion
app.get("/opinions/topic/:id", require("./controllers/getOpinionsTopic.js"));
app.get("/opinion/:id", require("./controllers/getOpinion.js"));

app.get("/opinions", require("./controllers/getOpinions.js"));
app.post("/opinion", require("./controllers/postOpinion.js"));
app.delete("/opinion/:id", require("./controllers/deleteOpinion.js"));
app.patch("/opinion/:id", require("./controllers/patchOpinion.js"));
//Comment
app.get("/comments", require("./controllers/getComment.js"));
// app.get("/comments", require("./controllers/getComments.js"))
app.post("/comment", require("./controllers/postComment.js"));
app.delete("/comment/:id", require("./controllers/deleteComment.js"));
app.patch("/comment/:id", require("./controllers/patchComment.js"));
app.get("/commentPie", require("./controllers/getCommentPie.js"));
// // //Users
app.get("/users", require("./controllers/getUsers.js"));
app.patch("/user", require("./controllers/patchUser.js"));
app.patch("/password", require("./controllers/patchPassword.js"));
app.patch("/avatar", upload, require("./controllers/patchAvatar.js"));
app.get("/user/:id", require("./controllers/getUser.js"));
app.delete("/user/:id", require("./controllers/deleteUser.js"));

// //Categories
app.post("/category", require("./controllers/postCategory.js"));
app.get("/categories", require("./controllers/getCategories.js"));
//SignUp
app.post("/signup", upload, require("./controllers/postSignup.js"));
app.post(
  "/signupAvatar",
  upload,
  require("./controllers/postSignupWithAvatar.js")
);
//Login
app.post("/login", require("./controllers/postLogin.js"));
//Upvotes
app.get("/opinion/upvotes/:id", require("./controllers/getUpvotes.js"));
//Profile
app.get("/profile", require("./controllers/getProfile.js"));
//Ranking
app.get("/rankings", require("./controllers/getRankings.js"));
app.get("/ranking", require("./controllers/getRanking.js"));
app.get("/rankingsIncognit", require("./controllers/getRankingsIncognit.js"));
app.patch("/comment/:id", require("./controllers/patchComment.js"));
//Upvote
app.patch("/opinion/:id", require("./controllers/patchOpinion.js"));
//Yesvote/Novote
app.patch("/vote/:id", require("./controllers/patchTopic.js"));
//Adding pictures
app.use(express.static(path.join(__dirname, "photos")));

//SendEmail
app.use("/api",forgot)
app.use("/api",resetpassword)