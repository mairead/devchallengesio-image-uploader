import Formidable from "Formidable";
const fs = require("fs");

// TODO learn what is this config stuff?
export const config = {
  api: {
    bodyParser: false
  }
};

export default (req, res) => {
  const promise = new Promise((resolve, reject) => {
    try {
      const form = new Formidable.IncomingForm({
        multiples: true,
        keepExtensions: true
      });
      form.on("error", console.error);
      form.parse(req, (err, fields, files) => {
        if (err) {
          throw new Error(JSON.stringify(err, null, 2));
        }

        fs.renameSync(files.file.path, `public/upload/${files.file.name}`);
        files.file.path = `/upload/${files.file.name}`;
        req.form = { files };

        resolve({ req, res });
      });
    } catch (error) {
      reject(res.status(500).send(error));
    }
  });

  try {
    if (req.method === "POST") {
      return promise.then(({ req, res }) => {
        res.status(200).send(req.form);
        // res.status(500).json({ message: JSON.stringify('this is a fake error', null, 2) });
      })
    } else {
      throw new Error("Method not allowed");
    }
  } catch (error) {
    return promise.then(({ res }) => {
      res.status(400).json({ message: JSON.stringify(error, null, 2) });
    })
  }
}
