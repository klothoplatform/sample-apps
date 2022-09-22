import { datasource, isInitialized } from "../../../datasource";
import { Post } from "../../../post";


export default function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case "PUT":
        updatePost(req, res);
        break;
      case "GET":
        findPostById(req, res);
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    res.status(500).json({"message": e});
  }

}

async function updatePost(req, res) {
  const { query: { id } } = req
  await isInitialized;
  let body = req.body;
  if (Buffer.isBuffer(body)) {
    body = JSON.parse(body.toString());
  }
  const post = datasource.manager.create(Post, body);
  await datasource.manager.update(Post, id, post);
  res.status(200).json();
}

async function findPostById(req, res) {
  const { query: { id } } = req;
  await isInitialized;
  const post = await datasource.manager.findOneBy(Post, { id: id });
  if (post) {
    return res.status(200).json(post);
  }

  res.status(404).json({"message": "not found"});
}
