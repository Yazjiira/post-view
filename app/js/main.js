/**
 * This is the main application entry point.
 * Here we include everything we need, register helpers and components
 * and then initialize the application.
 */
require([
  'jquery', 
  'canjs', 
  'views', 
  'components/manifest',
  'helpers/helpers'
], function($, can, views, componentManifest, helpers) {
  
  'user-strict';

  //register helpers
  for (var i = 0, len = helpers.length; i < len; i++) {
    var helper = helpers[i];
    can.mustache.registerHelper(helper.name, helper.fn); 
  }

  //register components
  for (var i = 0, len = componentManifest.length; i < len; i++) {
    can.Component.extend(componentManifest[i]); 
  }

  //on app start
  $(document).ready(function() {
    $('#appOut').append(can.view('templates/base', {}));
  });
});