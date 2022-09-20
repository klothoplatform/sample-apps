/**
 * @klotho::execution_unit {
 *   id = "cats"
 * }
 */


 export const router = require('express').Router();

 function getCats(event, res) {
     res.send("[Maine Coon, Ragdoll, Shorthair]");
 }
 
 router.get('/v1/cats', getCats);