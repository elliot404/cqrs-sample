module.exports = require('cqrs-saga').defineSaga({// event to match..
//module.exports = require('../../../../').defineSaga({// event to match...
  name: 'paymentAccepted', // optional, default is file name without extension
  aggregate: 'payment',
  
  ///version: 2, // default is 0
  //containingProperties: ['payload.transactionId'],
  id: 'payload.transactionId',
  //existing: true, // if true it will check if there is already a saga in the db and only if there is something it will continue...
  // payload: 'payload' // if not defined it will pass the whole event...
  priority: 3 // optional, default Infinity, all sagas will be sorted by this value
}, function (evt, saga, callback) {

  var cmd = {
    // id: 'my own command id', // if you don't pass an id it will generate one, when emitting the command...
    command: 'confirmOrder',
    aggregate: 'order',
    
    payload: {
      transactionId: evt
    },
    meta: evt.meta // to transport userId...   if not defined in cmd, it will defaultly use it from event
  };

  //saga.removeTimeout();

  saga.addCommandToSend(cmd);

  saga.commit(callback);
});