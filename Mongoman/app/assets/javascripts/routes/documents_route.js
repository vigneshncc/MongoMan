Mongoman.DocumentsRoute = Ember.Route.extend({

  model: function(params) {
    var collection = params.collection;
    var database_name= params.database;
    var api= "/documents/" + collection + '/?'+"database_name=" + encodeURIComponent(database_name) + "&collection_name=" + collection;
    var controller = this.controllerFor('documents');
    controller.set('collection_name',collection);
    controller.set('database_name', database_name);
    return Mongoman.Request.find(api);
  },

  setupController: function(controller,model) {
    controller.set('content', model.documents);
    controller.set('documentCount', model.count);
    controller.send('initVisibleContent', true);
  },

  deactivate: function() {
    var controller = this.controllerFor('documents');
    controller.set('content', []);
    controller.set('documentCount', 0);
    controller.set('searching', false);

  }

});
