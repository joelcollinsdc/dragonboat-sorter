/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
  'use strict';

  app.SeatView = Backbone.View.extend({
    tagName: "div",
    template: _.template($('#seat-template').html()),
    render: function() {
      return this.$el.html(this.template(this.model.toJSON()));
    },
  });
})(jQuery);