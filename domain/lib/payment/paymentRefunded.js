module.exports = require('cqrs-domain').defineEvent({
  name: 'paymentRefunded'
},
function (data, aggregate) {
  aggregate.set(data);
});