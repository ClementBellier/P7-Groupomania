const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.get("/:id", auth, userCtrl.getDataOfAUser);
router.get("/:id/posts", auth, userCtrl.getPostsOfAUser);

module.exports = router;
