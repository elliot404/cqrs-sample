module.exports = require('cqrs-domain').defineEvent({
  name: 'orderConfirmed'
},
function (data, aggregate) {
  aggregate.set(data);
});