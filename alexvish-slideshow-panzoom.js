
if (document.registerElement) {
  var createImageElement = function(imageSrc) {
    var image = document.createElement('img');
    image.setAttribute('source', imageSrc.trim());
    image.setAttribute('scaling','cover');
    return image;
  };

  var createImages = function(imgsAttribute) {
    var images = [];
    if (!imgsAttribute) {
      return images;
    }
    imgsAttribute = imgsAttribute.split(',');
    for (var i = 0; i < imgsAttribute.length; i++) {
      /\S/.test(imgsAttribute[i]) && images.push(createImageElement(imgsAttribute[i]));
    }
    return images;
  };

  var proto = Object.create(HTMLElement.prototype, {
    attachedCallback: {
      value: function() {
        var images = createImages(this.getAttribute("imgs"));
        for(;this.firstChild;) {
          this.removeChild(this.firstChild);
        }
        
        //var w = window.document.documentElement.clientWidth;
        //var h = window.document.documentElement.clientHeight;
        //this.style.width=w  + 'px';
        //this.style.height=h  + 'px';
        var emptyImage = "data:image/gif;base64,R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="

        for(var i = 0; i < images.length; i++) {
          var source = images[i].getAttribute("source");
          var srcAttr = images[i].getAttribute('src');
          images[i].style.backgroundImage =  'url(' + JSON.stringify(source) + ')';	
          images[i].style.backgroundRepeat= 'no-repeat';
          images[i].style.backgroundPosition = 'center';
          images[i].style.backgroundSize = 'cover';
          //images[i].style.width = w  + 'px';
          //images[i].style.height = h  + 'px';
          //images[i].style["margin-left"] = -w/2  + 'px';
          //images[i].style["margin-top"] = -h/2  + 'px';
          srcAttr != emptyImage && images[i].setAttribute('src', emptyImage);
        }


        this.images = images;
        
        for (var i = 0; i < images.length; i++) {
        	this.appendChild(images[i]);
        }

        window.setInterval(kenBurns, 16000);
        var numberOfImages  = images.length,
        i = 1;  

        function kenBurns() {
          if(i==numberOfImages){ i = 0;}
            images[i].className = "fx";

          if(i===0){ images[numberOfImages-2].className = "";}
          if(i===1){ images[numberOfImages-1].className = "";}
          if(i>1){ images[i-2].className = "";}
            i++;
        }

        window.requestAnimationFrame(function() {
        	images[0].className = "fx";	
        });
        var this0 = this;
        this.resizeSensor = new ResizeSensor(this,function() {
        	this0.sizeChanged();
        });
        
      },
      enumerable: true
    },

    sizeChanged: {
    	value: function() {
            var w = this.clientWidth;
            var h = this.clientHeight;
            for(var i = 0; i < this.images.length; i++) {
              this.images[i].style.width = w  + 'px';
              this.images[i].style.height = h  + 'px';
              this.images[i].style["margin-left"] = -w/2  + 'px';
              this.images[i].style["margin-top"] = -h/2  + 'px';
            }
        }
    } 
  });

  document.registerElement('alexvish-slideshow-panzoom',{prototype: proto});
}