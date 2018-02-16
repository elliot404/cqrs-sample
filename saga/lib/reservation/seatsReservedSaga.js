module.exports = require('cqrs-saga').defineSaga({// event to match..
//module.exports = require('../../../../').defineSaga({// event to match...
  name: 'seatsReserved', // optional, default is file name without extension
  aggregate: 'reservation',
  //existing: true, // if true it will check if there is already a saga in the db and only if there is something it will continue...
  // payload: 'payload' // if not defined it will pass the whole event...
  priority: 4 // optional, default Infinity, all sagas will be sorted by this value
}, function (evt, saga, callback) {

  var cmd = {
    // id: 'my own command id', // if you don't pass an id it will generate one, when emitting the command...
    command: 'makePayment',
    aggregate: 'payment',
    
    payload: {
      transactionId: saga.id,
      costs: evt.payload
    },
    meta: evt.meta // to transport userId...   if not defined in cmd, it will defaultly use it from event
  };

  saga.addCommandToSend(cmd);

  saga.commit(callback);
});