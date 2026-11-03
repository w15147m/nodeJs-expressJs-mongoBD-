const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../public/db/sms.json");

module.exports = class HomeModel {
  constructor(name, message) {
    this.name = name;
    this.message = message;
  }

  save(callback) {
    HomeModel.fetchAll((messages) => {
      const newEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        name: this.name,
        message: this.message
      };

      messages.push(newEntry);

      fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
        if (callback) callback(err, newEntry, messages);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err || !data.trim()) {
        return callback([]);
      }
      try {
        callback(JSON.parse(data));
      } catch (parseErr) {
        console.error("JSON parse error:", parseErr);
        callback([]);
      }
    });
  }

  static deleteById(id, callback) {
    HomeModel.fetchAll((messages) => {
      const filtered = messages.filter((m) => m.id != id);
      fs.writeFile(filePath, JSON.stringify(filtered, null, 2), (err) => {
        if (callback) callback(err, filtered);
      });
    });
  }

  static updateById(id, updatedFields, callback) {
    HomeModel.fetchAll((messages) => {
      const index = messages.findIndex((m) => m.id == id);
      if (index !== -1) {
        messages[index] = { ...messages[index], ...updatedFields };
      }
      fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
        if (callback) callback(err, messages);
      });
    });
  }
};
