/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  var ROWS = 10;


  app.SeatList = Backbone.Collection.extend({
    model: app.Seat,

    localStorage: new Backbone.LocalStorage("SeatList"), // Unique name within your app.


    updateWeight: function() {
      console.log('in updateWeight');
      var leftWeight=0, rightWeight = 0;
      for (var i=0;i < this.length; i++) {
        if (this.models[i].get('person')) {
          if (this.models[i].get('side') == 'left') {
            leftWeight += parseInt(this.models[i].get('person').get('weight'));
          }
          else {
            rightWeight += parseInt(this.models[i].get('person').get('weight'));
          }
        }
      }
      $('.leftWeight').html(leftWeight);
      $('.rightWeight').html(rightWeight);
      $('.totalWeight').html(leftWeight + rightWeight);
    }
  });

  app.boat = new app.SeatList();

  //todo is this the best way to initialize?
  for (var i=1; i<=ROWS; i++) {
    app.boat.add({ identifier: i + 'l', row: i, side: "left"});
    app.boat.add({ identifier: i + 'r', row: i, side: "right"});
  }

})();