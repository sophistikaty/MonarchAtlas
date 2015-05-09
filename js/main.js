$(document).ready(function(){
	// console.log('loaded main.js');

	window.onload = function() { init() };

  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1W3L_kKds0ilf-BedTKCIWUH6dFWBED1rta4dcqbY-LY/pubhtml?gid=0&single=true';

  function init() {
  	console.log('trying tabletop init');
    Tabletop.init( { key: public_spreadsheet_url,
                     callback: showInfo,
                     simpleSheet: true } )
  }

  var tabletopData;

  function showInfo(data, tabletop) {
  	console.log('showInfo fired with args', data, tabletop);
    tabletopData = data;
      console.log(tabletopData);
      selectContent();
  }

  // document.getElementById('myTestButton').onclick = function () {
tabletopData = JSON.stringify(tabletopData);

//select div by id
//   var selector = document.getElementById('insertData');

//   //insert data into div
// selector.innerHTML = tabletopData;
//   }

  
//varible to hold data
function selectContent () {
	console.log('selectContent fired');
var pageContent = tabletopData.map(function (item) { 
  return item["Page"]; 
}).map(function (content) { 
  return "<div>" + content + "</div>" 
}).join('');
document.getElementById('insert').innerHTML = pageContent;
}
//for loop through array

  //select key name
  //put key and value in variable
  //wrap each value in a DIV tag
  //add a class to each div



//innerHTML the variable

//this is a test

	  // console.log(process.argv);

	//   var myArray = process.argv;
	//   var sum = 0;

	// console.log('length is ', myArray.length);
	// var length = myArray.length;

	// for (i = 2; i <= length; i++){
		

	// 	var x = Number(myArray[i]);
	// 	sum += x;
	// 	console.log('Sum is ', sum);
	// 	console.log('i is ', i);

		// if (i = length) {

		// 	console.log(sum);
		// }
		
		
	// };



	  // Number('numbers are ',myArray[2]);

});