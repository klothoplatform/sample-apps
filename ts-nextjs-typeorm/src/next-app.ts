/**
 * @klotho::embed_assets {
 *   id = "public-assets"
 *   include = ["public/**", ".next/**"]
 *   exclude = ["public/placeholder.md", ".next/placeholder.md"]
 * }
 */

import next from "next";
import { datasource } from "./datasource";

const dev = process.env.NODE_ENV != 'production' && !process.env.CLOUDCC_NAMESPACE
const app = next({ dev });
const handle = app.getRequestHandler();
const prepared = app.prepare();

export async function nextHandler(req, res) {
  console.log(`Next: ${req.method} ${req.path}`)
  await datasource;
  await prepared;
  return handle(req, res);
}
