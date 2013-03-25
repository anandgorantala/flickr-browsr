  
  
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);


  $.fn.imagesLoaded = function( callback ) {
    var $this = this,
        $images = $this.find('img').add( $this.filter('img') ),
        len = $images.length,
        blank = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
        loaded = [];

    function triggerCallback() {
      callback.call( $this, $images );
    }

    function imgLoaded( event ) {
      var img = event.target;
      if ( img.src !== blank && $.inArray( img, loaded ) === -1 ){
        loaded.push( img );
        if ( --len <= 0 ){
          setTimeout( triggerCallback );
          $images.unbind( '.imagesLoaded', imgLoaded );
        }
      }
    }

    // if no images, trigger immediately
    if ( !len ) {
      triggerCallback();
    }

    $images.bind( 'load.imagesLoaded error.imagesLoaded',  imgLoaded ).each( function() {
      // cached images don't fire load sometimes, so we reset src.
      var src = this.src;
      // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
      // data uri bypasses webkit log warning (thx doug jones)
      this.src = blank;
      this.src = src;
    });

    return $this;
  };
  

(function($, window){
    $.throttle = function(a,b){
        var ctx = this;
        ctx.delay = 200;
        ctx.delay = (typeof a == 'function') ? ctx.delay : (typeof a == 'number') ? a : ctx.delay;
        ctx.cb = (typeof a == 'function') ? a : (typeof b == 'function') ? b : function(){};
        if($.throttle.timeout !== false)
            clearTimeout($.throttle.timeout);
        $.throttle.timeout = setTimeout(function(){ 
            $.throttle.timeout = false;
            ctx.cb();
        }, ctx.delay);    
    };
    $.throttle.timeout = false;    
})(jQuery, window);

$.mustache = (function() {
    var cache = {};
    return {
      load: function(template, callback, partials) {
        if(partials) {
          for(key in partials) {
            $.mustache.load(partials[key], function(data) {
              partials[key] = data;
            });
          }
        }

        if(cache[template]) {
            callback(cache[template], partials);
        } else {
          $.ajax({
            url: template,
            async: false,
          }).done(function(data) {
            cache[template] = data;
            callback(data, partials);
          });
      }
      }
    }
})();

var helpers = (function() {
  return {
    randomDate: function(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    },
    padNumber: function(number, pad) {
      number = number.toString();
      while(number.length < pad) {
        number = '0'+number;
      }
      return number;
    },
    htmlSafe: function(s) {
        return s.replace(/"/g, "&quot;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
    },
    htmlWithFadingImgs: function(html) {
      var $html = $(html);
      $html.find('img').css('opacity', 0).bind('load', function() { $(this).css('opacity', 1); });

      return $html;
    },
    jsonItemCount: function(jsonObj)
    {
      var count = 0;
      for(var key in jsonObj)
        if(jsonObj.hasOwnProperty(key))
          count++;

      return count;
    },
    renderMustache: function() {

      return function(template, render) {
          $.mustache.load(template, function(data) {
             return Mustache.render(data);
          });
      }

    }

  }
})();