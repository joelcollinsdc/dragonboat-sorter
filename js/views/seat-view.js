/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
  'use strict';

  app.SeatView = Backbone.View.extend({
    tagName: "div",
    template: _.template($('#seat-template').html()),
    render: function() {
      //add in person data if we have it
      var data = this.model.toJSON();
      if (data.person) {
        data.personName = data.person.get("name");
        data.draggable = true;
      }
      else {
        data.personName = '(empty)';
        data.draggable = false;
      }

      
      return this.$el.html(this.template(data));
    },
    events: {
      "dragstart" : "dragstart",
      "drop" : "drop",
      "dragover" : "dragover",
      "dragleave" : "dragleave",
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      //this.listenTo(this.model, 'destroy', this.remove);
    },
    dragstart: function (e) {
      console.log('dragstart seat');
      //console.log($(this).html());
      var f = e.originalEvent;
      f.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
      f.dataTransfer.setData('Text', this.$el.find(".name").val()); // required otherwise doesn't work
    },
    drop: function (e) {
      this.$el.html(e.originalEvent.dataTransfer.getData('Text'));
      this.$el.removeClass('over');
      this.$el.addClass('seated');
      
      //get the model of the person (?necessary)
      var person = app.people.first();
      //update the model with the person
      this.model.set({ person : person });
      person.set({ seat: this.model });
    },
    dragover: function (ev) {
      console.log("over...");
      this.$el.addClass('over');
      var e = ev.originalEvent;
      if (e.preventDefault) e.preventDefault(); // allows us to drop
      //this.className = 'over';
      e.dataTransfer.dropEffect = 'copy';
      return false;
    },
    dragleave: function (e) {
      e=e.originalEvent;
      if (e.preventDefault) e.preventDefault(); // allows us to drop
      console.log("out...");
      this.$el.removeClass('over');
      return false;
    },
  });
})(jQuery);