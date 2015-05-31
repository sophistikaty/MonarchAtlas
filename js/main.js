$(document).ready(function(){

	// article-card hover-action

	$("article").hover(function (){
		console.log(this);
		// article = this;
		$(this).toggleClass("active");
		console.log('toggling active');
	});

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
	console.log('index is ', index);
	var pagePath = tabletopData[index].Path;
	var bodyId = document.body.id;
	console.log(bodyId);
	
		if( bodyId === pagePath) {
			console.log('page path '+pagePath+' matches page id '+bodyId);
			$('.title').html(tabletopData[index].Page);
			document.getElementById('subtitle').innerHTML = tabletopData[index].Subtitle;
			document.getElementById('content').innerHTML = tabletopData[index].Content;
			console.log(tabletopData[index].Page);
		} 
	
};

}

});