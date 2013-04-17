//Item class
function Item (itemid){
	this.id = itemid;
	this.name ="Item "+itemid;
	this.expectedResponse ='+';
	this.stimulusArray= new Array();
}



//start of the timeline methods
google.load("visualization", "1");

// Set callback to run when API is loaded
google.setOnLoadCallback(drawVisualization);

//global variables
var timeline;
var data;
var numberOfItems=1;
var itemArray = new Array ();

// Called when the Visualization API is loaded.
function drawVisualization() {
    
    //insert the first item to the array
	itemArray[0]= new Item("0");
    
	// Create and populate a data table.
	data = new google.visualization.DataTable();
	data.addColumn('datetime', 'start');
	data.addColumn('datetime', 'end');
	data.addColumn('string', 'content');

	var t = new Date(2010, 7, 23, 16, 30, 15);
	var te = new Date(2010, 7, 23, 16, 30, 16); 

    data.addRows([
      [new Date(t.getTime()+0), new Date(t.getTime()+5), itemArray[0].name],
    ]);

           
	// specify options
	var options = {
		width : "100%",
		height : "300px",
		editable : false,
		style : "box",
		intervalMax : 100,
		min : t,
		max : te
	};

	// Instantiate our timeline object.
	timeline = new links.Timeline(document.getElementById('mytimeline'));

	// Draw our timeline with the created data and options
	timeline.draw(data, options);
	
google.visualization.events.addListener(timeline, 'select', onselect);
	
}

//function to add a new item
function newItem(){   
	//add the item to the array of items
	itemArray[numberOfItems]= new Item(numberOfItems);
	//add the item to the timeline
	var lastItem = timeline.getItem(numberOfItems-1);
	var start = new Date (lastItem.end.getTime());
	var end = new Date (lastItem.end.getTime());
	start.setMilliseconds(start.getMilliseconds());
	end.setMilliseconds(end.getMilliseconds()+2);

	timeline.addItem({
		'start' : start,
		'content' : itemArray[numberOfItems].name,
		'end' : end
	}); 
	numberOfItems = numberOfItems + 1;
}

//function called when an item is seleted
function onselect(){
	var selection= timeline.getSelection();
	if(selection==""){
		//no item selected
		//set the fields
		var outputNameField = document.getElementById("item-name-field");
		var outputIdField = document.getElementById("item-id-field");
		var outputExpectedField = document.getElementById("expected-response-field");
		var outputStimulusNumberField = document.getElementById("item-stimulus-number-field");
		outputNameField.innerHTML = "No item selected";
		outputIdField.innerHTML = "-";
		outputExpectedField.value="+";
		outputStimulusNumberField.innerHTML ="-";
	}else{
		//item selected
		var itemNumber=selection[0].row;
		
		//set the fields
		var outputNameField = document.getElementById("item-name-field");
		var outputIdField = document.getElementById("item-id-field");
		var outputExpectedField = document.getElementById("expected-response-field");
		var outputStimulusNumberField = document.getElementById("item-stimulus-number-field");
		
		outputNameField.innerHTML = itemArray[itemNumber].name;
		outputIdField.innerHTML = itemArray[itemNumber].id
		outputExpectedField.value=itemArray[itemNumber].expectedResponse;
		outputStimulusNumberField.innerHTML = itemArray[itemNumber].stimulusArray.length;
	}
}