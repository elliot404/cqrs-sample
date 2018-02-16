module.exports = require('cqrs-domain').defineEvent({
  name: 'orderCancelled'
},
function (data, aggregate) {
  aggregate.set(data);
});