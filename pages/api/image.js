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
  // promise stuff seems like voodoo
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
        req.form = { fields, files };
        return resolve(next(req, res));
      });
    } catch (error) {
      return resolve(res.status(403).send(error));
    }
  });
}  

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
// export default function handler(req, res) {
//     // nothing returned in response?
//     res.status(200).json({filename: req.body.name});
// }

export default uploadImage(handler);