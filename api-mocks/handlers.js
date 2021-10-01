import { rest } from 'msw';
import { root } from '../config';

// TODO don't need fields
// shouldn't files be an array and not an obj lit?
const mockCreateImgResponse = {
  "fields": {},
  "files": {
    "file": {
      "size": 1520769,
      "path": "upload/Blob-Attack.jpg",
      "name": "Blob-Attack.jpg",
      "type": "image/jpeg",
      "mtime": "2021-09-22T19:51:02.451Z"
    }
  }
}

const createImgPath = `${root}/api/image`;

export const createImgHandler = rest.post(createImgPath, async (req, res, ctx) =>
  res(ctx.json(mockCreateImgResponse))
);

export const createImgHandlerException = rest.post(
  createImgPath,
  async (req, res, ctx) =>
    res(ctx.status(500), ctx.json({ errorMessage: 'Deliberately broken request' }))
);

export const handlers = [createImgHandler];
