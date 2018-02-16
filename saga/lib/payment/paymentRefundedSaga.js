module.exports = require('cqrs-saga').defineSaga({// event to match..
//module.exports = require('../../../../').defineSaga({// event to match...
  name: 'paymentRefunded', // optional, default is file name without extension
  aggregate: 'payment',

  existing: false, // if true it will check if there is already a saga in the db and only if there is something it will continue...
  //containingProperties: ['aggregate.id', 'payload.totalCosts', 'payload.seats'],
  // payload: 'payload' // if not defined it will pass the whole event...
  // id: 'aggregate.id' // if not defined it will generate an id
  priority: 2 // optional, default Infinity, all sagas will be sorted by this value
}, function (evt, saga, callback) {

  // saga.id or saga.get('id') is a generated id...

  //saga.set('orderId', evt.aggregate.id);
  //saga.set('totalCosts', evt.payload.totalCosts);

  var cmd = {
    // id: 'my own command id', // if you don't pass an id it will generate one, when emitting the command...
    command: 'failSeatReservation',
    aggregate: 'reservation',
    payload: {
      //corelationID = evt.
      transactionId: saga.id,
      seats: evt.payload
    }//,
//    meta: evt.meta // to transport userId...   if not defined in cmd, it will defaultly use it from event
  };

  saga.addCommandToSend(cmd);

 
  saga.commit(callback);
});