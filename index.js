import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";

import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      return console.table(allContacts);
      break;

    case "get":
      const onePerson = await getContactById(id);
      return console.log(onePerson);
      break;

    case "add":
      const newPerson = await addContact(name, email, phone);
      return console.log(newPerson);
      break;

    case "remove":
      const removePerson = await removeContact(id);
      return console.log(removePerson);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
