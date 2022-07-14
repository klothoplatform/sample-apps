import events = require("events")

// @klotho::pubsub
export const MyEmitter = new events.EventEmitter();

import "./hello_handler" // import after emitter set up to register handlers
import "./other/handler"
