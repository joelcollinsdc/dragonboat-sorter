/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  app.PeopleList = Backbone.Collection.extend({
    model: app.Person,

    //allow automatic sorting by name ignoring case
    comparator: function(person) {
      return person.get('name').toLowerCase();
    }
  });

  app.people = new app.PeopleList();
})();