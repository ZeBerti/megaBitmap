const megamanPixels = "5b5w3s8w"
		+"8w3s2h1s7w"
		+"7w1s3b1s2h1s6w"
		+"6w1s5b4s5w"
		+"6w1s5b1s2h1b1s4w"

		+"5w1s1h6b2s1b1s4w"
		+"5w1s1h2b4x2b1x1s4w"
		+"5w1s1h1b3x2s1x1s1x1s4w"
		+"6w1s1b3x2s1x1s1x1s4w"
		+"5w2s1b8x1s4w"

		+"3w2s2h1s1b1x4s1x3s3w"
		+"2w1s1b4h1s5x1s2h1b1s2w"
		+"2w1s2b4h5s2h2b1s2w"
		+"1w1s3b1h1s7h1s1h3b1s1w"
		+"1w1s2b3s7h3s2b1s1w"

		+"1w1s3b2s7h2s3b1s1w"
		+"1w1s3b2s7b2s3b1s1w"
		+"2w5s7b5s2w"
		+"5w1s2h4b3h1s5w"
		+"4w1s2b3h1s4h1b1s4w"

		+"3w2s3b1h1s1w1s1h3b2s3w"
		+"1w2s5b1s3w1s5b2s1w"
		+"1s7b1s3w1s7b1s"
		+"1s7b1s3w1s7b1s"
		+"8s1s3w1s8s";
	

let cols = 21;
let rows = 25;
let renderDelay;



function render(command){

    calcResolution();
	tableCreate(cols, rows);

	// Play JSON TODO DELETEME
import data from './data.json' assert { type: 'JSON' };
console.log(data);
}

// Does not work for local files
async function printJSON() {
    const response = await fetch("http://www.espruino.com/json/ESP32.json");
    const json = await response.json();
    console.log(json);
}

function calcResolution () {
   cols = document.getElementById("pixels-wide").value;
   rows = calculateNumberOfPixels() / cols;
   console.log("Calculated rows: " + rows);
   tableCreate(cols, rows);
}

function paint() {
	
	let renderSpeed = parseInt(document.getElementById("render-delay").value);
	if(typeof renderSpeed=="number" && !isNaN(renderSpeed))
		renderDelay = renderSpeed;
	
	console.log(renderDelay);
	let megamanArr = getMegaman();
	let numberOfCells = getMegaman().length;

	  for (let j = 0; j < numberOfCells; j++) {
	
		setTimeout(function(){
		  let currentElem = document.getElementById("cellNr" + j);
		  if(currentElem == null){
			  console.error("Es gibt kein DOM element mit Id cellNr" + j);
		  } else {
			let farbElem = getColorBySymbol(megamanArr[j]);
			currentElem.classList.add(farbElem);			  
		  }

		
		}, j * renderDelay);	
	};	
}

function calculateNumberOfPixels () {

    let megaman = document.getElementById("textarea-code").value.trim();
    megaman = megaman.replaceAll(' ', '').replace(/[\n\r]/g, '').replace(/\t/g,'');

    let charCounter = 0;
	let currentRealNumber = '';

    for (var j = 0; j < megaman.length; j++) {

        let currentCharType = !isNaN(parseInt(megaman[j]))?typeof parseInt(megaman[j]):typeof megaman[j];
	    if(currentCharType == 'number'){
	        currentRealNumber = currentRealNumber + megaman[j];
	    } else {
	        if(currentRealNumber.length > 0) {
	            charCounter += parseInt(currentRealNumber);
	            currentRealNumber = '';
            }
	    }
	}
	return charCounter;
}

function deleteCellColors() {
	
	let megamanArr = getMegaman();
	let numberOfCells = getMegaman().length;

	  for (var j = 0; j < cols * rows; j++) {
		let no = j;
		let currentElem = document.getElementById("cellNr" + j);
		let farbElem = getColorBySymbol(megamanArr[no]);
		currentElem.classList="";
		//currentElem.classList.remove(farbElem);
	};	
}
	

function tableCreate(cols, rows) {
  let tableId = "megamanTableId"
  // clean table
  let oldTable = document.getElementById(tableId);
  if(oldTable!= null)
    oldTable.remove();

  //body reference
  var body = document.getElementsByTagName("body")[0];
  let tableContainer = document.getElementById("table-container");
  let megamanArr=getMegaman();
  let megamanCounter=0;

  // create elements <table> and a <tbody>
  var tbl = document.createElement("table");
  tbl.id = tableId;
  tbl.classList.add("crt");
  var tblBody = document.createElement("tbody");

  // cells creation
  for (var j = 0; j < rows; j++) {
    // table row creation
    var row = document.createElement("tr");

    for (var i = 0; i < cols; i++) {
      // create element <td> and text node 
      //Make text node the contents of <td> element
      // put <td> at end of the table row
      var cell = document.createElement("td");
	  cell.id="cellNr"+megamanCounter;
	  
      //var cellText = document.createTextNode(j + "  " + i);
	  
	  let textFromArr = ".";
	  if(megamanArr[megamanCounter]!=null)
		  textFromArr = megamanArr[megamanCounter];
	  megamanCounter++;
	 
	  	 
		let cellText = document.createTextNode(textFromArr);
	
		//cell.appendChild(cellText);
      row.appendChild(cell);
    }

    //row added to end of table body
    tblBody.appendChild(row);
  }

  // append the <tbody> inside the <table>
  tbl.appendChild(tblBody);
  // put <table> in the <body>
  tableContainer.appendChild(tbl);
  // tbl border attribute to 
  //tbl.setAttribute("border", "1");
}



function getColorBySymbol(symbol){
	let color = "";
	
	switch (symbol) {
		case "w":
			color = "white";
			break;
		case "s":
			color = "black";
			break;
		case "b":
			color = "blue";
			break;
		case "h":
			color = "lightblue";
			break;
		case "x":
			color = "skintone";
			break;
		default:
			color = "red";
	}
	
	return color;
}



function getMegaman () {

    let megaman = document.getElementById("textarea-code").value.trim();
    megaman = megaman.replaceAll(' ', '').replace(/[\n\r]/g, '').replace(/\t/g,'');

    let charCounter = 0;
	let currentRealNumber = '';
	let completeBitmap = "";

    for (var j = 0; j < megaman.length; j++) {

        let currentCharType = !isNaN(parseInt(megaman[j]))?typeof parseInt(megaman[j]):typeof megaman[j];
	    if(currentCharType == 'number'){
	        currentRealNumber = currentRealNumber + megaman[j];
	    } else {
	        if(currentRealNumber.length > 0) {
	            charCounter += parseInt(currentRealNumber);
	            for(let i = 0; i < charCounter; i++)
	                completeBitmap += megaman[j];
	            currentRealNumber = '';
	            charCounter = 0;
            } else {
                console.error("Syntax not correct at Pos " + j + ": [0-9]+[a-zA-Z][0-9]+[a-zA-Z]...");
            }
	    }
	}
	return completeBitmap;
}



function getMegaman_DEPRICATED(){

	var megamanArr = [];
	var megaman = document.getElementById("textarea-code").value.trim();
	megaman = megaman.replaceAll(' ', '').replace(/[\n\r]/g, '').replace(/\t/g,'');

	for(var i = 0; i < megaman.length; i++){
		var currentCharNumber = megaman.charAt(i*2);
		var currentChar = megaman.charAt(i*2+1);
		for(var charLoop = 0; charLoop < currentCharNumber; charLoop++){
			megamanArr.push(currentChar);
		}
	}

	return megamanArr;	
}
