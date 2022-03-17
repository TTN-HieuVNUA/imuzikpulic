import { createProxyMiddleware } from 'http-proxy-middleware';
import { NextApiRequest, NextApiResponse } from 'next';

// @ts-ignore
const cors = createProxyMiddleware({
  target: 'http://imedia.imuzik.com.vn/',
  changeOrigin: true,
  pathRewrite: function (path) {
    return path.replace('/api', '/');
  },
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  return await runMiddleware(req, res, cors);
}

export default handler;
