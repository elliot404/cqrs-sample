module.exports = require('cqrs-domain').defineEvent({
  name: 'paymentAccepted'
},
function (data, aggregate) {
  aggregate.set(data);
});