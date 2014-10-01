$(function () {

  var people = new PeopleList;
  window.peopleView = new PeopleView;
  window.people = people;

/*
  var Seat = Backbone.Model.extend({
  });

  window.Seat = Seat;
  
  var SeatView = Backbone.View.extend({
    tagName: "div",
    template: _.template($('#seat-template').html()),
    render: function() {
      return this.$el.html(this.template(this.model.toJSON()));
    },
  });

  window.SeatView = SeatView;
 
  var SeatCollection = Backbone.Collection.extend({
    model: Seat,
  });

  boat = new SeatCollection();

  for (var i=1;i<=10;i++) {
    boat.add({ row: i, side: "left"});
    boat.add({ row: i, side: "right"});
  }

  window.boat = boat;

  var BoatView = Backbone.View.extend({
    el: $("#boat"),

    render: function() {
      boat.each(function (seat) {
        var row = this.$("#boat").find(".row").eq(seat.get("row") -1);
        var seatEl;
        if (seat.get("side") == "left") {
          seatEl = row.find("div").eq(0);
        }
        else {
          seatEl = row.find("div").eq(1);
        }
        
        var sv = new SeatView({model: seat, el: seatEl});
        sv.render();
      });
    },
  });

  boatView = new BoatView;
  boatView.render();
*/
/*


  $(".row>div, #drummer, #steerer").click(function() {
    $(".row>div, #drummer, #steerer").removeClass("selected");
    $(this).addClass("selected");
    $("#name").val($(this).html());
    $("#weight").val($(this).data("weight"));
  });

  $("#submit").click(function() {
    var seat = $(".selected");
    seat.html($("#name").val());
    seat.data("weight", $("#weight").val());
    updateWeight();
  })

  function updateWeight() {
    var leftWeight = 0, rightWeight = 0, totalWeight = 0;
    $(".row").each(function() {
      if (parseInt($(this).find(".seat:first").data("weight")) > 0) {
        leftWeight += parseInt($(this).find(".seat:first").data("weight"));
      }
      if (parseInt($(this).find(".seat").eq(1).data("weight")) > 0) {
        rightWeight += parseInt($(this).find(".seat").eq(1).data("weight"));
      }
    });
    $("#leftweight").val(leftWeight);
    $("#rightweight").val(rightWeight);
    totalWeight = leftWeight + rightWeight;
    if (parseInt($("#drummer").data("weight")) > 0) {
        totalWeight += parseInt($("#drummer").data("weight"));
    }
    if (parseInt($("#steerer").data("weight")) > 0) {
        totalWeight += parseInt($("#steerer").data("weight"));
    }
    $("#totalweight").val(totalWeight);
  }
  */
});