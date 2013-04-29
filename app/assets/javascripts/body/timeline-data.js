//Item class
function Item (itemid, text){
	this.id = itemid;
	this.name ="Item "+itemid;
	this.expectedResponse ='+'; //response types: +,-,^,=
	this.stimulusArray= new Array();
	//if!="" then is message item
	this.text=text;
}
//stimulus class
function Stimulus(text, type){
	this.text = text;
	this.duration=1;
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

/**
 *  Called when the Visualization API is loaded.
 */
function drawVisualization() {
    
    //insert the first item to the array
	itemArray[0]= new Item("0", "");
    
	// Create and populate a data table.
	data = new google.visualization.DataTable();
	data.addColumn('datetime', 'start');
	data.addColumn('datetime', 'end');
	data.addColumn('string', 'content');

	var t = new Date(2010, 7, 23, 16, 30, 15);
	var te = new Date(2010, 7, 23, 16, 30, 16); 

    data.addRows([
      [new Date(t.getTime()+0), new Date(t.getTime()+1), itemArray[0].name],
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

/**
 * function to add a new item
 */
function newItem(){   
	//add the item to the array of items
	itemArray[numberOfItems]= new Item(numberOfItems, "");
	//add the item to the timeline
	var lastItem = timeline.getItem(numberOfItems-1);
	
	if(lastItem.end!=null){
		//the previous item is a normal item
		var start = new Date (lastItem.end.getTime());
		var end = new Date (lastItem.end.getTime());
		start.setMilliseconds(start.getMilliseconds());
		end.setMilliseconds(end.getMilliseconds()+1);
	}
	else{
		//the previous item is a message item
		var start = new Date (lastItem.start.getTime());
		var end = new Date (lastItem.start.getTime());
		start.setMilliseconds(start.getMilliseconds()+1);
		end.setMilliseconds(end.getMilliseconds()+2);
	}

	timeline.addItem({
		'start' : start,
		'content' : itemArray[numberOfItems].name,
		'end' : end
	}); 
	numberOfItems = numberOfItems + 1;
}

/**
 * function to add a new message item
 */
function newMessageItem(){
	//add the item to the array of items
	itemArray[numberOfItems]= new Item(0, "Message");
	//add the item to the timeline
	var lastItem = timeline.getItem(numberOfItems-1);
	if(lastItem.end!=null){
		var start = new Date (lastItem.end.getTime());
		start.setMilliseconds(start.getMilliseconds()+1);
	}
	else{
		var start = new Date (lastItem.start.getTime());
		start.setMilliseconds(start.getMilliseconds()+1);
	}
	
	

	timeline.addItem({
		'start' : start,
		'content' : itemArray[numberOfItems].name
	}); 
	numberOfItems = numberOfItems + 1;
}

/**
 * function called when an item is seleted
 */
function onselect(){
	var selection= timeline.getSelection();
	showStimulusData(null);
	
	//obtain the fields
	var itemSaveButton = document.getElementById("item-save-button");
	var outputNameField = document.getElementById("item-name-field");
	var outputIdField = document.getElementById("item-id-field");
	var outputExpectedField = document.getElementById("expected-response-field");
	var stimulusNumberP = document.getElementById("stimulus-number-p");
	var outputStimulusList = document.getElementById("stimulus-order-list");
	
	if(selection==""){
		//no item selected
		itemNumber=-1;
		
		//set the fields
		itemSaveButton.setAttribute('disabled');
		outputNameField.innerHTML = "No item selected";
		outputIdField.innerHTML = "-";
		outputExpectedField.value="+";
		stimulusNumberP.innerHTML ="<p id='stimulus-number-p'>Added stimulus number: -</p>";
		outputStimulusList.innerHTML="";
	}else{
		//item selected
		itemNumber=selection[0].row;
		var selItem=itemArray[itemNumber];
		if(selItem.text!=""){
			//message field
			itemSaveButton.removeAttribute("disabled");
			outputNameField.innerHTML = selItem.name;
			outputIdField.innerHTML = "<input id='id-input' type='text' size='10' value='"+selItem.id+"'>";
			outputExpectedField.value='^';
			stimulusNumberP.innerHTML ="<p id='stimulus-number-p'>Text: <input id='message-input' type='text' size='50' value='"+selItem.text+"'></p>";
			outputStimulusList.innerHTML="";
		}else{
			//normal field
			itemSaveButton.removeAttribute("disabled");
			outputNameField.innerHTML = selItem.name;
			outputIdField.innerHTML = "<input id='id-input' type='text' size='10' value='"+selItem.id+"'>";
			outputExpectedField.value=selItem.expectedResponse;
			stimulusListGeneration();	
		}
		
	}
}

/**
 * Function to generate the list of stimulus in the item pannel
 */
function stimulusListGeneration(){
	//the number of items
	var stimulusNumberP = document.getElementById("stimulus-number-p");
	stimulusNumberP.innerHTML ="<p id='stimulus-number-p'>Added stimulus number: "+itemArray[itemNumber].stimulusArray.length+"</p>";
	//the list
	var outputStimulusList = document.getElementById("stimulus-order-list");
	var stimulusArray = itemArray[itemNumber].stimulusArray;
	var content="";
	for(i=0, ii=stimulusArray.length;i<ii;i++){
		content=content+"<li onmouseover='stimulusListOnMouseOver(this);' onmouseout='stimulusListOnMouseOut(this);' onclick='selectStimulus(this);'>"+stimulusArray[i].text+" ,"+stimulusArray[i].type+"</li>";
	}
	outputStimulusList.innerHTML=content;
}
/**
 * The function called when clicked the save button of the item pannel
 */
function saveItem(){
	//validate there is an item selected
	if(itemNumber>=0){
		var id = document.getElementById("id-input").value;
		var message = document.getElementById("message-input");
		if(message!=null){
			//message item
			itemArray[itemNumber].id =id;
			itemArray[itemNumber].text =message.value;
		}else
		{
			//normal item
			var expectedResponse = document.getElementById("expected-response-field").value;
			itemArray[itemNumber].id =id;
			itemArray[itemNumber].expectedResponse =expectedResponse;
		}
	}
}

//StimulusList interaction methods:
function stimulusListOnMouseOver(ev){
	ev.className="stimulus-order-list-over";
}

function stimulusListOnMouseOut(ev){
	ev.className=ev.className.replace("stimulus-order-list-over","");
}

/**
 * This function is called when one of the rows of the stimulus list
 * in the item pannel is selected
 */
function selectStimulus(ev){
	//search for the selected stimulus and unselect it
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
	
	var stimulusToShow = itemArray[itemNumber].stimulusArray[selectedStimulus];
	
	//stimulus pannel edition
	showStimulusData(stimulusToShow);
}

/**
 * shows the data of an stimulus in the stimulus pannel
 */
function showStimulusData(stimulus){
	var stimulusTextField = document.getElementById("stimulus-text-field");
	var stimulusTypeField = document.getElementById("stimulus-type-field");
	var stimulusSaveButton = document.getElementById("stimulus-save-button");
	var stimulusPannelHeader = document.getElementById("stimulus-pannel-header");
	var stimulusDurationField = document.getElementById("stimulus-duration-field");
	
	
	if(stimulus==null){
		//empty
		stimulusTextField.value="-";
		stimulusTextField.setAttribute('disabled');
		stimulusTypeField.value="text";
		stimulusSaveButton.setAttribute('disabled');
		stimulusPannelHeader.innerHTML="No stimulus selected";
		stimulusDurationField.setAttribute('disabled');
		stimulusDurationField.value="";
		selectedStimulus=-1;
		
	}else{
		//no empty
		stimulusTextField.removeAttribute("disabled");
		stimulusTextField.value=stimulus.text;
		stimulusTypeField.value=stimulus.type;
		stimulusSaveButton.removeAttribute("disabled");
		stimulusPannelHeader.innerHTML="Stimulus X";
		stimulusDurationField.removeAttribute("disabled");
		stimulusDurationField.value=stimulus.duration;
	}
	
}

/**
 * This function is called when pressed the save button of the item pannel
 */
function saveStimulus(){
	//obtain the stimulus
	var stimulus=itemArray[itemNumber].stimulusArray[selectedStimulus]
	//alert("Item Number: "+itemNumber+" Stimulus Number: "+selectedStimulus);
	//obtain data
	var stimulusTextField = document.getElementById("stimulus-text-field");
	var stimulusTypeField = document.getElementById("stimulus-type-field");
	var stimulusDurationField = document.getElementById("stimulus-duration-field");
	var previousDuration=stimulus.duration;
	stimulus.text=stimulusTextField.value;
	stimulus.type=stimulusTypeField.value;
	stimulus.duration=stimulusDurationField.value;
	
	//reload the stimulus list of the item pannel and remark the selected one
	stimulusListGeneration();
	var listItems = document.getElementById("stimulus-order-list").children;
	var selected=listItems[selectedStimulus];
	selectStimulus(selected);
	
	if(previousDuration!=stimulus.duration){
		//reorganize the timeline
		organizeTimeLine();
	}
	
}

/**
 * reorganize the timeline function of the duration of the stimulus of each item.
 */
function organizeTimeLine(){
	
	var start = new Date(timeline.getItem(0).start.getTime());
	var end = new Date (timeline.options.min.getTime());
	
	
	var lastItem = timeline.getItem(numberOfItems-1);
	for(var i=0, ii=itemArray.length;i<ii;i++){
		var timeLineItem = timeline.getItem(i);
		var totalTime=0;
		if(timeLineItem.end!=null){
			
			var stimulusArray=itemArray[i].stimulusArray;
			for(j=0, jj=stimulusArray.length;j<jj;j++){
				totalTime=totalTime+parseInt(stimulusArray[j].duration);
			}
			if(totalTime<1){
				end.setMilliseconds(end.getMilliseconds()+1);
			}else{
				end.setMilliseconds(end.getMilliseconds()+totalTime);
			}
			timeline.changeItem(i,{
			'start' : start,
			'content' : timeLineItem.content,
			'end' : end
			})
			//alert(timeLineItem.end.getMilliseconds());
			start = new Date (end.getTime());
			end = new Date (start.getTime());
			timeline.setSelection([{row: i}]);
		}else{
			start.setMilliseconds(end.getMilliseconds()+1);
			timeline.changeItem(i,{
			'start' : start,
			'content' : timeLineItem.content
			})
			start = new Date (start.getTime());
			start.setMilliseconds(start.getMilliseconds()+1);
			end = new Date (start.getTime());
			timeline.setSelection([{row: i}]);
		}
		
	}
	timeline.setSelection([{row:itemNumber}]);
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
		if(itemArray[itemNumber].text==""){
			//the dropped object is a stimulus icon
			if(ev.dataTransfer.getData("class")=="stimulus-type-icon"){
				//add the new stimulus to the array of the item
				var stimulus
				itemArray[itemNumber].stimulusArray.push(new Stimulus("Stimulus", ev.dataTransfer.getData("type")));
				//stimulus list generation
				stimulusListGeneration();
				organizeTimeLine();
			}
		}else{
			alert("Can`t add a stimulus to a message item");
		}
			
	}else{
		alert("You must select an item first!");
	}
}
/**
 * Opens the preview Window
 */
function previewWindow(){
	open('preview','Preview','top=600,left=600,width=600,resizable=no,height=600,');
} 

/**
 * Send the information of the document to the server and receive the created document
 */
function saveDocument(){
	var jsonText = JSON.stringify(itemArray[0]);
	$.ajax({
    url: 'save',
    type: 'POST',
    data: jsonText,
    dataType: 'html',
    async: false,
    success: function(msg) {
        alert(msg);
    },
    error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }
	});
}
	

