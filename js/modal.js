// Create an immediately invoked functional expression to wrap our code
	(function() {

	  // Define our constructor 
	  this.Modal = function() {

	    // Create global element references
	    this.closeButton = null;
	    this.modal = null;
	    this.overlay = null;
	    // this.finished = modalBuilt();

	    // Determine proper prefix
	    this.transitionEnd = transitionSelect();

	    // Define option defaults 
	    var defaults = {
	      autoOpen: false,
	      className: 'fade-and-drop',
	      closeButton: true,
	      content: "",
	      overlay: true
	    }

	    // Create options by extending defaults with the passed in arugments
	    if (arguments[0] && typeof arguments[0] === "object") {
	      this.options = extendDefaults(defaults, arguments[0]);
	    }

	    if(this.options.autoOpen === true) this.open();

	  }

	  // Public Methods

	  Modal.prototype.close = function() {
	    var _ = this;
	    this.modal.className = this.modal.className.replace(" scotch-open", "");
	    this.overlay.className = this.overlay.className.replace(" scotch-open",
	      "");
	    this.modal.addEventListener(this.transitionEnd, function() {
	      _.modal.parentNode.removeChild(_.modal);
	    });
	    this.overlay.addEventListener(this.transitionEnd, function() {
	      if(_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
	    });
	  }

	  Modal.prototype.open = function() {
	  		console.log('this on modal open is ', this);
	    buildOut.call(this);
	    initializeEvents.call(this);
	    window.getComputedStyle(this.modal).height;
	    this.modal.className = this.modal.className +
	      (this.modal.offsetHeight > window.innerHeight ?
	        " scotch-open scotch-anchored" : " scotch-open");
	    this.overlay.className = this.overlay.className + " scotch-open";
	  }

	  // Private Methods

	  function buildOut() {

	    var content, contentHolder, docFrag;

	    /*
	     * If content is an HTML string, append the HTML string.
	     * If content is a domNode, append its content.
	     */

	    if (typeof this.options.content === "string") {
	      content = this.options.content;
	    } else {
	      content = this.options.content.innerHTML;
	    }

	    // Create a DocumentFragment to build with
	    docFrag = document.createDocumentFragment();

	    // Create modal element
	    this.modal = document.createElement("div");
	    this.modal.className = "scotch-modal " + this.options.className;
	    this.modal.style.minWidth = this.options.minWidth + "px";
	    this.modal.style.maxWidth = this.options.maxWidth + "%";

	    // If closeButton option is true, add a close button
	    if (this.options.closeButton === true) {
	      this.closeButton = document.createElement("button");
	      this.closeButton.className = "scotch-close close-button";
	      this.closeButton.innerHTML = "&times;";
	      this.modal.appendChild(this.closeButton);
	    }

	    // If overlay is true, add one
	    if (this.options.overlay === true) {
	      this.overlay = document.createElement("div");
	      this.overlay.className = "scotch-overlay " + this.options.className;
	      docFrag.appendChild(this.overlay);
	    }

	    // Create content area and append to modal
	    contentHolder = document.createElement("div");
	    contentHolder.id = "modal-content";
	    contentHolder.className = "scotch-content";
	    contentHolder.innerHTML = content;
	    this.modal.appendChild(contentHolder);

	    // Append modal to DocumentFragment
	    docFrag.appendChild(this.modal);

	    // Append DocumentFragment to body
	    document.body.appendChild(docFrag);

	    var galleryDiv = document.getElementsByClassName('gallery');
	    // console.log('targeting galleryDiv on modal) build', galleryDiv);
	    // console.log('targeting gallery array and alt text', this.options.gallery, this.options.altText);

	    var galleryArr = this.options.gallery;
	    for (i=0; i< galleryArr.length; i++){
	    	// var sliderHtml = '<img src="assets/'+galleryArr[i]+'" '+this.options.altText+'">';

	    	sliderPic = document.createElement("img");
	    	sliderPic.className = "cardSlider";
	    	sliderPic.src = 'assets/'+galleryArr[i];
	    	sliderPic.alt = this.options.altText;

	    		console.log('appending sliderPic to galleryDiv ', sliderPic, galleryDiv[0]);
	    	galleryDiv[0].appendChild(sliderPic);
	    	
	    	
	    }

	    var cardSlider = galleryDiv[0]
	    			console.log('cardSlider is ', cardSlider);

				$('.gallery').slick({
					infinite: true,
					centerMode: true,
  					variableWidth: true,
				  // slidesToShow: 1,
				  slidesToScroll: 1,
				  autoplay: true,
				  autoplaySpeed: 4000,
				  respondTo: cardSlider.firstChild,
				  prevArrow: "<div class='icon-left-open-big slick-prev'></div>",
				  nextArrow: "<div class='icon-right-open-big slick-next'></div>"
			    
			});


	  }

	  function extendDefaults(source, properties) {
	    var property;
	    for (property in properties) {
	      if (properties.hasOwnProperty(property)) {
	        source[property] = properties[property];
	      }
	    }
	    return source;
	  }

	  function initializeEvents() {

	    if (this.closeButton) {
	      this.closeButton.addEventListener('click', this.close.bind(this));
	    }

	    if (this.overlay) {
	      this.overlay.addEventListener('click', this.close.bind(this));
	    }

	  }

	  function transitionSelect() {
	    var el = document.createElement("div");
	    if (el.style.WebkitTransition) return "webkitTransitionEnd";
	    if (el.style.OTransition) return "oTransitionEnd";
	    return 'transitionend';
	  }

	}());
	
