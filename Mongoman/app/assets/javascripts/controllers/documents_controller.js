Mongoman.DocumentsController = Ember.ArrayController.extend({
  isVisible: true,
  fields: null,
  data: null,
  collection_name: null,
  database_name: null,
  totalPages: null,
  visibleContent: null,
  totalContent: null,
  visibleStartIndex: null,
  visibleEndIndex: null,
  searchCount : null,
  count: Ember.computed.alias('documentCount'),


  jsonifyText: function(str) {
    var keys = str.match(/[a-zA-Z0-9_\"\s\']+:\s+/g);
    if (keys) {
      for (var i = 0, j = keys.length; i < j; i++) {
        str = str.replace(keys[i],'"' + keys[i].split(':')[0] + '":' );
      }
    }
    else {
      str = '{}';
    }
    return str;
  },

  isValidDocument: function(payload) {
    var result = "";
    try {
      result = JSON.stringify(payload);
      return result;
    }
    catch(e) {
      return false;
    }
  },



  actions: {


    search: function() {
      var searchPhrase = encodeURIComponent(this.get('searchtext').replace(/\./g,"*"));
      var api = "/documents/search/" + searchPhrase +'?'+ "database_name=" +
      encodeURIComponent(this.get('database_name'))+ "&collection_name=" + encodeURIComponent(this.get('collection_name'));

      var getSearchresult = Mongoman.Request.find(api);
      getSearchresult.then(function loadedSearchContent(response) {
        this.set('content', response.documents);
        this.set('searchCount', response.documents.count);
        if (response.notice) {
          $.flash(response.notice);
        }
      }.bind(this),
      function failedToLoadContent(error) {
        self.set('content', error);
      }.bind(this));

      this.set('searching', searchPhrase.length > 0);

    },


    initVisibleContent: function() {
      if (this.get('content')) {
        this.set('visibleStartIndex', 1);
        this.set('visibleEndIndex', this.get('content.length'));
        this.set('isLoaded', true);
      }
    },


    addDocument: function() {
      var self = this;
      $( "#dialog-form" ).dialog({
      resizable: true,
      height:450,
      width: 600,
      modal: true,
      buttons: {
        "Add Document" : function() {
          var json = self.isValidDocument(self.newDocument);
          if (json && (self.newDocument !== "")) {
            var url = '/documents/?';
            Mongoman.PostRequest.post(url ,
              {
                database_name : self.get('database_name'),
                collection_name: self.get('collection_name')
              }, 'POST', self.jsonifyText(self.newDocument.trim()))
             .then(function() {
              //  self.reload();
              });
            $( this ).dialog( "close" );
          }
          else {
            $.flash("Your JSON is invalid!! Please enter valid JSON.");
          }
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      }
    });

    },


    dropCollection: function() {
      var self = this;
      $("#placeholder-confirm-drop-collection" ).dialog({
        resizable: false,
        height:250,
        width: 450,
        modal: true,
        buttons: {
          Drop: function() {
            var url = '/collections/' + self.get('collection_name') + '?';
            Mongoman.PostRequest.post(url , {database_name: self.get('database_name') } , 'DELETE');
            $(this).dialog("close");
          },
          Cancel: function() {
            $(this).dialog("close");
          }
        }
      });
    },

    pageChanged: function(new_page) {
      var paginated_content_index = (new_page - 1 ) * 15;
      this.set('visibleStartIndex', paginated_content_index + 1);
      var difference = this.get('count') - this.get('visibleStartIndex');
      var visibleEndIndex = (difference > 15) ? (paginated_content_index + 15) : (this.get('count'));

      this.set('visibleEndIndex', visibleEndIndex);

      var api = "/documents/" + this.get('collection_name') + '/?'+ "database_name=" + encodeURIComponent(this.get('database_name')) + "&collection_name=" + this.get('collection_name') + "&from=" + paginated_content_index;

      var getMoreContent = Mongoman.Request.find(api);
      getMoreContent.then(function loadedMoreContent(response) {
        this.set('content', response.documents);
      }.bind(this),
      function failedToLoadContent(error) {
        this.set('content', error);
      }.bind(this));
    }
  }

});
