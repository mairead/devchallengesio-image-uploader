import { rest } from 'msw';

const mockFileObj = {
  // file stuff here to match response from API
}

// can this be relative or does it need absolute path/env http://localhost:3000/
// const postImg = `${baseUrl}/tasks`;
const createImgPath = '/api/image';

const createImgHandler = rest.post(createImgPath, async (req, res, ctx) =>
  res(ctx.json(mockFileObj))
);

export const createImgHandlerException = rest.post(
  createImgPath,
  async (req, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Deliberately broken request' }))
);

export const handlers = [createImgHandler];
