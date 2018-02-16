module.exports = require('cqrs-domain').defineCommand({
  name: 'cancelOrder'
}, function (data, aggregate) {
  aggregate.apply('orderCancelled', data);
});