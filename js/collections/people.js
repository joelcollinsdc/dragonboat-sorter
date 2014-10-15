/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  app.PeopleList = Backbone.Collection.extend({
    model: app.Person,
    localStorage: new Backbone.LocalStorage("PeopleList"), // Unique name within your app.

    //allow automatic sorting by name ignoring case
    comparator: function(person) {
      return person.get('name').toLowerCase();
    }
  });

  app.people = new app.PeopleList();
  app.people.fetch();
})();