/**
 * @klotho::execution_unit {
 *   id = "srvless-userpost"
 *   keep_warm = true
 * }
 */


export const router = require('express').Router();

function postUsers(event, res) {
    let resp = `Hi ${event.body.user}`;
    res.send();
}

router.post('/v1/users', postUsers);
