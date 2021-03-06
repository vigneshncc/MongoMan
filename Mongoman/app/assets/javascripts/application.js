// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery.ui.dialog
//= require jquery.flash
//= require turbolinks
//= require handlebars
//= require ember.latest
//= require bootpag
//= require_self
//= require_tree ./controllers
//= require_tree ./routes
//= require_tree ./templates
//= require_tree ./models
//= require_tree ./helpers
//= require_tree ./views




Mongoman = Ember.Application.create({
	LOG_TRANSITIONS: true,
	LOG_VIEW_LOOKUPS: true,
	LOG_ACTIVE_GENERATION: true
});