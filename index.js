const log = require('./utils/log');
const R = require('ramda');
const fp = require('./dist/fpjourney');
log('starting');

/* play here */
log(fp.constant(10));
log(fp.All(10).value());
log(fp.All(10).concat(fp.All(5)).value());

log('Up and running');