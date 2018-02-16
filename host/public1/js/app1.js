(function() {

    // Create Backbone Model and Collection
    // ------------------------------------

    // model
    var Item = Backbone.Model.extend({
        modelName: 'item', // so denormalizers can resolve events to model
        
        initialize: function() {
            // bind this model to get event updates - a lot of magic ;)
            // not more to do the model gets updated now
            this.bindCQRS(); 
        }
    });

    // collection
    var Items = Backbone.Collection.extend({
        model: Item,
        url: '/allItems.json'
    });

    var items = new Items();


    // Init Backbone.CQRS
    // ------------------

    // we just have to override eventNameAttr:
    Backbone.CQRS.hub.init({ eventNameAttr: 'event' });

    // override Backbone.sync with CQRS.sync which allows only GET method
    Backbone.sync = Backbone.CQRS.sync;


    // Wire up communication to/from server
    // ------------------------------------

    // create a socket.io connection
    var socket = io.connect('http://localhost:3000');
    
    // on receiving an event from the server via socket.io 
    // forward it to backbone.CQRS.hub
    socket.on('events', function(evt) {
        Backbone.CQRS.hub.emit('events', evt);
    });

    // forward commands to server via socket.io
    Backbone.CQRS.hub.on('commands', function(cmd) {
        socket.emit('commands', cmd);
    });



    // Create a few EventDenormalizers
    // -------------------------------

    // itemCreated event 
    var itemCreateHandler = new Backbone.CQRS.EventDenormalizer({
        methode: 'create',
        model: Item,
        collection: items,

        // bindings
        forModel: 'item',
        forEvent: 'orderCreated'
    });



    // itemDeleted event 
    var itemDeletedHandler = new Backbone.CQRS.EventDenormalizer({
        methode: 'delete',

        // bindings
        forModel: 'item',
        forEvent: 'orderDeleted'
    });



    // Create Backbone Stuff
    // ---------------------

    // view templates
    var itemTemplate = _.template('<%= text %> <a class="deleteOrder" href="">delete</a> ');
    //var editItemTemplate = _.template('<input id="newText" type="text" value="<%= text %>"></input><button id="changeItem">save</button>');

    // views
    var ItemView = Backbone.View.extend({
        
        tagName: 'li',
        className: 'item',

        initialize: function() {
            this.model.bind('change', this.render, this);
            this.model.bind('destroy', this.remove, this);
        },

        events: {
            //'click .editItem' : 'uiEditItem',
            'click .deleteOrder' : 'uiDeleteOrder'
            //'click #changeItem' : 'uiChangeItem'
        },

        // render edit input


        // send deletePerson command with id
        uiDeleteOrder: function(e) {
            e.preventDefault();

            // CQRS command
            var cmd = new Backbone.CQRS.Command({
                id:_.uniqueId('msg'),
                command: 'deleteOrder',
                aggregate: 'order',
                payload: { 
                    id: this.model.id
                }
            });

            // emit it
            cmd.emit();
        },

        

        render: function() {
            if (this.model.editMode) {
                $(this.el).html(editItemTemplate(this.model.toJSON()));
            } else {
                $(this.el).html(itemTemplate(this.model.toJSON()));
            }
            return this;
        }, 

        remove: function() {
            $(this.el).fadeOut('slow');
        }

    });

    var IndexView =  Backbone.View.extend({

        el: '#index-view',

        initialize: function() {
            _.bindAll(this, 'addOrder');

            this.collection = app.items;
            this.collection.bind('reset', this.render, this);
            this.collection.bind('add', this.addOrder, this);
        },

        events: {
            'click #addOrder' : 'uiAddOrder'
        },

        // send createPerson command
        uiAddOrder: function(e) {
            e.preventDefault();  

            var orderText = this.$('#newOrderText').val();

            if (orderText) {

                // CQRS command
                var cmd = new Backbone.CQRS.Command({
                    id:_.uniqueId('msg'),
                    command: 'createOrder',
                    aggregate: 'order',
                    payload: { text: orderText }
                });

                // emit it
                cmd.emit();
            }

            this.$('#newOrderText').val('');
        },

        render: function() {
            this.collection.each(this.addOrder);
        },

        addOrder: function(item) {
            var view = new ItemView({model: item});
            this.$('#orders').append(view.render().el);
        }

    });


    // Bootstrap Backbone
    // ------------------

    var app = {};
    var init = function() {
        app.items = items;
        app.items.fetch();

        var indexView = new IndexView();
        indexView.render();
    };

    // kick things off
    $(init);

})();