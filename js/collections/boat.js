/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  var ROWS = 10;


  app.SeatList = Backbone.Collection.extend({
    model: app.Seat
  });

  app.boat = new app.SeatList();

  //todo is this the best way to initialize?
  for (var i=1; i<=ROWS; i++) {
    app.boat.add({ identifier: i + 'l', row: i, side: "left"});
    app.boat.add({ identifier: i + 'r', row: i, side: "right"});
  }

})();