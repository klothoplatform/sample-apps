/**
 * @klotho::execution_unit {
 *   name = "srvless-quotes"
 *   keep_warm = true
 *   [size]
 *   mem_mb = 512
 * }
 */

 const quotes = require('express').Router();


/**
 * @klotho::persist {
 *  map_id = "quoteKV"
 * }
 */
let quoteStore = new Map<string, string>();

quoteStore.delete("options")


async function postQuote(req, res) {
    try {
        await quoteStore.set(req.body.quote, req.body.quote);
        res.send(`Added ${req.body.quote}`)
    }
    catch (err) {
        console.log("Got error setting quote", err)
        res.send({
            err: err,
            msg: "Error Happened",
            statusCode: 500
        });
    }
}

async function getQuote(req, res) {
    const entries = Array.from(await quoteStore.entries())
    const quoteList = entries.map(x => x[1])
    res.send(quoteList);
}


quotes.post('/v1/quote', postQuote);
quotes.get('/v1/quote-list', getQuote);

module.exports = quotes;
