module.exports = require('cqrs-domain').defineEvent({
  name: 'orderRejected'
},
function (data, aggregate) {
  aggregate.set(data);
});