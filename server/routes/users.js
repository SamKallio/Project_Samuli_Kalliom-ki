var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs"); //Handles hashing
const { body, validationResult } = require("express-validator"); //Handles validation for login/register
const User = require("../models/User"); //User Model schema
const Posts = require("../models/Posts"); //Posts Model schema
const Comments = require("../models/Comments"); //Comments Model schema
const Votes = require("../models/Votes"); //Votes Model schema
const jwt = require("jsonwebtoken"); //For using jsonwebtoken authorization/authenication
const validateToken = require("../auth/validateToken"); //Handles token validation

//Variables for configuring user register values
const conf = {
  passMinLength: 8,
  passMaxLength: 256,
  userMinLength: 1,
  userMaxLength: 256,
  minPassNumbers: 1,
  minPassSymbols: 1,
  minPassLowercase: 1,
  minPassUppercase: 1,
};

/* 
------------
GET
------------
*/

router.get("/sample", async (req, res) => {
  //This is just for creating sample post to test the site
  const posts = await Posts.find({});

  if (posts.length <= 0) {
    let date = new Date();

    const newP = await Posts.create({
      title: "Hello World!",
      textContent: "function test() {console.log('Hello World')}",
      date: date.toDateString(),
      username: "mystinen mies",
    });
    await newp.save();
  }
  return res.send("ok");
});

//This route is for getting all the posts
router.get("/user/posts", async (req, res) => {
  try {
    const posts = await Posts.find({});

    if (posts && posts.length > 0) {
      res.json(posts);
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
});

//This route is for getting all the posts
router.get("/user/comments/:id", async (req, res) => {
  try {
    //Try to find comment from Comments document by using the :id provided
    await Comments.find({ postId: req.params.id }, (err, comments) => {
      if (err) return next(err);

      return res.json(comments);
    });
  } catch (error) {
    console.error(error);
  }
});

//For retrieving specific post by id
router.get("/user/posts/:id", async (req, res, next) => {
  try {
    //Try to find post from Posts document by using the :id provided
    await Posts.findOne({ _id: req.params.id }, (err, post) => {
      if (err) return next(err);

      return res.json(post);
    });
  } catch (error) {
    console.error(error);
  }
});

//For retrieving votes to specific post or comment
router.get("/votes/:id", async (req, res, next) => {
  try {
    //Try to find vote from Votes document by using the :id provided
    await Votes.findOne({ voteId: req.params.id }, (err, vote) => {
      if (err) return next(err);
      if (!vote) {
        return res.json({ votes: "0" });
      }

      return res.json(vote);
    });
  } catch (error) {
    console.error(error);
  }
});

/* 
------------
POSTS
------------
*/

//For voting a post or comment
router.post("/votes", validateToken, async (req, res, next) => {
  console.log(req.body);
  if (!req.body.id) {
    return res
      .status(400)
      .send("Id of post/comment is missing for some reason");
  }
  try {
    let vote = await Votes.findOne({ voteId: req.body.id });

    if (!vote) {
      // Create new vote if there is no vote yet
      await Votes.create({
        voteId: req.body.id,
        votes: 1,
        users: req.email.email,
      });
    } else {
      // Check if user has voted already
      if (!vote.users.includes(req.email.email)) {
        // If user has not voted, we will add it and push it into the array
        vote.votes++;
        vote.users.push(req.email.email);
        await vote.save(); //Save changes!
      }
    }
    //Fetch the value again from the mongo to make sure its updated before returning...
    vote = await Votes.findOne({ voteId: req.body.id });
    // Return the updated value
    return res.json(vote);
  } catch (error) {
    console.error(error);
  }
});

//For comments posts
router.post("/user/comments/:id", validateToken, async (req, res, next) => {
  if (!req.body) {
    return res
      .status(400)
      .send("Something went wrong with your post. Was it empty?");
  }
  //Try to catch errors
  try {
    //To make sure the user exists and we'll use its name for creating the comment
    const user = await User.findOne({ email: req.email.email });
    //If we can find that user we will create a new post in database

    //Create a date before we assign it to post
    let date = new Date();

    //Create new comment
    if (user) {
      Comments.create({
        postId: req.params.id,
        textContent: req.body.textContent,
        date: date.toDateString(),
        username: user.username,
        votes: 0,
      });
    } else {
      return res.status(404).send("Invalid user");
    }
  } catch (error) {
    console.error("Error fetching while fetching user: ", error);
    return res.status(404).send(error);
  }
  return res.json({ commentSuccess: "true" });
});

//For user posts
router.post("/user/posts", validateToken, async (req, res, next) => {
  if (!req.body) {
    return res
      .status(400)
      .send("Something went wrong with your post. Was it empty?");
  }
  //Try to catch errors
  try {
    //To make sure the user exists and we'll use its name for creating the post
    const user = await User.findOne({ email: req.email.email });
    //If we can find that user we will create a new post in database

    //Create a date before we assign it to post
    let date = new Date();

    //Create a new post
    if (user) {
      Posts.create({
        title: req.body.title,
        textContent: req.body.textContent,
        date: date.toDateString(),
        username: user.username,
        votes: 0,
      });
    } else {
      return res.status(404).send("Invalid user");
    }
  } catch (error) {
    console.error("Error fetching while fetching user: ", error);
    return res.status(404).send(error);
  }
  return res.json({ postSuccess: "true" });
});

//Used to login the user, check email and password and try to find a matching user from the database
router.post(
  "/user/login",
  body("email").isEmail(),
  body("password").isLength({
    min: conf.passMinLength,
  }),
  async (req, res, next) => {
    //Try to find the user
    const findEmail = await User.findOne(
      { email: req.body.email },
      (err, email) => {
        if (err) throw err;

        if (!email) {
          return res.status(403).send("Login failed!");
        } else {
          //Compare the input password to password found in the database, if its  a match, then we can login
          bcrypt.compare(req.body.password, email.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              //Creating the token
              const jwtPayload = {
                id: email._id,
                email: email.email,
              };
              jwt.sign(
                jwtPayload,
                process.env.SECRET,
                {
                  expiresIn: "7d", //7 days
                },
                //If token is found, we return it to the client
                (err, token) => {
                  res.json({ success: true, token });
                }
              );
            }
          });
        }
      }
    );
  }
);

//Used to register the user. Username/Password lengths and other settings can be adjusted from the conf object located above this file
//Express-validator handles the validation checks nicely
router.post(
  "/user/register",
  body("username").isLength({ min: conf.userMinLength }).trim().escape(),
  body("password")
    .isStrongPassword({
      minLowercase: conf.minPassLowercase,
      minUppercase: conf.minPassUppercase,
      minNumbers: conf.minPassNumbers,
      minSymbols: conf.minPassSymbols,
    })
    .isLength({ min: conf.passMinLength })
    .withMessage(
      "Your password must contain one number, one symbol, one lowercase letter, one uppercase letter and be at least 8 character long!"
    ),
  body("email").isEmail(),
  async (req, res, next) => {
    const result = validationResult(req);

    //If error is found then we can return it
    if (!result.isEmpty()) {
      const errors = result.array().map((err) => err.msg);
      return res.status(400).json({ result: errors });
    }

    try {
      //Check for a duplicate username
      const isUser = await User.findOne({ username: req.body.username });

      if (isUser) {
        return res.status(403).send("That username already exists!");
      }

      //Check for a duplicate email
      const isEmail = await User.findOne({ email: req.body.email });

      if (isEmail) {
        return res.status(403).send("That email is already taken");
      }

      //If no duplicates, we can proceed to creating the user
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        if (salt) {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;

            User.create(
              {
                username: req.body.username,
                password: hash,
                email: req.body.email,
              },
              (err, ok) => {
                if (err) throw err;
                if (ok) console.log("Adding a new user!");
                return res.send("Register OK!");
              }
            );
          });
        }
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

module.exports = router;
