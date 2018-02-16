module.exports = require('cqrs-domain').defineCommand({
  name: 'rejectOrder'
}, function (data, aggregate) {
  aggregate.apply('orderRejected', data);
});