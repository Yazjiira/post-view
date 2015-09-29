/**
 * Component for 
 */
define(['jquery', 'canjs', 'views', 'models/posts'], function($, can, view, postsModel) {
  return {
    tag: 'post-list',
    template: can.view('templates/posts'),
    viewModel: {
      posts: [],
      offset: 0,

      updatePostList: function() {
        var self = this;
        self.attr('offset', self.offset + 12);

        postsModel.findAll(self.offset).then(function(posts) {
          self.attr('posts').replace(self.attr('posts').concat(posts));
        });
      }
    },
    events: {
      inserted: function() {
        this.viewModel.attr('posts').replace(postsModel.findAll());
      }
    }
  };
});