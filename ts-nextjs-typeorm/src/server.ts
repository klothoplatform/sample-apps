const express = require("express");
import { nextHandler } from "./next-app";


const server = express();

server.all('*', nextHandler);

/**
 * @klotho::expose {
 *   id = "NextGateway"
 *   target = "public"
 * }
 */
server.listen(3000, () => console.log("> Ready on http://localhost:3000"));
