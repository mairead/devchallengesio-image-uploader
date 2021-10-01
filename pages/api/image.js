import Formidable from "Formidable";
const fs = require("fs");

// TODO learn what is this config stuff?
export const config = {
  api: {
    bodyParser: false
  }
};

// what is this double chained syntax? curried?
const uploadImage = next => (req, res) => {
  // TODO is this promise syntax ok?
  // promise stuff seems like voodoo atm
  // https://stackoverflow.com/questions/43036229/is-it-an-anti-pattern-to-use-async-await-inside-of-a-new-promise-constructor
  return new Promise(async (resolve, reject) => {
    try {
      const form = new Formidable.IncomingForm({
        multiples: true,
        keepExtensions: true
      });
      form.once("error", console.error);
      await form.parse(req, async (err, fields, files) => {
        if (err) {
          throw String(JSON.stringify(err, null, 2));
        }
        console.log(
          "moving file: ",
          files.file.path,
          " to ",
          `public/upload/${files.file.name}`
        );
        fs.renameSync(files.file.path, `public/upload/${files.file.name}`);
        // need to actually set public path in returned object
        files.file.path = `/upload/${files.file.name}`;
        req.form = { fields, files };
        return resolve(next(req, res));
      });
    } catch (error) {
      return resolve(res.status(403).send(error));
    }
  });
}

// TODO we don't need the fields object from Formidable
const handler = (req, res) => {
  try {
    if (req.method === "POST") {
      res.status(200).send(req.form);
    } else {
      throw String("Method not allowed");
    }
  } catch (error) {
    res.status(400).json({ message: JSON.stringify(error, null, 2) });
  }
}

// TODO what is stringify null 2 doing here?
// TODO would like to understand different types of error
// why are some logged to console and some in catch block in stringify? to send to response?

export default uploadImage(handler);