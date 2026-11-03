const express = require("express");
const {
  home,
  about,
  getContact,
  postContact,
  pageNotFound
} = require("../controllers/homeController");

const router = express.Router();

router.get("/", home);
router.get("/about", about);
router.get("/contact", getContact);
router.post("/contact", postContact);
router.use(pageNotFound);

module.exports = router;
