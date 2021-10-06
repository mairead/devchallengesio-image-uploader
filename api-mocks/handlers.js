import { rest } from 'msw';
import { root } from '../config';

const mockCreateImgResponse = {
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
const wrongImgPath = `${root}/api/wrongpath`;

export const createImgHandler = rest.post(createImgPath, async (req, res, ctx) =>
  res(ctx.json(mockCreateImgResponse))
);

export const createImgHandlerException = rest.post(
  createImgPath,
  async (req, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Deliberately broken request' }))
);

export const wrongImgHandlerException = rest.post(
  wrongImgPath,
  async (req, res, ctx) =>
    res(ctx.status(404), ctx.json({ message: 'This route does not exist' }))
);

export const handlers = [createImgHandler];
