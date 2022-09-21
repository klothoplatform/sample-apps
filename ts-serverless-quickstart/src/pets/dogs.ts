/**
 * @klotho::execution_unit {
 *   id = "dogs"
 * }
 */


 export const router = require('express').Router();

 function getDogs(event, res) {
     res.send("[Pomsky, Corgi, Shih Tzu]");
 }
 
 router.get('/v1/dogs', getDogs);