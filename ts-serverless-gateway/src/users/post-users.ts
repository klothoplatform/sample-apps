/**
 * @klotho::execution_unit {
 *   name = "srvless-userpost"
 *   keep_warm = true
 *   [size]
 *   mem_mb = 512
 * }
 */


export const router = require('express').Router();

function postUsers(event, res) {
    let resp = `Hi ${event.body.user}`;
    res.send();
}

router.post('/v1/users', postUsers);
