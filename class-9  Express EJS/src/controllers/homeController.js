const { addMessage } = require("../utils/fileUtil");

exports.home = (req, res) => {
  res.render("home", { title: "Home" });
};

exports.about = (req, res) => {
  res.render("about", { title: "About" });
};

exports.getContact = (req, res) => {
  res.render("contactFrom", { title: "Contact" });
};

exports.postContact = (req, res) => {
  const { name, message } = req.body;

  addMessage({ name, message }, (err, newEntry, allMessages) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Could not save your message.");
    }
    res.render("contactMassage", { title: "Thank you", messages: allMessages });
  });
};

exports.pageNotFound = (req, res) => {
  res.status(404).render("notFound", { title: "Not Found" });
};
