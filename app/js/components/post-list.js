/**
 * Component for generating post-list elements.
 * Handles setting the height of the list based on loads
 * this allows for smooth animations when loading in
 * posts, rather than the parent jumping around all crazy.
 */
define(['jquery', 'canjs', 'views', 'models/posts'], function($, can, view, postsModel) {
  var ROW_HEIGHT = 210;
  var SINGLE_ROW_HEIGHT = 201;

  /**
   * Gets the number of rows based on the viewport width.
   * 900+      : 4 rows
   * 500 - 900 : 2 rows
   * <500      : 1 row
   * Yay for hardsetting styles!
   */
  var getGrid = function(postCount, viewportWidth) {
    var columns = (viewportWidth < 900 && viewportWidth > 500) ? 2 : (viewportWidth < 500) ? 1 : 4;
    var postCount = postCount !== 0 ? postCount : 12; //should always start with 12

    return {
      columns: columns, 
      rows: postCount / columns
    };
  };

  /**
   * Takes a components viewModel and sets the listHeight attribute
   * based on a simple calculation.
   */
  var setHeight = function(componentViewModel) {
    var viewport = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        postGrid = getGrid(componentViewModel.attr('posts').length, viewport),
        newHeight = postGrid.columns > 1 ? postGrid.rows * ROW_HEIGHT : postGrid.rows * SINGLE_ROW_HEIGHT;

    componentViewModel.attr('listHeight', newHeight);
  };

  return {
    tag: 'post-list',
    template: can.view('templates/posts'),
    viewModel: {
      posts: [],
      offset: 0,
      isLoading: true,
      listHeight: 0,

      updatePostList: function() {
        var self = this;

        //set offset and prep loading;
        self.attr('offset', self.offset + 12);
        self.attr('isLoading', true);

        //fetch more items, when it's done cancel loading and concat the posts;
        postsModel.findAll(self.offset).then(function(posts) {
          self.attr('isLoading', false);
          self.attr('posts', self.attr('posts').concat(posts));
          setHeight(self);
        });
      }
    },
    events: {
      inserted: function() {
        var self = this;

        postsModel.findAll().then(function(posts) {
          self.viewModel.attr('isLoading', false);
          self.viewModel.attr('posts').replace(posts);
          setHeight(self.viewModel);
        });
      },

      '{window} resize': function() {
          setHeight(this.viewModel);
      }
    }
  };
});