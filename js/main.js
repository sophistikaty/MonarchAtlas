


  // console.log(process.argv);

  var myArray = process.argv;
  var sum = 0;

console.log('length is ', myArray.length);
var length = myArray.length;

for (i = 2; i <= length; i++){
	

	var x = Number(myArray[i]);
	sum += x;
	console.log('Sum is ', sum);
	console.log('i is ', i);

	// if (i = length) {

	// 	console.log(sum);
	// }
	
	
};



  // Number('numbers are ',myArray[2]);

