/**
 * @klotho::execution_unit {
 *  name = "schedule-main"
 * }
 */

import fs = require("fs/promises");

import * as express from 'express';
const logger = require('lambda-log');

const app = express()
app.use(express.json())

// TODO native schedulling that works locally and in cloud
export async function scheduledHealthSignal(){
  // this method will be called every 5 minutes
  logger.warn(`Health signal logged at ${Date.now()}`);
}

/* @klotho::expose {
 *  target = "public"
 * }
 */
app.listen(3000, async () => {
  console.log(`App listening locally`)
})

export {app}



