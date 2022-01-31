/**
 * @topology_group quotes
 * @keep_warm
 * @compute_size 1core_512mb
 * 
 * @klotho::execution_unit {
 *   name = "quotes"
 *   keep_warm = true
 *   compute_size = "1core_512mb"
 * }
 */

 const quotes = require('express').Router();


/**
 * @capability kv_persist eventually_consistent
 * 
 * @klotho::persist {
 *   eventually_consistent = true
 * }
 */
let quoteStore = new Map<string, string>([["options", {
    mapId: "quoteKV",
    batchWrite: false,
    writeOnChange: false
} as any]]);

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
