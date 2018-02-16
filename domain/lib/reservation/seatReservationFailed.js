module.exports = require('cqrs-domain').defineEvent({
  name: 'seatReservationFailed'
},
function (data, aggregate) {
  aggregate.set(data);
});