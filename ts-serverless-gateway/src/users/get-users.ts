/**
 * @klotho::execution_unit {
 *   id = "srvless-userget"
 * }
 */


export const router = require('express').Router();

function getUsers(event, res) {
    let usersList = "[user1, user2, user3]"
    res.send(usersList);
}

router.get('/v1/users', getUsers);
