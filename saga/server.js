var msgbus = require('../msgbus');

var pm = require('cqrs-saga')({
	// the path to the "working directory"
	// can be structured like
	// [set 1](https://github.com/adrai/node-cqrs-saga/tree/master/test/integration/fixture)
	sagaPath:  __dirname +'/lib',

	// optional, default is 800
	// if using in scaled systems and not guaranteeing that each event for a saga "instance"
	// dispatches to the same worker process, this module tries to catch the concurrency issues and
	// retries to handle the event after a timeout between 0 and the defined value
	retryOnConcurrencyTimeout: 1000,

	// optional, default is in-memory
	// currently supports: mongodb, redis, azuretable and inmemory
	// hint settings like: [eventstore](https://github.com/adrai/node-eventstore#provide-implementation-for-storage)
	// mongodb:
	sagaStore: {
		type: 'mongodb',
		host: 'localhost', // optional
		port: 27017, // optional
		dbName: 'saga', // optional
		collectionName: 'sagaStore', // optional
		timeout: 10000 // optional
		// authSource: 'authedicationDatabase',        // optional
		// username: 'technicalDbUser',                // optional
		// password: 'secret'                          // optional
		// url: 'mongodb://user:pass@host:port/db?opts // optional
	}


	// optional, default is in-memory
	// the revisionguard only works if aggregateId and revision are defined in event definition
	// currently supports: mongodb, redis, tingodb, azuretable and inmemory
	// hint settings like: [eventstore](https://github.com/adrai/node-eventstore#provide-implementation-for-storage)
	
});

pm.sagaStore.on('connect', function() {
	console.log('sagaStore connected');
});

pm.sagaStore.on('disconnect', function() {
	console.log('sagaStore disconnected');
});

// revisionGuardStore
pm.revisionGuardStore.on('connect', function() {
	console.log('revisionGuardStore connected');
});

pm.revisionGuardStore.on('disconnect', function() {
	console.log('revisionGuardStore disconnected');
});


pm.defineEvent({
	//correlationId: 'correlationId',
	id: 'id',
	name: 'event',
	aggregateId: 'payload.id',
	aggregate: 'aggregate',
	payload: 'payload',
	meta: 'meta'
});

pm.defineCommand({
	// optional, default is 'id'
	id: 'id',
	aggregate: 'aggregate',

	// optional, if defined theses values will be copied to the event (can be used to transport information like userId, etc..)
	meta: 'meta'
});

//console.log('Starting saga service');

pm.init(function(err, warnings) {

	if (err) {
		console.log(' Error Initialising Saga : ', err);
		return err;
	}

	//console.log(pm.getInfo());

	msgbus.onEvent(function(evt) {
		console.log(' Saga: ' + evt.event + ' id: ' + evt.id);
		pm.handle(evt, function(err, cmds) {
			if (err) {
				console.log(' ERROR FROM SAGA : ', err);
			}
		});
	});

	pm.onCommand(function(cmd) {
		console.log(' Saga Handle Cmd : ' + cmd.command + 'with id : ' + cmd.id);
		msgbus.emitCommand(cmd);
	})

	console.log('Starting saga service');
});
