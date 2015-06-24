$(document).ready(function(){

	console.log('main js loaded, about to call slick on ', document.getElementById('carousel'));

	var slider = document.getElementById('carousel');
		previous = document.getElementsByClassName('icon-right-open-big');
		next = document.getElementsByClassName('icon-left-open-big');

	$('#carousel').slick({
      slidesToShow: 1,
	  autoplay: true,
	  autoplaySpeed: 2500,
	  respondTo: slider,
	  prevArrow: "<div class='icon-left-open-big slick-prev'></div>",
	  nextArrow: "<div class='icon-right-open-big slick-next'></div>",
	  fade: true,
  		cssEase: 'linear'
	 //  responsive: [
  //   {
  //     breakpoint: 1000,
  //     settings: {
  //       slidesToShow: 1,
  //       slidesToScroll: 1,
  //       infinite: true,
  //     }
  //   },
  //   {
  //     breakpoint: 100,
  //     settings: {
  //       slidesToShow: 1,
  //       slidesToScroll: 1
  //     }
  //   }
  //   // You can unslick at a given breakpoint now by adding:
  //   // settings: "unslick"
  //   // instead of a settings object
  // ]
  });

	var Card = function(image, subtitle, leadText, content, id){
						
						this.image = '<img src="'+image+'" alt ="'+subtitle+', '+leadText +
						' by Kristin Dinnis, Monarch Atlas" >';
						this.subtitle = '<h3>'+subtitle+'</h3>';
						this.leadText = '<p>'+leadText+'</p>';
						this.shell = this.image+this.subtitle+this.leadText; 
						this.modalContent = '<h2>'+subtitle+'</h2><br><img src="'+image+'"alt ="'+subtitle+', '+leadText+
						' by Kristin Dinnis, Monarch Atlas"><br><p>'+content+'</p>';
					};

	

	// var active = function (){
	// 	this.toggleClass("active");
	// 	console.log('toggling active');
	// }


	// Tabletop Spreadsheet Functions

	window.onload = function() { init() };

  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1W3L_kKds0ilf-BedTKCIWUH6dFWBED1rta4dcqbY-LY/pubhtml?gid=0&single=true';

  function init() {
  	
    Tabletop.init( { key: public_spreadsheet_url,
                     callback: showInfo,
                     simpleSheet: true } )
  }

  var tabletopData;

  function showInfo(data, tabletop) {
  	
    tabletopData = data;

      selectContent();
  }

tabletopData = JSON.stringify(tabletopData);

function selectContent () {

var pageName = tabletopData.map(function (item) { 
  return item["Page"]; 
}).map(function (content, item) { 
	var index = tabletopData[item];
	checkPage(item);
  return "<li id='p"+item+"'><a href='http://sophistikaty.github.io/MonarchAtlas/"
  +tabletopData[item].Path+".html'>" + tabletopData[item].Page +"</a></li>" 
  
}).join('');
document.getElementById('insert').innerHTML = pageName;

function checkPage(index){
	// console.log('index is ', index);
	var pagePath = tabletopData[index].Path;
	var bodyId = document.body.id;
	// console.log(bodyId);
	
		if( bodyId === pagePath) {
			// console.log('page path '+pagePath+' matches page id '+bodyId);
			$('.title').html(tabletopData[index].Page);
			// document.getElementById('subtitle').innerHTML = tabletopData[index].Subtitle;
			document.getElementById('content').innerHTML = tabletopData[index].Content;
			// console.log('page data is ',tabletopData[index].Page);

			if (tabletopData[index].cardIndex != "x"){

				var tableTopIndex = parseInt(tabletopData[index].cardIndex);
					// console.log('index type ',typeof tableTopIndex);

					if( typeof tableTopIndex != NaN){
						// console.log('passing index is ',tableTopIndex);
						pic = tabletopData[index].picture;
						subtitle = tabletopData[index].Subtitle;
						leadText = tabletopData[index].leadText;
						content = tabletopData[index].Content;

						card = new Card(pic, subtitle, leadText, content, tableTopIndex);
						// console.log('creating card ',card);

						cardSection = document.getElementById('cards');
						article = document.createElement('article');
						article.id = 'card'+tableTopIndex;
						article.classList.add('trigger');
						article.innerHTML = card.shell;
						cardSection.appendChild(article);
						// console.log('card section and shell ', cardSection, card.shell);

						var myContent = card.modalContent;

						var myModal = new Modal({
						  content: myContent,
						  className: 'zoom'
						});

						var trigger = document.getElementById('card'+tableTopIndex);
	
						// for (i=0; i<triggers.length; i++){
						 	// console.log('added click to ', trigger);
							
							trigger.addEventListener('click', function() {

							  myModal.open();
							});

						}

					}
					// $("#cards article").hover(function (){
					// 		// console.log(this);
					// 		// article = this;
					// 		$(this).toggleClass("active");
					// 		// console.log('toggling active');
					// 	});

					}

			}

			

			// function cardIndexIds() {
			// 	var cards = $('#cards article.trigger');
			// 	console.log('called cards with ', cards);

			// 	for (var i = 0 ; i < cards.length ; i++) {
					
					
					// = cards[i];
					// 	card.id = 'card'+i;
						
						// console.log ('leadText is ', leadText);

					// var cardContent = function(image, subtitle, leadText, content){
					// 	this.image = '<img src="'+image+'" alt ="'+subtitle+', '+leadText+
					// 	' by Kristin Dinnis, Monarch Atlas" >';
					// 	this.subtitle = '<h3>'+subtitle+'</h3>';
					// 	this.leadText = '<p>'+leadText+'</p>';
					// 	this.modalContent = '<h2>'+subtitle+'</h2><br><img src="'+image+'"alt ="'+subtitle+', '+leadText+
					// 	' by Kristin Dinnis, Monarch Atlas"><br><p>'+content+'</p>';
					// };
					// console.log('single card with index val is ', cards[i], i);
			// 		console.log('index and tabletop cardIndex are ', i, tableTopIndex);

			// 		if (i === tableTopIndex){

			// 			console.log ('card with content is ', card, subtitle, leadText );

			// }
			// 	}
			// }cardIndexIds();
			$("#cards article").hover(function (){
			// console.log(this);
			// article = this;
			$(this).toggleClass("active");
			// console.log('toggling active');
		});

			
		} 

		// $("#cards article").hover(function (){
		// 	// console.log(this);
		// 	// article = this;
		// 	$(this).toggleClass("active");
		// 	// console.log('toggling active');
		// });
	
});







