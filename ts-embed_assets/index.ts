import express = require('express')
import * as hello from './hello'
import * as content from './static'

export const app = express()
app.use(express.json())


/* @klotho::expose {
 *  target = "public"
 *  id = "app"
 * }
 */
app.listen(3000, async () => {
  console.log(`App listening at :3000`)
})

app.use(hello.router)
app.use(content.router)
