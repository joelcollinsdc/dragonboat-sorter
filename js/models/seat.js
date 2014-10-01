/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  app.Seat = Backbone.Model.extend({
    defaults: {
      person: ""
    }
  });

})();