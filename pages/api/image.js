import Formidable from "Formidable";
const fs = require("fs");

// TODO learn what is this config stuff?
export const config = {
  api: {
    bodyParser: false
  }
};

const uploadImage = next => (req, res) => {
  // TODO is this promise syntax ok?
  // promise stuff seems like voodoo atm

  // can we remove the async/await from the route? and put it into the .next() like koa?
  // https://stackoverflow.com/questions/43036229/is-it-an-anti-pattern-to-use-async-await-inside-of-a-new-promise-constructor
  return new Promise(async (resolve, reject) => {
    try {
      const form = new Formidable.IncomingForm({
        multiples: true,
        keepExtensions: true
      });
      form.on("error", console.error);
      await form.parse(req, async (err, fields, files) => {
        if (err) {
          throw String(JSON.stringify(err, null, 2));
        }

        fs.renameSync(files.file.path, `public/upload/${files.file.name}`);
        files.file.path = `/upload/${files.file.name}`;
        req.form = { files };
        return resolve(next(req, res));
      });
    } catch (error) {
      // is form.on("error") caught here?
      // does it catch both the formidable error and the parse err thrown?
      return resolve(res.status(403).send(error));
    }
  });
}

const handler = (req, res) => {
  try {
    if (req.method === "POST") {
      res.status(200).send(req.form);
      // res.status(500).json({ message: JSON.stringify('There was a server error', null, 2) });
    } else {
      throw String("Method not allowed");
    }
  } catch (error) {
    res.status(400).json({ message: JSON.stringify(error, null, 2) });
  }
}

export default uploadImage(handler);