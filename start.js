// Require Redis Here

// import environmental variables from our variables.env file
require('dotenv').config();


// Connect to our Database
const redis = require('redis');

module.exports = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);


// Start our app!
const app = require('./app');

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log('##########################################################');
  console.log('#####               STARTING SERVER                  #####');
  console.log('##########################################################\n');
  console.log('##########################################################');
  console.log('#####            REDIS STORE CONNECTED               #####');
  console.log('##########################################################\n');
  console.log(`Express running → PORT ${server.address().port}`);
});
