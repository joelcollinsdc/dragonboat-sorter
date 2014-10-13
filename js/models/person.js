/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  app.Person = Backbone.Model.extend({
    defaults: {
      name: '',
      weight: 150,
      side_pref: 'Both'
    },
    
  });

})();