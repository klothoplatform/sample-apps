import * as express from 'express'
import * as hello from './hello/hello'
import * as content from './static'
import * as override from './docker-override'

const app = express()
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
app.use(override.router)

export {app}

