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
      data.classname='';
      if (data.person) {
        data.personName = data.person.get("name");
        data.draggable = true;
        data.classname = 'seated';
      }
      else {
        data.personName = '(empty)';
        data.draggable = '';
      }

      
      return this.$el.html(this.template(data));
    },
    events: {
      "dragstart" : "dragstart",
      "drop" : "drop",
      "dragover" : "dragover",
      "dragleave" : "dragleave",
      "dragend" : "dragend",
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'change', this.updateweights)
      //this.listenTo(this.model, 'destroy', this.remove);
    },
    updateweights: function(e) {
      console.log('in updateweights');
      app.boat.updateWeight();
    },
    dragstart: function (e) {
      console.log('dragstart seat');

      //$(".dropPerson").removeClass('hidden');
      //$(".dropPersonSpacer").addClass('hidden');
      //console.log($(this).html());
      var f = e.originalEvent;
      f.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
      f.dataTransfer.setData('Text', this.$el.find(".name").val()); // required otherwise doesn't work
      app.modelDragged = this.model;

    },
    dragend: function (e) {

      console.log("in drag end");
      app.modelDragged = null;
      $(".dropPerson").addClass('hidden');
      $(".dropPersonSpacer").removeClass('hidden');
    },
    drop: function (e) {
      // drop could be a personview or seatview

      //this.$el.html(e.originalEvent.dataTransfer.getData('Text'));
      this.$el.removeClass('over');

      if (this.model.get("person")) {
        this.model.get("person").set("seat", null);
      }
      this.model.set("person", null);

      var person=null;
      if (app.modelDragged instanceof app.Seat) {
        person = app.modelDragged.get("person");
      }
      else {
        person = app.modelDragged;
      }

      this.model.set({ person: person})
      app.modelDragged.set({person: null});
      
      
      //update the model with the person
      //this.model.set({ person : person });
      person.set({ seat: this.model });

      app.pv.render();


      if (app.elementDragged) {
        app.elementDragged.model.set({ person: null });
        app.elementDragged = null;
      }


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