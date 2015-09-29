require.config({
	paths: {
	  jquery: 'vendor/bower_components/jquery/dist/jquery',
	  can: 'vendor/bower_components/canjs/amd/can',
	  views: 'tmp/views'
	},
	packages: [
	  {
	  	name: 'canjs',
	  	location: 'vendor/bower_components/canjs/amd',
	  	main: 'can'
	  }
	]
});