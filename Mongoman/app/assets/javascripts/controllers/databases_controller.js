Mongoman.DatabasesController = Ember.ArrayController.extend({
  content: null,

  actions: {

    addDatabase: function() {
      var self = this;
      $("#newdb-create" ).dialog({
        resizable: false,
        height:250,
        width: 450,
        modal: true,
        buttons: {
          Create: function() {
            var newDbName = self.get('content.newDbName');
            var url = '/databases?';
            Mongoman.PostRequest.post(url, {database_name: newDbName}, 'POST').then(
              function success() {
                window.location.href="/";
              },
              function failure() {
                //boo!
              });

            $(this).dialog("close");
          },
          Cancel: function() {
            $(this).dialog("close");
          }
        }
      });
    }
  }

});
