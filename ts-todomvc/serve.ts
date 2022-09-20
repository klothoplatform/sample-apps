/**
 * @klotho::execution_unit {
 *   id = "todo-mvc-website"
 * }
 */

 import * as express from 'express'
 export const router = express.Router()
 
/**
 * @klotho::embed_assets {
 *   id = "static-assets"
 *   include = ["index.html"]
 * }
 */
router.use(express.static('./'))
 
app.use("/", router)

/**
 * @klotho::expose {
 *   id = "todo-mvc-gateway"
 *   target = "public"
 * }
 */
app.listen(3000)