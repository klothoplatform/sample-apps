/**
 * @topology_group userpost
 * @keep_warm
 * @compute_size 1core_512mb
 * 
 * @klotho::execution_unit {
 *   name = "userpost"
 *   keep_warm = true
 *   compute_size = "1core_512mb"
 * }
 */

const userPost = require('express').Router();

function postUsers(event, res) {
    let resp = `Hi ${event.body.user}`;
    res.send();
}

userPost.post('/v1/users', postUsers);
module.exports = userPost;
