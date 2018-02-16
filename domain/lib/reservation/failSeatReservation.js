module.exports = require('cqrs-domain').defineCommand({
  name: 'failSeatReservation'
}, function (data, aggregate) {
  aggregate.apply('seatReservationFailed', data);
});