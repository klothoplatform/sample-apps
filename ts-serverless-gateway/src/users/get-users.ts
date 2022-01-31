/**
 * @topology_group userget
 * @keep_warm
 * @compute_size 1core_512mb
 * 
 * @klotho::execution_unit {
 *   name = "userget"
 *   keep_warm = true
 *   compute_size = "1core_512mb"
 * }
 */

const userGet = require('express').Router();

function getUsers(event, res) {
    let usersList = "[user1, user2, user3]"
    res.send(usersList);
}

userGet.get('/v1/users', getUsers);

module.exports = userGet;
 