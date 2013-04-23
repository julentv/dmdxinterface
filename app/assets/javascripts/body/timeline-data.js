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
	this.channel=0;
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
var selectedStimulus=-1;

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
	showStimulusData(null);
	
	//obtain the fields
	var itemSaveButton = document.getElementById("item-save-button");
		var outputNameField = document.getElementById("item-name-field");
		var outputIdField = document.getElementById("item-id-field");
		var outputExpectedField = document.getElementById("expected-response-field");
	
	if(selection==""){
		//no item selected
		itemNumber=-1;
		
		//set the fields
		itemSaveButton.setAttribute('disabled');
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
		
		itemSaveButton.removeAttribute("disabled");
		
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
		content=content+"<li onmouseover='stimulusListOnMouseOver(this);' onmouseout='stimulusListOnMouseOut(this);' onclick='selectStimulus(this);'>"+stimulusArray[i].text+" ,"+stimulusArray[i].type+"</li>";
	}
	outputStimulusList.innerHTML=content;
}
/*
 * The function called when clicked the save button of the item pannel
 */
function saveItem(){
	//validate there is an item selected
	if(itemNumber>=0){
		var id = document.getElementById("id-input").value;
		var expectedResponse = document.getElementById("expected-response-field").value;
		itemArray[itemNumber].id =id;
		itemArray[itemNumber].expectedResponse =expectedResponse;
	}
}
/*
 * StimulusList interaction methods
 */
function stimulusListOnMouseOver(ev){
	ev.className="stimulus-order-list-over";
}
function stimulusListOnMouseOut(ev){
	ev.className=ev.className.replace("stimulus-order-list-over","");
}

function selectStimulus(ev){
	//search for the selected stimulus and unselect it
	//ev.attributes.getNamedItem("onmouseover").value
	//ev.attributes.getNamedItem("onmouseout").value
	var listItems = document.getElementById("stimulus-order-list").children;
	for(var i=0,ii=listItems.length;i<ii;i++){
		listItems[i].setAttribute("onmouseover","stimulusListOnMouseOver(this);");
		listItems[i].setAttribute("onmouseout","stimulusListOnMouseOut(this);");
		listItems[i].className="";
	}
	//highlight the selected one
	ev.className="stimulus-order-list-selected";
	ev.removeAttribute("onmouseover")
	ev.removeAttribute("onmouseout");
	
	//obtain the number of the list that has been selected
	selectedStimulus=-1;
	for(var i=0,ii=listItems.length;i<ii && selectedStimulus==-1 ;i++){
		if (listItems[i].attributes.getNamedItem("onmouseover")==null){
			selectedStimulus=i;
		}
	}
	
	var selectedStimulus = itemArray[itemNumber].stimulusArray[selectedStimulus];
	//stimulus pannel edition
	showStimulusData(selectedStimulus);
}

/*
 * shows the data of an stimulus in the stimulus pannel
 */
function showStimulusData(stimulus){
	var stimulusTextField = document.getElementById("stimulus-text-field");
	var stimulusTypeField = document.getElementById("stimulus-type-field");
	var stimulusSaveButton = document.getElementById("stimulus-save-button");
	var stimulusPannelHeader = document.getElementById("stimulus-pannel-header");
	
	
	if(stimulus==null){
		//empty
		stimulusTextField.innerHTML="-";
		stimulusTypeField.value="text";
		stimulusSaveButton.setAttribute('disabled');
		stimulusPannelHeader.innerHTML="No stimulus selected";
		
	}else{
		//no empty
		stimulusTextField.innerHTML=stimulus.text;
		stimulusTypeField.value=stimulus.type;
		stimulusSaveButton.removeAttribute("disabled");
		stimulusPannelHeader.innerHTML="Stimulus X";
		selectedStimulus=-1;
	}
	
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
function previewWindow(){
	open('preview','Preview','top=600,left=600,width=600,resizable=no,height=600,');
} 

	

