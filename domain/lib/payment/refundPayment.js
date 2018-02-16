module.exports = require('cqrs-domain').defineCommand({
  name: 'refundPayment'
}, function (data, aggregate) {
  aggregate.apply('paymentRefunded', data);
});