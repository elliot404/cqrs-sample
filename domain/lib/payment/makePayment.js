module.exports = require('cqrs-domain').defineCommand({
  name: 'makePayment'
}, function (data, aggregate) {
  aggregate.apply('paymentAccepted', data);
});