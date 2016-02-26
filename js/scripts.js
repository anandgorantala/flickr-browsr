'use strict';

Shadowbox.init({
    skipSetup: true,
    viewportPadding: $(window).width() > 500 ? 10 : 10,
    slideshowDelay: 4,
    displayCounter: false,
    onChange: function (element) {
        $(element.link).focus().blur();
        $('<img/>')[0].src = $(element.link).next().attr('href');
    },
    onOpen: function (currentImage) {
        Shadowbox.play();
        Shadowbox.pause();
    }
});

/*
    
*/

var flickrapi = (function () {
    var api_key = '4d22941636893fd6132c3c3c91554972',
        api_url = 'https://api.flickr.com/services/rest/',
        localCache = {};

    return {
        callMethod: function (params) {
            var cacheKey = JSON.stringify(params);
            if(localCache[cacheKey]) {
                params.jsoncallback(localCache[cacheKey]);
                return;
            }
            var constructedurl = api_url + '?api_key=' + api_key + '&format=json',
                key;
            for (key in params) {
                if (key !== 'jsoncallback' && key != 'format') {
                    constructedurl += '&' + key + '=' + params[key];
                }
            }


            $.ajax({
                url: constructedurl,
                dataType: 'jsonp',
                jsonp: 'jsoncallback',
                success: function (data, status, jqXHR) {
                    if (data.stat !== 'ok') {
                        flickrbrowsr.throwError(data.message);
                        return;
                    }
                    localCache[cacheKey] = data;
                    params.jsoncallback(data);
                },
                error: function(jqXHR, status, errorThrown) {
                    flickrbrowsr.throwError(errorThrown); 
                }
            });
        }
    };
}());


var flickrbrowsr = (function () {
    var params = {
            page : 1,
            type: 'home',
            format : 'json',
            extras : 'owner_name,views,url_c,url_t,url_z,url_l,url_m,url_o,url_sq,license'
        },
        // Configuration items for the app
        config = {
            maxItemsPerPage : 1000, // Max items per page before showing pagination.
            per_page : 50, // Items per api request.
            photo_width : 320,
            offset : -600,
            metadataClass : 'hasMetaInfo'
        },
        state = {
            loading : 0, // If there is an ajax request pending
            finished : 0, // If the processing is finished
            isotopeActive : 0, // If isotope plugin has been initialized
            metaInfo : {}
        },
        DOMCache = {
            $window : $(window),
            $body : $('body'),
            $container : $('#container'),
            $searchbox : $('#searchbox'),
            $selectType : $('#selecttype'),
            $searchtip : $('.searchtip'),
            $statusbar : $('#statusbar'),
            $userinfo : $('#metainfo'),
            $metainfo : $('#metainfo'),
            windowwidth : $(window).width()
        },
        flickbrowsr = new FLICKBROWSR(),
        user_id,
        done = 0,
        licenses = {
            info: {},
            imgs: {
                0: '&copy;',
                1: 'cbna',
                2: 'cbn',
                3: 'cbnd',
                4: 'cb',
                5: 'cba',
                6: 'cbd',
                7: 'p',
                8: 'usa.gov'
            }
        };

    return {
        init: function () {
            this.getLicenses();
            $(window).hashchange(function () {
                flickrbrowsr.run();
            }).trigger('hashchange');
            this.headerScrollHandler();
        },
        run: function () {
            var hash = window.location.hash.replace('#', '');
            $.extend(params, this.parseUrlHash(hash));
            this.setFormValues(params);
            this.reset();

            this.router(params);
            new (this.metadataFactory(params.type))(params, config, DOMCache).setMetaData();
        },
        router: function (params) {
            var methodmap = {
                    'search': 'flickr.photo.search',
                    'user': 'flickr.photo.search',
                    'favorites': 'flickr.photo.search',
                    'gallery': 'flickr.photo.search',
                    'group': 'flickr.photo.search',
                    'photoset': 'flickr.photo.search',
                    'place': 'flickr.photo.search',
                    'camera': 'flickr.photo.search',
                    'tags': 'flickr.photo.search',
                    'api': 'flickr.photo.search'
                },
                querymap = {
                    'search': 'q',
                    'user': 'user_id',
                    'gallery': 'gallery_id',
                    'group': 'group_id',
                    'photoset': 'photoset_id',
                    'place': 'lat,lng',
                    'camera': 'camera',
                    'tags': 'tags',
                    'api': 'method'
                },
                routes = {
                    'home': this.homeController,
                    'search': this.searchController,
                    'user': this.userController,
                    'favorites': this.userController,
                    'gallery': this.galleryController,
                    'group': this.groupController,
                    'photoset': this.photosetController,
                    'collection': this.collectionController,
                    'place': this.placeController,
                    'camera': this.cameraController,
                    'tags': this.tagsController,
                    'api': this.apiController
                };

            if (!routes[params.type]) {
                params.type = 'home';
            }
            routes[params.type].call(this, params);

        },
        parseUrlHash: function(hash) {
            var temp,
                hasharray = [],
                hasharraylen,
                hashkeys = {},
                i;

            if (!hash) {
                return {
                    type: 'home'
                };
            }

            hasharray = hash.split('&');
            for (i = 0, hasharraylen = hasharray.length; i < hasharraylen; i++) {
                temp = hasharray[i].split('=');
                hashkeys[temp[0]] = temp[1];
            }
            hashkeys['query'] = hashkeys['q'] || "";
            hashkeys['type'] = hashkeys['type'] || "home";
            hashkeys['sort'] = hashkeys['sort'] || "interestingness-desc";
            hashkeys['view'] = hashkeys['view'] || "";

            return hashkeys;
        },
        setFormValues: function (options) {
            if(DOMCache.$selectType.val() != options.type &&
                    DOMCache.$selectType.find('option[value=' + options.type + ']').length > 0) {
                DOMCache.$selectType.val(options.type);
                DOMCache.$selectType.change();
            }
            DOMCache.$searchbox.val(decodeURIComponent(options.query)).change().focus().blur();
            $('#sort').val(options.sort);

        },
        reset: function () {
            params.page = 1;
            done = 0;
            state.loading = 0;
            DOMCache.$window.unbind('scroll.infinite');

            DOMCache.$container.html('');
            if(params.type != 'home') {
                DOMCache.$searchtip.hide();
            }
            Shadowbox.close();
            Shadowbox.clearCache();
            if (state.isotopeActive) {
                DOMCache.$container.isotope('destroy');
                state.isotopeActive = 0;
            }
            var bodyclass = DOMCache.$body.attr('class') ? DOMCache.$body.attr('class').replace('hasMetaInfo', '') : '';
            DOMCache.$body.removeClass(bodyclass).addClass(params.view).addClass(params.type);

            DOMCache.$statusbar.html('').removeClass('msg').css({display: 'block'});
            var to_get_photo_width = $("<a class='photo'></a>").
                                     hide().appendTo("body");
            config.photo_width = to_get_photo_width.css("width").replace(/[^\d]/g, "");
            to_get_photo_width.remove();

        },
        headerScrollHandler: function () {
            DOMCache.$window.bind('scroll.header', function () {
                $.throttle(10, function () {
                    var $header = $("#header");
                    if ($header.offset().top  > 25) {
                        $header.addClass('overlay');
                    } else {
                        $header.removeClass('overlay');
                    }
                });
            });
        },
        infiniteLoadHandler: function () {
            $(window).bind('scroll.infinite', function () {
                if (!params.view) {
                    flickrbrowsr.loadphotos();
                }

            });
        },
        metadataFactory: function (type) {
            var metadata = flickbrowsr.models.metadata;
            var metaLookup = {
                    'search': flickbrowsr.models.relatedTags,
                    'user': flickbrowsr.models.userMetadata,
                    'favorites': flickbrowsr.models.userMetadata,
                    'gallery': flickbrowsr.models.galleryMetadata,
                    'group': flickbrowsr.models.groupMetadata,
                    'photoset': flickbrowsr.models.photosetMetadata,
                    'collection': flickbrowsr.models.collectionMetadata,
                    'camera': flickbrowsr.models.cameraMetadata,
                    'api': flickbrowsr.models.apiMetadata
                };

            if(metaLookup[type]) {
                metadata = metaLookup[type];
            }
            return metadata;;

        },
       searchController: function (options) {
            //metadata = new flickbrowsr.models.relatedTags(options, config, DOMCache).setMetaData();
            this.infiniteLoadHandler();
            this.loadphotos();
        },
        userController: function (options) {
            //metadata = new flickbrowsr.models.userMetadata(options, config, DOMCache).setMetaData();
            this.getUser(options.query);
            this.infiniteLoadHandler();
        },
        galleryController: function (options) {
            //metadata = new flickbrowsr.models.galleryMetadata(options, config, DOMCache).setMetaData();
            this.lookupGallery(options.query);
            this.infiniteLoadHandler();
        },
        groupController: function (options) {
            //metadata = new flickbrowsr.models.groupMetadata(options, config, DOMCache).setMetaData();
            this.lookupGroup(options.query);
            this.infiniteLoadHandler();
        },
        photosetController: function (options) {
            //metadata = new flickbrowsr.models.photosetMetadata(options, config, DOMCache).setMetaData();

            flickrbrowsr.loadphotos();
            this.infiniteLoadHandler();
        },
        collectionController: function (options) {
            //metadata = new flickbrowsr.models.collectionMetadata(options, config, DOMCache).setMetaData();

            flickrapi.callMethod({
                method: 'flickr.collections.getTree',
                collection_id: options.query,
                user_id: options.user,
                jsoncallback: function(data) {
                    var collectionSets = data.collections.collection[0].set,
                        containerhtml = '';
                    for(var i = 0; i < collectionSets.length; i++) {
                        containerhtml = '<div class="photoset" data-id="'+collectionSets[i].id+'">'+
                        '<a href="#q='+collectionSets[i].id+'&type=photoset" class="setCase"></a>'+
                        '<a href="#q='+collectionSets[i].id+'&type=photoset"><span class="settitle">'+collectionSets[i].title+'</span></a>'+
                        '</div>'; 

                        DOMCache.$container.append(containerhtml);

                        flickrapi.callMethod({
                            method: 'flickr.photosets.getInfo',
                            photoset_id: collectionSets[i].id,
                            jsoncallback: function(data) {
                                var photoset = data.photoset,
                                    photosethtml = '<a href="#q='+photoset.id+'&type=photoset" class="setCase">'+
                                    '<img src="http://farm'+photoset.farm+'.static.flickr.com/'+photoset.server+'/'+photoset.primary+'_'+photoset.secret+'_s.jpg" alt="" />'+
                                    '</a>'+
                                    '<a href="#q='+photoset.id+'&type=photoset">'+
                                    '<span class="settitle">'+photoset.title._content+'</span>'+
                                    '<span class="photocount">'+photoset.photos+' photos</span>'+
                                    +'</a>';                                 
                                // Some reason, it was appending NaN at the end
                                DOMCache.$container.find('[data-id='+photoset.id+']').html(photosethtml.replace('NaN', ''));
                           }
                        });

                    }
                    DOMCache.$statusbar.hide();
               }
            });
        },
        apiController: function (options) {
            //metadata = new flickbrowsr.models.apiMetadata(options, config, DOMCache).setMetaData();
            this.getApiMethodInfo(options.query);
        },
        cameraController: function (options) {
            //metadata = new flickbrowsr.models.cameraMetadata(options, config, DOMCache).setMetaData();
            if(options.query != '') {
                this.loadphotos();
                this.infiniteLoadHandler();
            } else {
                this.getCameras(options.query);
            }

        },
        defaultController: function (options) {

        },
        /*
        ** Gets the user NSID from the username from the URL
        */
        getUser: function (input) {
            if (typeof input !== 'object') {
                if (input.match(/[^\d][@N][\d$]/)) {
                    params.user_id = params.query;
                    this.getUserInfo(params.user_id);
                    if (!params.view) {
                        this.loadphotos();
                    }
                    return;
                }

                flickrapi.callMethod({
                    method: 'flickr.urls.lookupUser',
                    url: 'http://flickr.com/photos/' + arguments[0],
                    jsoncallback: function (data) { flickrbrowsr.getUser(data); }
                });
            } else {
                var data = input;
                if (data.stat === 'ok') {
                    params.user_id = data.user.id;
                    this.getUserInfo(data.user.id);
                    if (!params.view) {
                        this.loadphotos();
                    }
                } else {
                    this.throwError(data.message);
                }
            }

        },
         /*
        ** Get the user info from the NSID and show at the top. Make calls to show collections, photosets, galleries, favorites
        */
        getUserInfo: function (input) {
            var options = params;
            options.container = DOMCache.$container;
            if (typeof input !== 'object') {
                if (DOMCache.$userinfo.attr('data-infoid') == input) {
                    this.getPhotosetsOfUser(input, options);
                    this.getGalleriesOfUser(input, options);
                    this.getCollectionsOfUser(input);
                    this.getGroupsOfUser(input, options);
                    this.getContactsOfUser(input);
                    this.getFavoritesOfUser(input);
                    return;
                }
                flickrapi.callMethod({
                    method: 'flickr.people.getInfo',
                    user_id: arguments[0],
                    jsoncallback: function (data) { flickrbrowsr.getUserInfo(data); }
                });
            } else {
                var data = input.person;

                this.getPhotosetsOfUser(data.nsid, options);
                this.getGalleriesOfUser(data.nsid, options);
                this.getCollectionsOfUser(data.nsid);
                this.getGroupsOfUser(data.nsid, options);
                this.getContactsOfUser(data.nsid);
                this.getFavoritesOfUser(data.nsid);
            }
        },
        getPhotosetsOfUser: function(input, options) {
            flickrapi.callMethod({
                method: 'flickr.photosets.getList',
                user_id: arguments[0],
                jsoncallback: function(data) {
                    var photosetdata = data.photosets;
                    if(options.random) {
                        photosetdata.photoset = photosetdata.photoset.splice(Math.floor((Math.random()*photosetdata.photoset.length)), 1);
                        options.statusindicator();
                    }

                    if(params.view =='photosets' || options.random) {
                        $.mustache.load('templates/photosets.mustache', function(data, partials) {
                            options.container.append(helpers.htmlWithFadingImgs(Mustache.render(data, photosetdata, partials)));
                            DOMCache.$statusbar.hide();
                        }, {'photoset': 'templates/photoset.mustache'});
                    }
               }
            });
        },
        homePhotosets: function(input) {
            var options = {
                'random': true,
                'container': DOMCache.$container.find('#hm_sets .content'),
                'statusindicator': function() { DOMCache.$container.find('#hm_sets .content').removeClass('loading'); }
            };
            for(var count = 15; count > 0; count--) {
                var userid = input.splice(Math.floor((Math.random()*input.length)), 1);
                this.getPhotosetsOfUser(userid, options);
            }
        },
        getGalleriesOfUser: function(input, options) {
            flickrapi.callMethod({
                method: 'flickr.galleries.getList',
                user_id: arguments[0],
                per_page: 500,
                jsoncallback: function(data) {
                    var gallerydata = data.galleries;
                    if(options.random) {
                        gallerydata.gallery = gallerydata.gallery.splice(Math.floor((Math.random()*gallerydata.gallery.length)), 1);
                        options.statusindicator();
                    }

                    if(params.view =='galleries' || options.random) {
                        $.mustache.load('templates/galleries.mustache', function(data, partials) {
                            options.container.append(helpers.htmlWithFadingImgs(Mustache.render(data, gallerydata, partials)));
                            DOMCache.$statusbar.hide();
                        }, {'gallery': 'templates/gallery.mustache'});
                        
                    }
                }
            });
        },
        homeGalleries: function(input) {
            var options = {
                'random': true,
                'container': DOMCache.$container.find('#hm_galleries .content'),
                'statusindicator': function() { DOMCache.$container.find('#hm_galleries .content').removeClass('loading'); }
            };
            for(var count = 20; count > 0; count--) {
                var userid = input.splice(Math.floor((Math.random()*input.length)), 1);
                this.getGalleriesOfUser(userid, options);
            }

        },        
        getCollectionsOfUser: function(input) {
            if(typeof input != 'object') {
                flickrapi.callMethod({
                    method: 'flickr.collections.getTree',
                    user_id: arguments[0],
                    jsoncallback: function(data) { flickrbrowsr.getCollectionsOfUser(data) }
                });
            } else {
                var data = input.collections.collection;
                if(params.view =='collections') {
                    var collectionshtml = '';
                    for(var i=0;i<helpers.jsonItemCount(data);i++) {
                        var collection_curr = data[i];
                        var collection_img = collection_curr.iconlarge;
                        if(collection_img.indexOf('http') != 0 ) {
                            collection_img = 'collection_default_l.gif';
                        }
                            collectionshtml += '<div class="collection"><a href="#q='+collection_curr.id.split('-')[1]+'&type=collection&user='+params.query+'" class="collCase">'+
                            '<img src="'+collection_img+'" alt=""></a><a href="#q='+collection_curr.id.split('-')[1]+'&type=collection&user='+params.query+'" class="colldesc">'+
                            '<span class="colltitle">'+collection_curr.title+'</span><span class="setcount">'+helpers.jsonItemCount(collection_curr.set)+' sets</span></a></div>';
                    }
                    DOMCache.$container.html(helpers.htmlWithFadingImgs(collectionshtml));
                    DOMCache.$statusbar.hide();
                }
            }
        },
        getGroupsOfUser: function(input, options) {
            flickrapi.callMethod({
                method: 'flickr.people.getPublicGroups',
                user_id: arguments[0],
                jsoncallback: function(data) {
                    var groups = data.groups;
                    if(options.random) {
                        groups.group = groups.group.splice(Math.floor((Math.random()*groups.group.length)), 1);
                        options.statusindicator();
                    } 
                    if(params.view =='groups' || options.random) {
                        $.mustache.load('templates/groups.mustache', function(data) {
                            options.container.append(helpers.htmlWithFadingImgs(Mustache.render(data, groups)));
                            DOMCache.$statusbar.hide();
                        });
                    }
                }
            });
        },
        homeGroups: function(input) {
            var options = {
                'random': true,
                'container': $('#hm_groups .content'),
                'statusindicator': function() { DOMCache.$container.find('#hm_groups .content').removeClass('loading'); }
            };
            for(var count = 10; count > 0; count--) {
                var userid = input.splice(Math.floor((Math.random()*input.length)), 1);
                this.getGroupsOfUser(userid, options);
            }

        },
        getContactsOfUser: function(input) {
            flickrapi.callMethod({
                method: 'flickr.contacts.getPublicList',
                user_id: arguments[0],
                jsoncallback: function(data) { 
                    var contactsdata = data.contacts;
                    if(params.view =='contacts') {
                        contactsdata.class="contact";
                        contactsdata.people = contactsdata.contact;
                        for(var i = 0; i < contactsdata.people.length; i++) {
                            contactsdata.people[i]['iconserver'] = parseInt(contactsdata.people[i]['iconserver']);
                        }
                        $.mustache.load('templates/people.mustache', function(data) {
                            DOMCache.$container.html(helpers.htmlWithFadingImgs(Mustache.render(data, contactsdata)));
                            DOMCache.$statusbar.hide();
                        });

                    }
                }
            });
        },
        getFavoritesOfUser: function(input) {
            flickrapi.callMethod({
                method: 'flickr.favorites.getPublicList',
                user_id: input,
                per_page: 5,
                jsoncallback: function(data) { 
                    var data = data.photos;
                    if(params.view =='favorites') {
                        
                    }
                }
            });
        },
        lookupGroup: function(input) {
            if(typeof input != 'object' && !input.match(/[^\d][@N][\d$]/)) {
                flickrapi.callMethod({
                    method: 'flickr.urls.lookupGroup',
                    url: 'http://flickr.com/groups/'+arguments[0],
                    jsoncallback: function(data) { flickrbrowsr.lookupGroup(data) }
                });
            } else {
                if(typeof input != 'object') {
                    this.loadphotos();

                    return;
                }
                var data = input;
                params.query = data.group.id;
                this.loadphotos();
            }
        },
        lookupGallery: function(input) {
            flickrapi.callMethod({
                method: 'flickr.urls.lookupGallery',
                url: arguments[0],
                jsoncallback: function(data) { 
                    params.query = data.gallery.id;
                    flickrbrowsr.loadphotos();
                }
            });

        },
        loadphotos: function() {
            if(((DOMCache.$window.scrollTop()+ DOMCache.$window.height()) - DOMCache.$statusbar.offset().top  > config.offset) && state.loading == 0 && done != 1) {
                state.loading = 1;
                if(params.type == 'user') {
                    flickrapi.callMethod({
                        method: 'flickr.people.getPublicPhotos',
                        user_id: params.user_id,
                        per_page: config.per_page,
                        page:params.page,
                        extras: params.extras,
                        jsoncallback: function(data) { flickrbrowsr.appendPhotos(data) }
                    });
                } else if(params.type == 'favorites') {
                    flickrapi.callMethod({
                        method: 'flickr.favorites.getPublicList',
                        user_id: params.user_id,
                        per_page: config.per_page,
                        page:params.page,
                        extras: params.extras,
                        jsoncallback: function(data) { flickrbrowsr.appendPhotos(data) }
                    });
                } else if(params.type == 'search') {
                    flickrapi.callMethod({
                        method: 'flickr.photos.search',
                        text: params.query,
                        sort: params.sort,
                        per_page: config.per_page,
                        page:params.page,
                        extras: params.extras,
                        jsoncallback: function(data) { flickrbrowsr.appendPhotos(data) }
                    });
                } else if(params.type == 'tags') {
                    flickrapi.callMethod({
                        method: 'flickr.photos.search',
                        tags: params.query,
                        sort: params.sort,
                        per_page: config.per_page,
                        page:params.page,
                        extras: params.extras,
                        jsoncallback: function(data) { flickrbrowsr.appendPhotos(data) }
                    });
                } else if(params.type == 'photoset') {
                    flickrapi.callMethod({
                        method: 'flickr.photosets.getPhotos',
                        photoset_id: params.query,
                        per_page: config.per_page,
                        page:params.page,
                        extras: params.extras,
                        jsoncallback: function(data) { flickrbrowsr.appendPhotos(data) }
                    });
                } else if(params.type == 'gallery') {
                    flickrapi.callMethod({
                        method: 'flickr.galleries.getPhotos',
                        gallery_id: params.query,
                        per_page: 18,
                        page:params.page,
                        extras: params.extras,
                        jsoncallback: function(data) { flickrbrowsr.appendPhotos(data) }
                    });
                } else if(params.type == 'group') { 
                    flickrapi.callMethod({
                        method: 'flickr.groups.pools.getPhotos',
                        group_id: params.query,
                        per_page: config.per_page,
                        page:params.page,
                        extras: params.extras,
                        jsoncallback: function(data) { flickrbrowsr.appendPhotos(data) }
                    });
                } else if(params.type == 'camera' && params.query != '') {
                    flickrapi.callMethod({
                        method: 'flickr.photos.search',
                        text: params.query,
                        sort: params.sort,
                        per_page: config.per_page,
                        page:params.page,
                        extras: params.extras,
                        jsoncallback: function(data) { flickrbrowsr.appendPhotos(data) }
                    });
                } else {

                }
                params.page += 1;
            }
        },
        appendPhotos: function(data) {
            var that = this,
                photodata,
                photo,
                t_url,
                b_url,
                thumb_url,
                full_url,
                img_width,
                img_height,
                permalink,
                owner_url,
                photoowner,
                s = "";

            if(data.stat != 'ok') {
                that.doneLoadingImgs();
                done=1;
                this.throwError(data.message);
                return;
            }

            switch(params.type) {
                case 'photoset':
                    photodata = data.photoset;
                    photoowner = photodata.owner;
                    break;
                default:
                    photodata = data.photos;
                    break;
            }

            var photoslength = photodata.photo.length;
            if(photoslength < 1) { DOMCache.$statusbar.addClass('msg').html('No more photos to show.'); done = 1; state.loading = 0; return; }
            for (var i=0; i < photoslength; i++) {
              photo = photodata.photo[i];
              
              t_url = "http://farm" + photo.farm + ".static.flickr.com/" + 
                photo.server + "/" + photo.id + "_" + photo.secret + "_" + (DOMCache.windowwidth > 500 ? "n.jpg" : "q.jpg");
              b_url = "http://farm" + photo.farm + ".static.flickr.com/" + 
                photo.server + "/" + photo.id + "_" + photo.secret + "_" + "b.jpg";
              thumb_url = t_url;
              full_url = photo.url_c ? b_url : photo.url_z; // Since there is no checking for url_b, making an assumption here.
              full_url = full_url || t_url; // In case there is no url_z.
              full_url = photo.url_l || photo.url_o || photo.url_z || photo.url_m || full_url;
              photo.title = photo.title || 'Untitled';

              img_width = config.photo_width;
              img_height = parseInt(config.photo_width*photo.height_t/photo.width_t);
              if(!photoowner) { photoowner = photo.owner; }
              permalink = "http://www.flickr.com/photos/" + photoowner + "/" + photo.id;
              owner_url = "http://www.flickr.com/photos/" + photoowner;
              s +=  '<a rel="shadowbox[flickr]" data-owner_name="'+photo.ownername+'" data-views="'+photo.views+'" data-license="'+photo.license+'" data-permalink="'+permalink+'" data-owner_id="'+photoowner+'" data-owner_url="'+owner_url+'" class="photo noopacity" title="'+ helpers.htmlSafe(photo.title) + 
                '" href="' + full_url + '">' + '<img alt="'+ helpers.htmlSafe(photo.title) + 
                '" src="' + thumb_url + '" width="'+img_width+'" height="'+img_height+'"/>' + '<span>'+helpers.htmlSafe(photo.title)+'</span></a>';
                
              if(photo.owner) { photoowner = ''; }
            }
            var prevcontainerHTML = document.getElementById('container').innerHTML;
            //document.getElementById('container').innerHTML = document.getElementById('container').innerHTML + s;
            var $newElems = helpers.htmlWithFadingImgs(s);
            DOMCache.$container.append($newElems);

             Shadowbox.setup($newElems, {
                gallery: "flickr",
                overlayOpacity: 1,
                overlayColor:'#000'
            });
            if(prevcontainerHTML != '') {
                DOMCache.$container.isotope( 'appended', $newElems, true);
            } else {
                DOMCache.$container.isotope({
                    itemSelector : '.photo',
                    animationEngine: 'css'
                });
                
            }
            state.isotopeActive = 1;
            $('.noopacity').css({ opacity: 1 });    
            /*$newElems.each(function() {
                var imgheight = $(this).children('img').height();
                $(this).css('height',imgheight);
            });*/
            if(Shadowbox.isOpen()) {
                Shadowbox.gallery = $.map(
                                      Shadowbox.cache, 
                                      function (value) { 
                                          return value; 
                                      }
                                    );
            }
            if(params.type == 'gallery') {
                DOMCache.$statusbar.hide();
                done=1;
            }
            that.doneLoadingImgs();


        },
        homeController: function(data) {
            var photo,
                photoowner,
                t_url,
                b_url,
                full_url,
                permalink,
                owner_url,
                s="",
                that = this,
                arrOwners = new Array();
            if(!data.stat) {

                $.mustache.load('templates/home.mustache', function(data) {

                    var default_html = Mustache.render(data);
                    DOMCache.$container.html(helpers.htmlWithFadingImgs(default_html));
                    DOMCache.$searchbox.val('');
                    $('#selecttype').val('search');

                    var randomize_html = '<a title="Show another random date" href="#" onclick="flickrbrowsr.homeInterestingness();return false;">&larr;<br>&rarr;</a>';
                    var random_date = helpers.randomDate(new Date(2005,1,1), new Date());

                    flickrapi.callMethod({
                      method: 'flickr.interestingness.getList',
                      date: random_date.getFullYear() + '-' + helpers.padNumber((random_date.getMonth())+1, 2) + '-' + helpers.padNumber(random_date.getDate(), 2),
                      extras: params.extras,
                      per_page: '60',
                      jsoncallback: function(data) { flickrbrowsr.homeController(data) }
                    });
                    DOMCache.$container.find('.h2_interestingness').html('Interesting photos from <span>' + random_date.toDateString() + '</span>').
                            append(randomize_html);
                    DOMCache.$container.find('#hm_interestingness').html('').addClass('loading');
                    that.homeTags();
                });

            } else {

              if(data.stat != 'ok') {
                  that.doneLoadingImgs();
                  done=1;
                  this.throwError(data.message);
                  return;
              }
              var photodata = data.photos;
              var photoslength = photodata.photo.length;
              if(photoslength < 1) { DOMCache.$statusbar.addClass('msg').html('No more photos to show.'); done = 1; state.loading = 0; return; }
              for (var i=0; i < photoslength; i++) {
                photo = photodata.photo[i];
                full_url = photo.url_l || photo.url_o || photo.url_z || photo.url_m;
                photoowner = photo.owner;
                photo.title = photo.title || 'Untitled';
                permalink = "http://www.flickr.com/photos/" + photoowner + "/" + photo.id;
                owner_url = "http://www.flickr.com/photos/" + photoowner;
                s +=  '<a rel="shadowbox[flickr]" data-owner_name="'+photo.ownername+'" data-views="'+photo.views+'" data-license="'+photo.license+'" data-permalink="'+permalink+'" data-owner_id="'+photoowner+'" data-owner_url="'+owner_url+'" class="" title="'+ helpers.htmlSafe(photo.title) + 
                  '" href="' + full_url + '">' + '<img alt="'+ helpers.htmlSafe(photo.title) + 
                  '" src="' + photo.url_sq + '" width="75px" height="75px" />' + '</a>';

                arrOwners.push(photoowner);
              }
              this.homePhotosets(arrOwners.slice());
              this.homePeople(arrOwners.slice());
              this.homeGalleries(arrOwners.slice());
              this.homeGroups(arrOwners.slice());
             var $newElems = helpers.htmlWithFadingImgs(s);
              DOMCache.$container.find('#hm_interestingness').removeClass('loading').html($newElems);

              Shadowbox.setup($newElems, {
                  gallery: "flickr",
                  overlayOpacity: 1,
                  overlayColor:'#000'
              });

            }
        },
        homeInterestingness: function(data) {
			var photo,
				photoowner,
				t_url,
				b_url,
				full_url,
				permalink,
				owner_url,
				s="",
				that = this,
                arrOwners = new Array();

			if(typeof data != 'object') {

                var randomize_html = '<a title="Show another random date" href="#" onclick="flickrbrowsr.homeInterestingness();return false;">&larr;<br>&rarr;</a>';
                var random_date = helpers.randomDate(new Date(2005,1,1), new Date());

                flickrapi.callMethod({
                    method: 'flickr.interestingness.getList',
                    format: 'json',
                    date: random_date.getFullYear() + '-' + helpers.padNumber((random_date.getMonth())+1, 2) + '-' + helpers.padNumber(random_date.getDate(), 2),
                    extras: params.extras,
                    per_page: '60',
                    jsoncallback: 'flickrbrowsr.homeInterestingness'
                });
                $container.find('.h2_interestingness').html('Interesting photos from <span>' + random_date.toDateString() + '</span>').
                		append(randomize_html);
                $container.find('#hm_interestingness').html('').addClass('loading');

        	} else {

                if(data.stat != 'ok') {
                    that.doneLoadingImgs();
                    done=1;
                    this.throwError(data.message);
                    return;
                }
                var photodata = data.photos;
                var photoslength = photodata.photo.length;
                if(photoslength < 1) { $statusbar.addClass('msg').html('No more photos to show.'); done = 1; semaphore = 1; return; }
                for (var i=0; i < photoslength; i++) {
                    photo = photodata.photo[i];
                    full_url = photo.url_l || photo.url_o || photo.url_z || photo.url_m;
                    photoowner = photo.owner;
                    photo.title = photo.title || 'Untitled';
                    permalink = "http://www.flickr.com/photos/" + photoowner + "/" + photo.id;
                    owner_url = "http://www.flickr.com/photos/" + photoowner;
                    s +=  '<a rel="shadowbox[flickr]" data-owner_name="'+photo.ownername+'" data-views="'+photo.views+'" data-license="'+photo.license+'" data-permalink="'+permalink+'" data-owner_id="'+photoowner+'" data-owner_url="'+owner_url+'" class="" title="'+ helpers.htmlSafe(photo.title) + 
                    '" href="' + full_url + '">' + '<img alt="'+ helpers.htmlSafe(photo.title) + 
                    '" src="' + photo.url_sq + '" width="75px" height="75px" />' + '</a>';
                    
                    arrOwners.push(photoowner);
                }
			  this.homePhotosets(arrOwners.slice());
              this.homePeople(arrOwners.slice());
			  this.homeGalleries(arrOwners.slice());
 			  this.homeGroups(arrOwners.slice());
              var $newElems = helpers.htmlWithFadingImgs(s);
              $container.find('#hm_interestingness').removeClass('loading').html($newElems);

              Shadowbox.setup($newElems, {
                  gallery: "flickr",
                  overlayOpacity: 1,
                  overlayColor:'#000'
              });

			}
		},
        homeTags: function(data) {
            var tag,
                s = "";

            flickrapi.callMethod({
                method: 'flickr.tags.getHotList',
                period: 'week',
                jsoncallback: function(data) { 
                    var tagdata = data.hottags;
                    var tagslength = tagdata.tag.length;

                    for (var i=0; i < tagslength; i++) {
                        tag = tagdata.tag[i];
                        s +=  '<a href="#q='+tag._content+'&type=search">'+tag._content+'</a>';
                    }
                    DOMCache.$container.find('#hm_tags').removeClass('loading').html(s);
                }
            });
        },

        homePeople: function(input) {
            var count = 10;
            while(count > 0) {
                var userid = input.splice(Math.floor((Math.random()*input.length)), 1);

                flickrapi.callMethod({
                    method: 'flickr.people.getInfo',
                    user_id: userid,
                    jsoncallback: function(data) { 
                        var userinfo = {},
                            persondata = data.person,
                            personhtml = '';
                        persondata.iconserver = parseInt(persondata.iconserver);
                        persondata.resolvedname = (persondata.realname && persondata.realname._content) ? persondata.realname._content : persondata.username._content;
                        $.mustache.load('templates/people.mustache', function(data) {
                            personhtml = Mustache.render(data, {'people': persondata});
                            DOMCache.$container.find('#hm_people').removeClass('loading').append(helpers.htmlWithFadingImgs(personhtml));
                        });
                    }
                });

                count -= 1;
            }

        },
        /*
        ** To load the next set of images after the previous images have loaded.
        */
        doneLoadingImgs: function() {
            state.loading = 0;
            this.loadphotos();
        },
        getApiMethods: function(apiMethod) {
            var s = '';
            DOMCache.$container.html('<div id="methodinfo"></div><div id="methodlist"></div>');

            flickrapi.callMethod({
                method: 'flickr.reflection.getMethods',
                jsoncallback: function(data) { 
                    var apiMethods = apiModel.getMethods(data);
                    
                    $.mustache.load('templates/api-main.mustache', function(data) {
                        s = Mustache.render(data, apiMethods);
                        DOMCache.$container.find('#methodlist').html(s);
                        if(apiMethod) {
                            DOMCache.$container.find('#methodlist a').removeClass('active');
                            DOMCache.$container.find('#methodlist a[data-method="'+apiMethod+'"]').addClass('active').focus().blur();
                            DOMCache.$window.scrollTop(0);
                        }
                        if(params.query == '') {
                            DOMCache.$container.find('#methodlist').isotope({
                                itemSelector : '.methodgroup',
                                animationEngine: 'css'
                            });
                            state.isotopeActive = 1;
                        }
                        DOMCache.$statusbar.hide();

                    });                       
                }
            });

            done=1;
            this.doneLoadingImgs();

        },
        getApiMethodInfo: function(data) {  

            if(!DOMCache.$container.find('#methodinfo').length) {
                this.getApiMethods(data);
            }

            if(data == '') { DOMCache.$container.removeClass('methodinfo'); return; }

            flickrapi.callMethod({
                method: 'flickr.reflection.getMethodInfo',
                method_name: data,
                jsoncallback: function(data) { 

                    var methodData = apiModel.prepMethodInfo(data);
                     $.mustache.load('templates/api-method.mustache', function(data) {
                        DOMCache.$container.find('#methodinfo').html(Mustache.render(data, methodData));

                        DOMCache.$container.find('.desc a, table a').each(function() { 
                          if($(this).attr('href').indexOf('http://') != -1) {
                            $(this).attr('target', '_blank');
                          } else {
                            $(this).attr('href', 'http://www.flickr.com'+$(this).attr('href')).attr('target', '_blank'); 
                          }
                        });
                     });                        
                }
            });
            DOMCache.$container.addClass('methodinfo');


        },
        getCameras: function(input) {
            if(typeof input != 'object') {

                flickrapi.callMethod({
                    method: 'flickr.cameras.getBrands',
                    jsoncallback: function(data) { flickrbrowsr.getCameras(data) }
                });
            } else {
                var cameras = input.brands;
                var cameracount = cameras.brand.length;
                var containerhtml = '';
                for(var i=0; i<cameracount; i++) {
                    containerhtml += '<div class="camera-'+cameras.brand[i].id+'">'+
                    '<h2 class="camerabrands">'+cameras.brand[i].name+'</h2>'+
                    '<div class="cameraModelsWrap"><div class="cameraModels"></div></div></div>';
                    this.getCameraModels(cameras.brand[i].id);
                }
                DOMCache.$container.html(containerhtml);
                DOMCache.$statusbar.hide();
                done=1;
                this.doneLoadingImgs();
            }
        },
        getCameraModels: function(input) {
            if(typeof input != 'object') {

                flickrapi.callMethod({
                    method: 'flickr.cameras.getBrandModels',
                    brand: input,
                    jsoncallback: function(data) { flickrbrowsr.getCameraModels(data) }
                });
            } else {
                var cameraModels = input.cameras;
                var cameraModelCount = cameraModels.camera.length;
                DOMCache.$container.find('.camera-'+cameraModels.brand+' h2').append(' ('+cameraModelCount+')');
                var cameraModelHtml = '';

                $.mustache.load('templates/cameras.mustache', function(data) {
                    cameraModelHtml = Mustache.render(data, cameraModels);                  
                    DOMCache.$container.find('.camera-'+cameraModels.brand+' .cameraModels').append(cameraModelHtml);
                });

            }

        },
        getLicenses: function(data) {
            var currentlicense;
            flickrapi.callMethod({
                method: 'flickr.photos.licenses.getInfo',
                jsoncallback: function(data) { 
                    var licenseData = data.licenses;
                    var licenseslength = licenseData.license.length;
                    for(var i= 0;i<licenseslength; i++) {
                        currentlicense = licenseData.license[i];
                        licenses.info[currentlicense.id] = {};
                        licenses.info[currentlicense.id] = currentlicense;
                    }
                }
            });

        },
        getLicenseHTML: function(id) {
            var classname = 'licenseinfo',
                s = '';

            if(!id || isNaN(id)) { return ''; }

            if(id != 0 && id != 8) {
                classname += ' cc_icon'
            }
            s += '<span class="'+classname+'" title="'+licenses.info[id].name+'">'+licenses.imgs[id]+'</span>';

            if(licenses.info[id].url != '') {
                s = '<a target="_blank" href="'+licenses.info[id].url+'">'+s+'</a>';
            }
            return s;
        },
        throwError: function(msg) {
            if(msg.indexOf('Photoset not found') != -1) {
                DOMCache.$statusbar.html('No more photos to show').addClass('msg');
                return;
            }
            DOMCache.$statusbar.html('<p class="error">:( '+msg+'</p>').addClass('msg');
        }
    }
})();
 
$(document).ready(function() {
    // To prevent the search tip bubble from flashing on load.
    $('.searchtip').css({opacity: .7});

    $('label').click(function() {
        $('label').removeClass('active');
        $('.inputhint').html($(this).attr('title'));
        $(this).addClass('active');
        $('#searchbox').focus();
    });
    $('#selecttype').change(function() {
        $('.inputhint').html($('#selecttype option:selected').attr('title'));
        $('#searchbox').focus();
        $('.textbox').change();
    });

    $('.textbox').bind('keyup focus click change blur',function() {
        if($(this).val() !='') {
            $('.inputhint').hide();
        } else {
            $('.inputhint').fadeIn();
        }
    });

    flickrbrowsr.init();


    $('#searchform').submit(function() {
        window.location.hash = $(this).serialize();
        return false;
    });
    $('select.sortselect').change(function() {
        $(this).parents('form').submit();
    });
    $('select.typeselect').change(function() {
      if($(this).val() != 'search' && $(this).val() != 'tags') {
        $('select.sortselect').hide()
        $('select.sortselect').attr('disabled', 'disabled');
      } else {
        $('select.sortselect').show();
        $('select.sortselect').removeAttr('disabled');
      }
    });

    
});

