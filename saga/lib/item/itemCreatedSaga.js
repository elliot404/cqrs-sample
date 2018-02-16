module.exports = require('cqrs-saga').defineSaga({
  // optional, default is file name without extension
  name: 'itemCreated',
 

 
  // optional, default 0
  //version: 1,
 
  // optional, default false
  // if true it will check if there is already a saga in the db and only if there is something it will continue...
  existing: false,
 

 
  // optional, default Infinity, all sagas will be sorted by this value
  priority: 1
}, function (evt, saga, callback) {

  console.log(evt);
  console.log(saga);
 
  console.log('hello');
  saga.commit(callback);
});
// optional define a function to that returns an id that will be used as saga id
//.useAsId(function (evt) {
//  return 'newId';
//});
// or
//.useAsId(function (evt, callback) {
//  callback(null, 'newId');
//});
// 
// optional define a function that checks if an event should be handled
//.defineShouldHandle(function (evt, saga) {
//  return true;
//});
// or
//.defineShouldHandle(function (evt, saga, callback) {
//  callback(null, true');
//});