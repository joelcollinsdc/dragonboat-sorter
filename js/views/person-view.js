/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
  'use strict';



  app.PersonView = Backbone.View.extend({
    tagName: "li",
    template: _.template($('#person-template').html()),
    events: {
      "click a.destroy" : "clear",
      "dblclick"  : "edit",
      "click a.update" : "close",
      "keypress .edit"  : "updateOnEnter",
      "dragstart" : "dragstart",
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function() {
      var data= this.model.toJSON();
      if (data.seat) {
        data.seatName = data.seat.get('identifier');
      }
      else{
        data.seatName = '(unassigned)';
      }
      this.$el.html(this.template(data));
      this.$name = this.$('input.name'); //this is here because its 

      return this;
    },
    clear: function() {
      this.model.destroy();
    },
    edit: function() {
      this.$el.addClass("editing");
      this.$name.focus();
      this.$el.find(".side_pref").val(this.model.get("side_pref"));
    },

    close: function() {
      console.log('in close');
      if (!this.$el.hasClass('editing')) {
        return;
      }
      var name = this.$name.val(),
        weight = this.$('.weight').val(),
        side_pref = this.$('.side_pref').val();

      if (name) {
        console.log('saving ' + name);
        this.model.save({
          name: name, 
          weight: weight,
          side_pref: side_pref
        });
      }
      else {
        this.clear();
      }
      this.$el.removeClass("editing");
      this.$el.draggable({ snap: ".row div" });
    },
    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },
    dragstart: function(e) {
      console.log('dragstart');
      //console.log($(this).html());
      var f = e.originalEvent;
      f.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
      app.modelDragged = this.model;
    }
  });
})(jQuery);