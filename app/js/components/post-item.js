/**
 * Component for displaying each post-item
 * TODO: need trigger to show post detail when clicked
 */
define(['canjs'], function(can) {
  return {
    tag: 'post-item',
    template: can.view('templates/post-item'),
    events: {
      inserted: function() {
        console.log('post added component loaded');
      }
    }
  };
});
