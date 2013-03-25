var baseController = klass(function(options, config, domCache) {
	this.options = options;
	this.domCache = domCache;
	this.config = config;
	
	this.appendToDom();
}).methods({
	infiniteLoadHandler: function () {
		
	},
	appendToDom: function () {
		console.log('appendtoDOM');
	},
	onComplete: function () {

	}
});

FLICKBROWSR.prototype.controllers = {
	home: function() {
		var that = this;
		$.mustache.load('templates/home.mustache', function(data) {
		  	var default_html = Mustache.render(data);
			$container.html(utilities.htmlWithFadingImgs(default_html));
          	$searchbox.val('');
          	$('#selecttype').val('search');
			
			that.homeInterestingness();

          	that.homeTags();
		});
	},
	search: function() {
		
	},
	user: function() {
		
	},
	gallery: function() {
		
	},
	group: function() {
		
	},
	photoset: function() {
		
	},
	camera: function() {
		
	},
	tags: function() {
		
	},
	api: function() {
		
	}
};
