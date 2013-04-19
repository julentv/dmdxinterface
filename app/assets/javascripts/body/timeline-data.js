//Item class
function Item (itemid){
	this.id = itemid;
	this.name ="Item "+itemid;
	this.expectedResponse ='+';
	this.stimulusArray= new Array();
}
//stimulus class
function Stimulus(text, type){
	this.text = text;
	this.type =type; //text, bmp, jpg, wav
	this.topPossition;
	this.leftPossition;
	this.channel;
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
var itemNumber=-1;

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
		itemNumber=-1;
		//set the fields
		
		var itemSaveButton = document.getElementById("item-save-button");
		itemSaveButton.setAttribute('disabled');
		var outputNameField = document.getElementById("item-name-field");
		var outputIdField = document.getElementById("item-id-field");
		var outputExpectedField = document.getElementById("expected-response-field");
		var outputStimulusNumberField = document.getElementById("item-stimulus-number-field");
		var outputStimulusList = document.getElementById("stimulus-order-list");
		outputNameField.innerHTML = "No item selected";
		outputIdField.innerHTML = "-";
		outputExpectedField.value="+";
		outputStimulusNumberField.innerHTML ="-";
		outputStimulusList.innerHTML="";
	}else{
		//item selected
		itemNumber=selection[0].row;
		
		//set the fields
		var itemSaveButton = document.getElementById("item-save-button");
		itemSaveButton.removeAttribute("disabled");
		var outputNameField = document.getElementById("item-name-field");
		var outputIdField = document.getElementById("item-id-field");
		var outputExpectedField = document.getElementById("expected-response-field");
		
		
		outputNameField.innerHTML = itemArray[itemNumber].name;
		outputIdField.innerHTML = "<input id='id-input' type='text' size='10' value='"+itemArray[itemNumber].id+"'>";
		outputExpectedField.value=itemArray[itemNumber].expectedResponse;
		
		stimulusListGeneration();
	}
}
/*
 * Function to generate the list of stimulus in the item pannel
 */
function stimulusListGeneration(){
	//the number of items
	var outputStimulusNumberField = document.getElementById("item-stimulus-number-field");
	outputStimulusNumberField.innerHTML = itemArray[itemNumber].stimulusArray.length;
	//the list
	var outputStimulusList = document.getElementById("stimulus-order-list");
	var stimulusArray = itemArray[itemNumber].stimulusArray;
	var content="";
	for(i=0, ii=stimulusArray.length;i<ii;i++){
		content=content+"<li>"+stimulusArray[i].text+" ,"+stimulusArray[i].type+"</li>";
	}
	outputStimulusList.innerHTML=content;
}

function saveItem(){
	//validate there is an item selected
	if(itemNumber>=0){
		
		var id = document.getElementById("id-input").value;
		var expectedResponse = document.getElementById("expected-response-field").value;
		itemArray[itemNumber].id =id;
		itemArray[itemNumber].expectedResponse =expectedResponse;
		
	}
	
	
}
function showStimulusData(){
	
}


//drag an drop methods of the stimulus addition
function dragStimulus(ev){
	ev.dataTransfer.setData("class",ev.target.className);
	if(ev.target.id == "icon-text"){
		ev.dataTransfer.setData("type","text");
	}else if(ev.target.id == "icon-bmp"){
		ev.dataTransfer.setData("type", "bmp");
	}else if(ev.target.id== "icon-jpg"){
		ev.dataTransfer.setData("type","jpg");
	}else if(ev.target.id== "icon-wav"){
		ev.dataTransfer.setData("type", "wav");
	}
	
}
function allowDrop(ev)
{
    ev.preventDefault();
}
function addStimulus(ev){
	//an item must be selected
	if(itemNumber>=0){
		
		//the dropped object is a stimulus icon
		if(ev.dataTransfer.getData("class")=="stimulus-type-icon"){
			//add the new stimulus to the array of the item
			var stimulus
			itemArray[itemNumber].stimulusArray.push(new Stimulus("Stimulus", ev.dataTransfer.getData("type")));
			//stimulus list generation
			stimulusListGeneration();
		}	
	}else{
		alert("You must select an item first!");
	}
	
	
	
}
