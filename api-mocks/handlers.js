import { rest } from 'msw';

// TODO don't need fields
// shouldn't files be an array and not an obj lit?
const mockCreateImgResponse = {
  "fields": {},
  "files": {
    "file": {
      "size": 1520769,
      "path": "/var/folders/_2/t1z_2gp907s8bcs3nc6q7j480000gn/T/upload_f690082a2c38428ae46977097a3613a5.jpg",
      "name": "Blob-Attack.jpg",
      "type": "image/jpeg",
      "mtime": "2021-09-22T19:51:02.451Z"
    }
  }
}

// can this be relative or does it need absolute path/env http://localhost:3000/
// const postImg = `${baseUrl}/tasks`;
const createImgPath = '/api/image';

const createImgHandler = rest.post(createImgPath, async (req, res, ctx) =>
  res(ctx.json(mockCreateImgResponse))
);

export const createImgHandlerException = rest.post(
  createImgPath,
  async (req, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Deliberately broken request' }))
);

export const handlers = [createImgHandler];
