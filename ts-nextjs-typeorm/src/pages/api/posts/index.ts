import { datasource, isInitialized } from "../../../datasource";
import { Post } from "../../../post";


export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
    case "PUT":
      await SavePost(req, res);
      break;
    case "GET":
      await findAllPosts(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function SavePost(req, res) {
  await isInitialized;
  console.log(req.headers)
  let body = req.body;
  if (Buffer.isBuffer(body)) {
    body = JSON.parse(body.toString());
  }
  const post = datasource.manager.create(Post, body);
  await datasource.manager.upsert(Post, post, ["id"]);
  res.status(201).json(post);
}

async function findAllPosts(req, res) {
  await isInitialized;
  res.status(200).json(await datasource.manager.find(Post));
}
