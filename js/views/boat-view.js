/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

$(function () {

  app.BoatView = Backbone.View.extend({
    el: $("#boat"),

    render: function() {
      app.boat.each(function (seat) {
        //console.log('rendering' + seat);
        var row = this.$("#boat").find(".row").eq(seat.get("row") -1);
        var seatEl;
        if (seat.get("side") == "left") {
          seatEl = row.find("div.seat").eq(0);
        }
        else {
          seatEl = row.find("div.seat").eq(1);
        }
        
        var sv = new app.SeatView({model: seat, el: seatEl});
        sv.render();
      });
    },
  });

});