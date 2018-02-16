module.exports = require('cqrs-domain').defineBusinessRule({
  name: 'checkForError'
}, function (changed, previous, events, command) {
	console.log('sujit'+ command);
	console.log('events'+events);
  
});