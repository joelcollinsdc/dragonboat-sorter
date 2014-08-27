$(function () {
  var Person = Backbone.Model.extend({
    defaults: function() {
      return {
        name: "Empty..."
      }; 
    }
  });

  var Available = Backbone.Collection.extend({
    model: Person
  })

  var PersonView = Backbone.View.extend({
    tagName: "div",
    template: _.template($('#person-template').html()),
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    }
  });

  var Seat = Backbone.Model.extend({
    defaults: function() {
      return {
        row: 0
      };
    }
  });

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
});