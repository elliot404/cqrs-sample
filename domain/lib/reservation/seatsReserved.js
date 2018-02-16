module.exports = require('cqrs-domain').defineEvent({
  name: 'seatsReserved'
},
function (data, aggregate) {
  aggregate.set(data);
});