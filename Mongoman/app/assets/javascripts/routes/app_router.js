Mongoman.Router.map(function() {

	this.route('databases', {path: '/'});
	this.route('about', {path: '/about'});
	this.route('collections',{path: '/collections/databases/:name'});
	this.route('documents', {path: '/documents/:database/:collection'});

});
