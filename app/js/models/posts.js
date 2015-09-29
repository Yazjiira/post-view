define(['jquery', 'canjs'], function($, can) {
  return can.Model({
    findAll: function(curOffset) {
      var qparams = {
        offset: curOffset || 0,
        number: 12
      };
      var apiURL = 'https://public-api.wordpress.com/rest/v1/sites/idcdistro.wordpress.com/posts';

      return $.getJSON(apiURL, qparams).then(function(data) {
        return {
          data: data.posts
        };
      });
    
    }
  }, {});
});