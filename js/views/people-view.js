/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

$(function () {
  app.PeopleView = Backbone.View.extend({
    el: $("#peopleApp"),
    
    events: {
      "keypress #new_person, #new_weight":  "createOnEnter"
    },

    initialize: function() {
      this.$new_name = this.$("#new_person");
      this.$new_weight = this.$("#new_weight");
      this.$new_side_pref = this.$("#new_side_pref");

      //todo whats this for?
      this.listenTo(app.people, 'add', this.addPerson);
      this.listenTo(app.people, 'remove', this.removePerson);
    },

    //attributes for a new person
    new_attributes: function() {
      var ret = { 
        name: this.$new_name.val(),
        side_pref: this.$new_side_pref.val()
      };
      if (this.$new_weight.val()) {
        ret.weight = this.$new_weight.val();
      }
      return ret;
    },

    clear_new_fields: function() {
      this.$new_name.val('');
      this.$new_weight.val('');
      this.$new_side_pref.val('Both');
    },

    // If you hit return in the main $new_name field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
      if (e.keyCode != ENTER_KEY) return;
      if (!this.$new_name.val()) return;

      app.people.add(this.new_attributes());

      this.clear_new_fields();
    },

    render: function() {
      console.log("in render");
      this.$("#peopleList").empty();
      app.people.each(function (person) {
        //console.log(person);
        var view = new app.PersonView({model: person});
        this.$("#peopleList").append(view.render().el);
      });
      return this;
    },

    addPerson: function(person) {
      console.log("in addperson");

      this.render();
      //var view = new PersonView({model: person});
      //this.$("#peopleList").appe;nd(view.render().el);

      bindperson();
    },

    addAll: function() {
      app.people.each(this.addOne, this);
    },

    removePerson: function(person) {
      console.log("in removeperson");
    },
  });
});