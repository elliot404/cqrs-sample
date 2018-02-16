module.exports = require('cqrs-domain').defineCommand({
  name: 'makeReservation'
}, function (data, aggregate) {
  aggregate.apply('seatsReserved', data);
});