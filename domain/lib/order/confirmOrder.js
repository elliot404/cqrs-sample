module.exports = require('cqrs-domain').defineCommand({
  name: 'confirmOrder'
}, function (data, aggregate) {
  aggregate.apply('orderConfirmed', data);
});