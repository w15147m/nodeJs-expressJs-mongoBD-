const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../public/db/sms.json");

/**
 * Read all messages from sms.json
 * @param {Function} callback (messagesArray) => void
 */
exports.readMessages = (callback) => {
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
};

/**
 * Add a new message to sms.json
 * @param {Object} entry { name, message }
 * @param {Function} callback (err, newEntry, allMessages) => void
 */
exports.addMessage = (entry, callback) => {
  exports.readMessages((messages) => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      name: entry.name,
      message: entry.message
    };

    messages.push(newEntry);

    fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
      callback(err, newEntry, messages);
    });
  });
};

/**
 * Edit/Update an existing message by ID
 * @param {string|number} id
 * @param {Object} updatedFields { name, message }
 * @param {Function} callback (err, allMessages) => void
 */
exports.updateMessage = (id, updatedFields, callback) => {
  exports.readMessages((messages) => {
    const index = messages.findIndex((m) => m.id == id);
    if (index !== -1) {
      messages[index] = {
        ...messages[index],
        ...updatedFields
      };
    }

    fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
      callback(err, messages);
    });
  });
};

/**
 * Delete a message by ID
 * @param {string|number} id
 * @param {Function} callback (err, remainingMessages) => void
 */
exports.deleteMessage = (id, callback) => {
  exports.readMessages((messages) => {
    const filtered = messages.filter((m) => m.id != id);

    fs.writeFile(filePath, JSON.stringify(filtered, null, 2), (err) => {
      callback(err, filtered);
    });
  });
};

