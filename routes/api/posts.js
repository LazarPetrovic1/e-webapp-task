const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Post = require("../../models/Post");

// @route -- POST -- api/posts
// @desc -- -- Create a post
// @access -- -- Private
router.post(
  "/",
  [
    auth,
    [
      check("postname", "Post name is required.")
        .not()
        .isEmpty(),
      check("about", "More information about the post is required.")
        .not()
        .isEmpty(),
      check("date", "You have to set a day of the gathering.")
        .not()
        .isEmpty(),
      check("time", "You have to set the time of the event.")
        .not()
        .isEmpty(),
      check("capacity", "You have to specify the number of people to join.")
        .not()
        .isEmpty(),
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        postname: req.body.postname,
        about: req.body.about,
        date: req.body.date,
        time: req.body.time,
        capacity: req.body.capacity,
        name: user.name,
        user: req.user.id
      });

      const post = await newPost.save();

      res.json(post);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Internal server error.");
    }
  }
);

// @route -- GET -- api/posts
// @desc -- -- Get all posts
// @access -- -- Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
});

// @route -- GET -- api/posts/:id
// @desc -- -- Get a post by id
// @access -- -- Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (e) {
    console.error(e.message);

    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(500).send("Internal server error.");
  }
})

// @route -- DELETE -- api/posts/:id
// @desc -- -- Delete a post
// @access -- -- Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if post exists
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised." });
    }

    await post.remove();

    res.json({msg: "Post removed."});
  } catch (e) {
    console.error(e.message);

    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(500).send("Internal server error.");
  }
});

// @route -- PUT -- api/posts/attend/:id
// @desc -- -- Attend the event
// @access -- -- Private
router.put("/attend/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.attendees.filter(
        attendee => attendee.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: "You are already attending the event." });
    }

    post.attendees.unshift({user: req.user.id});

    await post.save();

    return res.json(post.attendees);
  } catch (e) {
    console.error(e.message);

    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(500).send("Internal server error.");
  }
});

// @route -- PUT -- api/posts/unattend/:id
// @desc -- -- Un-attend the event
// @access -- -- Private
router.put("/unattend/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.attendees.filter(
        attendee => attendee.user.toString() === req.user.id
      ).length === 0
    ) {
      return res.status(400).json({ msg: "You are not attending the event." });
    }

    const removeIndex = post.attendees
      .map(attendee => attendee.user.toString())
      .indexOf(req.user.id);
    post.attendees.splice(removeIndex, 1);

    await post.save();

    return res.json(post.attendees);
  } catch (e) {
    console.error(e.message);

    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(500).send("Internal server error.");
  }
});

// @route -- PUT -- api/posts/:id
// @desc -- -- Update the event
// @access -- -- Private
router.put("/:id", auth, async (req, res) => {
  const {
    postname,
    about,
    attendees,
    time,
    date,
    capacity
  } = req.body;

  const postFields = {};
  postFields.user = req.user.id;
  if (postname) postFields.postname = postname;
  if (about) postFields.about = about;
  if (attendees) postFields.attendees = attendees;
  if (time) postFields.time = time;
  if (date) postFields.date = date;
  if (capacity) postFields.capacity = capacity;

  try {
    let post = Post.findById(req.params.id);
    // console.log("POST - backend", post);
    if (post) {
      post = await post.findOneAndUpdate(
        {user: req.user.id},
        {$set: postFields},
        {new: true}
      );
    }

    await post.save();
    return res.json(post);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
