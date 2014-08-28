$(function () {
  var Person = Backbone.Model.extend({

  });

  var PeopleList = Backbone.Collection.extend({
    model: Person,
    comparator: function(person) {
      return person.get('name').toLowerCase();
    }
  });

  var People = new PeopleList;

  var PersonView = Backbone.View.extend({
    tagName: "li",
    template: _.template($('#person-template').html()),
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.input = this.$('input.name'); //why is this here?
      return this;
    },
    events: {
      "click a.destroy" : "clear",
      "dblclick"  : "edit",
      "click a.update" : "update",
      "keypress .edit"  : "updateOnEnter",
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    clear: function() {
      this.model.destroy();
    },
    edit: function() {
      this.$el.addClass("editing");
      this.input.focus();
    },
    update: function() {
      var name = this.input.val(),
        weight = this.$('.weight').val();

      if (name) {
        this.model.set({
          name: name, 
          weight: weight
        });
      }
      else {
        this.clear();
      }
      this.$el.removeClass("editing");
    },
    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.update();
    },

  });

  PeopleApp = Backbone.View.extend({
    el: $("#peopleApp"),
    
    events: {
      "keypress #newPerson, #weight":  "createOnEnter"
    },

    initialize: function() {
      this.input = this.$("#newPerson");
      this.weight = this.$("#weight");

      this.listenTo(People, 'add', this.addPerson);
      this.listenTo(People, 'remove', this.removePerson);
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
      
      if (e.keyCode != 13) return;
      if (!this.input.val()) return;

      People.add({
        name: this.input.val(),
        weight: this.weight.val(),
      });

      this.input.val('');
      this.weight.val('');
    },

    render: function() {
      console.log("in render");
      this.$("#peopleList").empty();
      people.each(function (person) {
        //console.log(person);
        var view = new PersonView({model: person});
        this.$("#peopleList").append(view.render().el);
      });
      return this;
    },

    addPerson: function(person) {
      console.log("in addperson");

      this.render();
      //var view = new PersonView({model: person});
      //this.$("#peopleList").append(view.render().el);
    },

    addAll: function() {
      People.each(this.addOne, this);
    },

    removePerson: function(person) {
      console.log("in removeperson");
    },
  });
  var peopleApp = new PeopleApp;
  window.app = peopleApp;
  window.people = People;


/*
  var Seat = Backbone.Model.extend({
    defaults: function() {
      return {
        row: 0
      };
    }
  });
*/

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