module.exports = require('cqrs-saga').defineSaga({// event to match...
  name: 'orderConfirmed', // optional, default is file name without extension
  aggregate: 'order',
  
  //id: 'payload.transactionId',
  //existing: true, // if true it will check if there is already a saga in the db and only if there is something it will continue...
  // payload: 'payload' // if not defined it will pass the whole event...
  priority: 1 // optional, default Infinity, all sagas will be sorted by this value
}, function (evt, saga, callback) {


  console.log('triumph');

  saga.destroy();
  saga.commit(callback);

});