const fs = require("fs").promises;
const path = require("path");
const nanoid = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    return fs.readFile(contactsPath, "utf-8").then((data) => {
      const contacts = JSON.parse(data);
      console.table(contacts);
    });
  } catch (error) {
    console.log(error);
  }
}

function getContactById(contactId) {
  try {
    return fs.readFile(contactsPath, "utf-8").then((data) => {
      const contacts = JSON.parse(data);
      console.table(contacts[contactId]);
    });
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    contacts.splice(contactId, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
