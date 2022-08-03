/**
 * @klotho::execution_unit {
 *   name = "srvless-userget"
 *   keep_warm = true
 *   [size]
 *   mem_mb = 512
 * }
 */


export const router = require('express').Router();

function getUsers(event, res) {
    let usersList = "[user1, user2, user3]"
    res.send(usersList);
}

router.get('/v1/users', getUsers);
