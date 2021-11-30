import Formidable from "formidable";
import type { NextApiRequest, NextApiResponse } from 'next'
const fs = require("fs");

// TODO learn what is this config stuff?
export const config = {
  api: {
    bodyParser: false
  }
};

// interface DropZoneFiles {
//   file: {
//     path: string;
//     name: string;
//   }
// }

export interface ImageUploadFormRequest extends NextApiRequest {
  form: Formidable.Files
}

export default (req: NextApiRequest, res: NextApiResponse) => {
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

        // TODO - How do I specify Formidable.Files type - why are path and name not there?
        // Is DT lib out of date?
        fs.renameSync(files.file.path, `public/upload/${files.file.name}`);
        files.file.path = `/upload/${files.file.name}`;
        // How do I cast this request object to be a type of my extended interface?
        // https://nextjs.org/docs/api-routes/api-middlewares extend type to add property
        req.form = { files };

        resolve({ req, res });
      });
    } catch (error) {
      reject(res.status(500).send(error));
    }
  });

  try {
    if (req.method === "POST") {
      return promise.then(({ req: NextApiRequest, res: NextApiResponse }) => {
        res.status(200).send(req.form);
        // res.status(500).json({ message: JSON.stringify('this is a fake error', null, 2) });
      })
    } else {
      throw new Error("Method not allowed");
    }
  } catch (error) {
    // Do I need to create an interface or a type for what the response/promise is meant to be?
    return promise.then(({ res: NextApiResponse }) => {
      res.status(400).json({ message: JSON.stringify(error, null, 2) });
    })
  }
}
