var FLICKBROWSR = function() {
	var params = {
			page : 1, 
			format : 'json',
			extras : 'owner_name,views,url_c,url_t,url_z,url_l,url_m,url_o,url_sq,license'	
		}, 
		// Configuration items for the app
		config = {
			maxItemsPerPage : 1000, // Max items per page before showing pagination.
			per_page : 50, // Items per api request.
			photo_width : 320, 
			offset : -600
		},
		state = {
			loading : 0, // If there is an ajax request pending
			finished : 0, // If the processing is finished
			isotopeActive : 0 // If isotope plugin has been initialized
		},
		DOMCache = {
			$window : $(window),
			$body : $('body'),
			$container : $('#container'), 
			$searchbox : $('#searchbox'),
			$searchtip : $('.searchtip'),
			$statusbar : $('#statusbar'),
			$userinfo : $('#metainfo'),
			$footer : $('#footer'),
			$inputhint : $('.inputhint'),
			windowwidth : $(window).width()
		},
		licenses = {
			info: {},
			imgs: {
                  0:'&copy;',
                  1:'bna',
                  2:'bn',
                  3:'bnd',
                  4:'b',
                  5:'ba',
                  6:'bd',
                  7:'p',
                  8:'usa.gov'
                }
		};

};

FLICKBROWSR.prototype.models = function() {
	// Metadata Base Class
	var metadata = klass(function(options, config, domCache) {
			this.options = options;
			this.domCache = domCache;
			this.config = config;
				
		}).methods({
			setMetaData: function () {
				this.domCache.$metainfo.html('');
	            this.domCache.$body.removeClass(this.config.metadataClass);
			},
			setMetaHtml: function(html) {
				this.domCache.$metainfo.html(html);
	            this.domCache.$body.addClass(this.config.metadataClass);
			}
		}),

		// API Metadata Class
		apiMetadata = metadata.extend(function(options, config, domCache) {
		}).methods({
			setMetaData: function () {
				var that = this;
				$.mustache.load('templates/meta-api.mustache', function(data) {
	                var metahtml = Mustache.render(data);
	                that.setMetaHtml(metahtml);
	            });
			}
		}),

		//Camera Metadata Class
		cameraMetadata = metadata.extend(function(options, config, domCache) {
		}).methods({
			setMetaData: function() {
				this.supr();
				if(this.options.query != '') {
					var that = this;
		            flickrapi.callMethod({
		                method: 'flickr.cameras.getBrandModels',
		                brand: that.options.brand,
		                jsoncallback: function(data) {
		                	var cameraModels = data.cameras;
	                		var cameraModelCount = cameraModels.camera.length;
		                	for(var i = 0; i < cameraModelCount; i++) {
		                		if(cameraModels.camera[i].id == that.options.query) {
				                    var cameraData = cameraModels.camera[i];
				                    var camerahtml = '';
				                    camerahtml = '<a href="#type=camera&q=">Cameras</a> &rarr; ' + 
				                    			'<p class="name">'+
				                    			'<a target="_blank" href="http://flickr.com/cameras/'+cameraModels.brand+'/'+cameraData.id+'">' +
				                    			cameraData.name._content + 
				                    			'</a>'+
				                    			'</p>';

							        that.setMetaHtml(camerahtml);
		                		}
		                	}
		               }
		            });
	            }
			}
		}),
		// Photoset Metadata Class
		photosetMetadata = metadata.extend(function(options, config, domCache) {
		}).methods({
			setMetaData: function() {
				var that = this;
	            flickrapi.callMethod({
	                method: 'flickr.photosets.getInfo',
	                photoset_id: that.options.query,
	                jsoncallback: function(data) {
	                	var photosetdata = data;
	                	$.mustache.load('templates/meta-photoset.mustache', function(data) {
			                var metahtml = Mustache.render(data, photosetdata);
			                that.setMetaHtml(metahtml);
			                new FLICKBROWSR().models.setUsername(photosetdata.photoset.owner, $('#metainfo .username'));
			            });
	               }
	            });

			}

		}),
		// Gallery Metadata Class
		galleryMetadata = metadata.extend(function(options, config, domCache) {
		}).methods({
			setMetaData: function() {
				var that = this;
	            flickrapi.callMethod({
	                method: 'flickr.urls.lookupGallery',
	                url: that.options.query,
	                jsoncallback: function(data) {
	                	var gallerydata = data;
	                	$.mustache.load('templates/meta-gallery.mustache', function(data) {
			                var metahtml = Mustache.render(data, gallerydata);
			                that.setMetaHtml(metahtml);
			                new FLICKBROWSR().models.setUsername(gallerydata.gallery.owner, $('#metainfo .username'));
			            });
	               }
	            });

			}

		}),
		// User Metadata Class
		userMetadata = metadata.extend(function(options, config, domCache) {
			this.userdata = {};
			this.requestsRemaining = 7;
		}).methods({
			setMetaData: function() {
				var that = this;

                if (this.options.query.match(/[^\d][@N][\d$]/)) {
                    this.options.nsid = this.options.query;
                    this.getUserMetaInfo();
                } else {
	                flickrapi.callMethod({
	                    method: 'flickr.urls.lookupUser',
	                    url: 'http://flickr.com/photos/' + this.options.query,
	                    jsoncallback: function (data) { 
	                    	that.options.nsid = data.user.id;
	                    	that.getUserMetaInfo();
	                    }
	                });
	            }
			},
			getUserMetaInfo: function () {
				var that = this;
	            flickrapi.callMethod({
                    method: 'flickr.people.getInfo',
                    user_id: this.options.nsid,
                    jsoncallback: function (data) {
                    	data = data.person;
                		that.userdata.name = (data.realname && data.realname._content) ? data.realname._content : data.username._content;
	                    that.userdata.profileurl = data.profileurl._content;
	                    that.userdata.iconserver = parseInt(data.iconserver, 10);
	                    that.userdata.iconfarm = data.iconfarm;
	                    that.userdata.nsid = data.nsid;
	                    that.userdata.photos = data.photos.count._content;
	                    that.userdata.path_alias = data.path_alias;
	                    that.userdata.location = data.location ? data.location._content : '';

	                    that.setUserMetaInfo();
                    }
                });

	            // Get favorites count.
	            flickrapi.callMethod({
                    method: 'flickr.favorites.getPublicList',
                    user_id: this.options.nsid,
                    per_page: 5,
                    jsoncallback: function (data) {
	                    that.userdata.favorites = parseInt(data.photos.total, 10);
                    	that.requestsRemaining--;
                    	that.setUserMetaInfo();
                    }
                });

	            // Get photosets count.
	            flickrapi.callMethod({
                    method: 'flickr.photosets.getList',
                    user_id: this.options.nsid,
                    per_page: 5,
                    jsoncallback: function (data) {
	                    that.userdata.photosets = parseInt(data.photosets.total, 10);
                    	that.requestsRemaining--;
                    	that.setUserMetaInfo();
                    }
                });

	            // Get galleries count.
	            flickrapi.callMethod({
                    method: 'flickr.galleries.getList',
                    user_id: this.options.nsid,
                    per_page: 5,
                    jsoncallback: function (data) {
	                    that.userdata.galleries = parseInt(data.galleries.total, 10);
                    	that.requestsRemaining--;
                    	that.setUserMetaInfo();
                    }
                });

	            // Get collections count.
	            flickrapi.callMethod({
                    method: 'flickr.collections.getTree',
                    user_id: this.options.nsid,
                    jsoncallback: function (data) {
	                    that.userdata.collections = helpers.jsonItemCount(data.collections.collection);
                    	that.requestsRemaining--;
                    	that.setUserMetaInfo();
                    }
                });

	            // Get groups count.
	            flickrapi.callMethod({
                    method: 'flickr.people.getPublicGroups',
                    user_id: this.options.nsid,
                    jsoncallback: function (data) {
	                    that.userdata.groups = helpers.jsonItemCount(data.groups.group);
                    	that.requestsRemaining--;
                    	that.setUserMetaInfo();
                    }
                });

	            // Get contacts count.
	            flickrapi.callMethod({
                    method: 'flickr.contacts.getPublicList',
                    user_id: this.options.nsid,
                    per_page: 5,
                    jsoncallback: function (data) {
	                    that.userdata.contacts = parseInt(data.contacts.total, 10);
                    	that.requestsRemaining--;
                    	that.setUserMetaInfo();
                    }
                });

			},
			setUserMetaInfo: function () {
				var that = this;
				$.mustache.load('templates/userinfo.mustache', function(data) {
	                var metahtml = Mustache.render(data, that.userdata);
	                that.setMetaHtml(metahtml);
	            });
			}

		}),
		// User Metadata Class
		groupMetadata = metadata.extend(function(options, config, domCache) {
		}).methods({
			setMetaData: function() {
				var that = this;

				if(this.options.query.match(/[^\d][@N][\d$]/)) {
					this.options.nsid = this.options.query;
                    this.getGroupMetaInfo();	                
	            } else {
	                flickrapi.callMethod({
	                    method: 'flickr.urls.lookupGroup',
	                    url: 'http://flickr.com/groups/'+this.options.query,
	                    jsoncallback: function(data) { 
	                    	that.options.nsid = data.group.id;
	                    	that.getGroupMetaInfo();
	                    }
	                });
	            }
			},
			getGroupMetaInfo: function () {
				var that = this;
	            flickrapi.callMethod({
	                method: 'flickr.groups.getInfo',
	                group_id: this.options.nsid,
	                jsoncallback: function (data) {
	                    var groupinfo = {},
	                        groupdata = data.group;

	                    $.mustache.load('templates/meta-group.mustache', function(data, partials) {
	                        groupdata.iconserver = parseInt(groupdata.iconserver);
	                        var metahtml = Mustache.render(data, groupdata, partials);
	                        that.setMetaHtml(metahtml);
	                    });

	                }
	            });
			}

		}),
		// Collection Metadata Class
		collectionMetadata = metadata.extend(function(options, config, domCache) {
		}).methods({
			setMetaData: function() {
				var that = this;
	            flickrapi.callMethod({
	                method: 'flickr.collections.getTree',
	                collection_id: that.options.query,
	                user_id: that.options.user,
	                jsoncallback: function(data) {
	                    var collection = data.collections.collection[0],
	                    	collectionhtml = '';
	                    collectionhtml = '<a class="username" href="#type=user&q='+that.options.user+'">' + that.options.user + '</a> &rarr; ' +
	                   	'<a href="#type=user&q='+that.options.user+'&view=collections">Collections</a> &rarr; ' + 
	                    	'<p class="name"><a target="_blank" href="http://www.flickr.com/photos/'+that.options.user+'/collections/'+that.options.query+'/">' + 
	                    	collection.title + '</a></p>' +
	                    	
	                    	' &middot; ' + collection.set.length + ' sets';

				        that.setMetaHtml(collectionhtml);

				        new FLICKBROWSR().models.setUsername(that.options.user, $('#metainfo .username'));
	               }
	            });

			}

		}),
		// Related Tags: Metadata for search
		relatedTags = metadata.extend(function(options, config, domCache) {
		}).methods({
			setMetaData: function() {
				var that = this;

	            flickrapi.callMethod({
	                method: 'flickr.tags.getRelated',
	                tag: that.options.query,
	                jsoncallback: function(data) {
	                    var tagshtml = '';

	                    if(data.tags.tag.length > 0) {
	                        tagshtml = 'RELATED TAGS ';
	                        var tagslength = data.tags.tag.length > 16 ? 16 : data.tags.tag.length;
	                        for(var i=0; i<tagslength; i++) {
	                          tagshtml += ' &middot; <a href="#q='+data.tags.tag[i]._content+'&type=search&sort='+that.options.sort+'">'+data.tags.tag[i]._content+'</a>';
	                        }
	                    }
				       that.setMetaHtml(tagshtml);
	               }
	            });
			}
		}),
		// Collections for NSID
		collectionsForUserId = function (options, callback) {

		};
		// Contacts for NSID
		contactsForUserId = function (options, callback) {
		}

		return {
			metadata: metadata,
			apiMetadata: apiMetadata,
			cameraMetadata: cameraMetadata,
			photosetMetadata: photosetMetadata,
			galleryMetadata: galleryMetadata,
			userMetadata: userMetadata,
			groupMetadata: groupMetadata,
			collectionMetadata: collectionMetadata,
			relatedTags: relatedTags
		}
}();



FLICKBROWSR.prototype.models.setUsername = function(nsid, $container) {
    flickrapi.callMethod({
        method: 'flickr.people.getInfo',
        user_id: nsid,
        jsoncallback: function (data) { 
        	$container.html((data.person.realname && data.person.realname._content) ? data.person.realname._content : data.person.username._content);
        }
    });

};


var apiModel = function() {
	return {
		getMethods: function(data) {
			var methods = data.methods;
          	var methodslength = methods.method.length;
          	var apiMethods = { 'apiCategories': new Array() };
          	subheading = methods.method[0]._content.split('.')[1];
           	var apiCategory = {
           		category: subheading,
           		methods: new Array()
           	}
          	for(var i= 0;i<methodslength; i++) {
				currentsubheading = methods.method[i]._content.split('.')[1];
                if(currentsubheading != subheading) {
                	apiMethods.apiCategories.push(apiCategory);
					subheading = currentsubheading;
          			apiCategory = {
	               		category: subheading,
	               		methods: new Array()
	               	};
                }
				currentmethod = methods.method[i];
				apiCategory['methods'].push({'method': currentmethod._content});
            }
            apiMethods.apiCategories.push(apiCategory);

            return apiMethods;
		},
		prepMethodInfo: function(data) {
			var optional = ['required', 'optional'],
				readwrite = ['','read', 'write'];

            data.method.requiredperms = readwrite[data.method.requiredperms];

			for(var i=0; i<data.arguments.argument.length; i++) {
				data.arguments.argument[i].optional = optional[data.arguments.argument[i].optional];
			}

            return data;
        }
	}
}();

var photoset;

var collection;

var group;