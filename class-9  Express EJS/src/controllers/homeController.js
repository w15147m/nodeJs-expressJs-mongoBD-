const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../public/db/sms.json");

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

  // 1. Create a structured object with keys
  const newEntry = {
    id: Date.now(), // Unique ID helper
    timestamp: new Date().toLocaleString(),
    name: name,
    message: message
  };

  // 2. Read the existing file first
  fs.readFile(filePath, "utf8", (readErr, data) => {
    let messagesArray = [];

    // If the file exists and has content, parse it
    if (!readErr && data.trim()) {
      try {
        messagesArray = JSON.parse(data);
      } catch (parseErr) {
        console.error("JSON parsing error, resetting file to empty array:", parseErr);
        messagesArray = [];
      }
    }

    // 3. Add the new entry object to the array
    messagesArray.push(newEntry);

    // 4. Save the updated array back to the JSON file
    fs.writeFile(filePath, JSON.stringify(messagesArray, null, 2), (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
        return res.status(500).send("Could not save your message.");
      }

      // 5. Send the array of objects straight to your template
      res.render("contactMassage", { title: "Thank you", messages: messagesArray });
    });
  });
};

exports.pageNotFound = (req, res) => {
  res.status(404).render("notFound", { title: "Not Found" });
};
