//Item class
function Item (itemid, text){
	this.id = itemid;
	this.name ="Item "+itemid;
	this.expectedResponse ='+'; //response types: +,-,^,=
	this.stimulusArray= new Array();
	//if!="" then is message item
	this.text=text;
	this.startTimerBeforeStimulus=0;
	this.noRandomise=false;
	
	//creates a duplicate of the item
	this.duplicate = function(){
		var duplicatedItem= new Item(this.id, this.text);
		duplicatedItem.expectedResponse=this.expectedResponse;
		duplicatedItem.text=this.text;
		duplicatedItem.startTimerBeforeStimulus=this.startTimerBeforeStimulus;
		duplicatedItem.noRandomise=this.noRandomise;
		arrayOfStimulus=new Array();
		
		//duplicate stimulus
		for(var i =0,ii=this.stimulusArray.length;i<ii;i++){
			arrayOfStimulus.push(this.stimulusArray[i].duplicate());
		}
		duplicatedItem.stimulusArray=arrayOfStimulus;
		return (duplicatedItem);
	}
}
//stimulus class
function Stimulus(text, type){
	this.text = text;
	this.duration=1;
	this.type =type; //text, bmp, jpg, wav
	this.topPosition=0;
	this.leftPosition=1;
	this.channel="2";
	this.clearScreen=true;
	this.notErasePrevious=false;
	this.presentInLine=5;
	this.isBlankInterval=false;
	this.synchroniseWithNext=false;
	
	//creates a duplicate of the stimulus
	this.duplicate = function(){
		var duplicatedStimulus= new Stimulus(this.text, this.type);
		duplicatedStimulus.duration=this.duration;		
		duplicatedStimulus.topPosition=this.topPosition;		
		duplicatedStimulus.leftPosition=this.leftPosition;
		duplicatedStimulus.channel=this.channel;
		duplicatedStimulus.clearScreen=this.clearScreen;
		duplicatedStimulus.notErasePrevious=this.notErasePrevious;
		duplicatedStimulus.presentInLine=this.presentInLine;
		duplicatedStimulus.isBlankInterval=this.isBlankInterval;
		duplicatedStimulus.synchroniseWithNext=this.synchroniseWithNext;
		
		return (duplicatedStimulus);
	}
}
//loop class
function Loop (firstItem){
	//the order of the first item in the loop
	this.firstItem=firstItem;
	this.numberOfItems=1;
	this.numberOfIterations=1;
	//not possible to duplicate
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
var loopArray = new Array ();
var itemNumber=-1;
var selectedStimulusNumber=-1;
var selectedLoopNumber=-1;

/**
 *  Called when the Visualization API is loaded.
 */
function drawVisualization() {
    
    //insert the first item to the array
	itemArray[0]= new Item("1", "");
    
	// Create and populate a data table.
	// data = new google.visualization.DataTable();
	// data.addColumn('datetime', 'start');
	// data.addColumn('datetime', 'end');
	// data.addColumn('string', 'content');

	var t = new Date(2010, 7, 23, 16, 30, 15);
	var te = new Date(2010, 7, 23, 16, 30, 17); 

    // data.addRows([
      // [new Date(t.getTime()+0), new Date(t.getTime()+1), itemArray[0].name],
    // ]);
    
    data = [{ 'start':new Date(t.getTime()+0), 'end':new Date(t.getTime()+1),'content':itemArray[0].name}];
    

	// specify options
	var options = {
		width : "100%",
		height : "300px",
		editable : true,
		style : "box",
		intervalMax : 100,
		min : t,
		max : te,
		cluster: true,
		eventMargin: 5
	};

	// Instantiate our timeline object.
	timeline = new links.Timeline(document.getElementById('mytimeline'));

	// Draw our timeline with the created data and options
	timeline.draw(data, options);

google.visualization.events.addListener(timeline, 'add', newItem);	
google.visualization.events.addListener(timeline, 'select', onselect);
google.visualization.events.addListener(timeline, 'delete', deleteItem);
google.visualization.events.addListener(timeline, 'change', onItemDrag);
	
}
/**
 * function to add a new item
 */
function newItem(itemToAdd){
	if(itemToAdd==null){
		//if no called from the new item button
		timeline.cancelAdd();
	}else{
		//add the item to the array of items
		var lastItem = timeline.getItem(calculateLastItem());
		if(itemToAdd==-1){
			itemArray.push(new Item(numberOfItems+1, ""));
		}else{
			itemArray.push(itemToAdd);
		}
		
		//add the item to the timeline
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
	
}

/**
 * function to add a new message item
 */
function newMessageItem(itemToAdd){
	//add the item to the array of items
	var lastItem = timeline.getItem(calculateLastItem());
	if(itemToAdd==null){
		itemArray.push(new Item(0, "Message"));
	}else{
		itemArray.push(itemToAdd);
	}
	
	//add the item to the timeline
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
 * function that returns the position of the last item of the timeline
 * -excludes the loops-
 */
function calculateLastItem(){
	var position=0;
	for(var i=timeline.getData().length-1;i>0&&position==0;i--){
		if(timeline.getData()[i].className!="loopBox"){
			position=i;
		}
	}
	return position;
}

/**
 * Function to add new loops
 */
function addLoop(){
	//the first item of the loop
	var firstItemNumber=0;
	var newloop= new Loop(firstItemNumber);
	loopArray.push(newloop);
	var dataContent="<img src='/assets/icons/loop.png' style='width:32px; height:32px; vertical-align: middle'> Loop";
	
	var firstItem = timeline.getItem(firstItemNumber);
	var start = new Date (firstItem.start.getTime());
	var end = new Date (firstItem.start.getTime());
	start.setMilliseconds(start.getMilliseconds());
	end.setMilliseconds(end.getMilliseconds()+1);
	timeline.addItem({
		'start' : start,
		'content' : dataContent,
		'end' : end,
		'className':'loopBox'
	}); 
}

/**
 * This function is called when an item is moved (draged) on the timeline
 * manages the order of the item after been draged.
 */
function onItemDrag(){
	var selectedRow=timeline.getSelection()[0].row;
	var itemNumber=selectedRow;
	var numberOfLoops=calculateNumberOfLoopsBefore(itemNumber);
	if(timeline.getData()[itemNumber].className=="loopBox"){
		//is a loop
		itemNumber=-1;
		//calculate the item that is the first of the loop
		var itemStartData = timeline.getItem(selectedRow).start.getMilliseconds();
		var startItemFound=-1;
		
		for(var i=0, ii=timeline.getData().length;i<ii&&startItemFound==-1;i++){
			//look for the item in which the loop starts
			if(itemStartData<=timeline.getItem(i).start.getMilliseconds()&&timeline.getData()[i].className!="loopBox"){
				startItemFound=i;
			}
		}
		if(startItemFound==-1){
			//the item has not been found, so is bigger than the bigest item
			startItemFound=itemArray.length-1;
		}
		loopArray[numberOfLoops].firstItem=startItemFound;
		organizeTimeLine();
	}else{
		//not a loop
		itemNumber=itemNumber-numberOfLoops;
		var movedItem=itemArray[itemNumber]
		var itemStartData = timeline.getItem(selectedRow).start.getMilliseconds();
		var found=false;
		var counter=0;
		if(timeline.getItem(selectedRow).start<=timeline.options.min.getTime()){
			//moving to the left the maximum
			itemArray.splice(itemNumber, 1);
			itemNumber=0;
			itemArray.splice(itemNumber, 0,movedItem);
			timeline.setSelection([{row:itemNumber}]);
			onselect();
			organizeTimeLine();
		}else{
			//normal movements
			for(var i=0, ii=itemArray.length;i<ii&&!found;i++){
				if(itemNumber!=i){
					//not to count the self item (the one been moved)
					counter=counter+1;
				}
				
				//contains the duration of the item
				var counter2=0;
				for(j=0,jj=itemArray[i].stimulusArray.length;j<jj;j++){
					counter2=counter2+parseInt(itemArray[i].stimulusArray[j].duration);
				}		
				if(counter2>0){
					counter2=counter2-1;
				}
				
				//obtain the new possition of the item
				itemStartData=itemStartData-parseInt(counter2);
				
				if(counter>=itemStartData){
					
					found=true;
					
					if(i<itemNumber){
						//move to the left
						itemArray.splice(itemNumber, 1);
						itemNumber=i+1;
						itemArray.splice(itemNumber, 0,movedItem);
						timeline.setSelection([{row:itemNumber}]);
						onselect();
						organizeTimeLine();
					}else if(i>itemNumber){
						//move to the right
						itemArray.splice(itemNumber, 1);
						itemNumber=i;
						itemArray.splice(itemNumber, 0,movedItem);
						timeline.setSelection([{row:itemNumber}]);
						onselect();
						organizeTimeLine();
					}else{
						//if i==itemNumber do nothing
						timeline.cancelChange();
					}
					
				}
			}
			//move to the right the maximum
			if(counter<itemStartData){
				itemArray.splice(itemNumber, 1);
				itemNumber=itemArray.length;
				itemArray.splice(itemNumber, 0,movedItem);
				timeline.setSelection([{row:itemNumber}]);
				onselect();
				organizeTimeLine();
			}
		}
	}
	
	
}


/**
 * function called when an item is seleted
 */
function onselect(){
	var selection= timeline.getSelection();
	showStimulusData(null);
	
	//obtain the fields
	var itemSaveButton = document.getElementById("item-save-button");
	var duplicateItemButton = document.getElementById("item-duplicate-button");
	var deleteItemButton = document.getElementById("item-delete-button");
	
	var outputNameField = document.getElementById("item-name-field");
	var outputIdField = document.getElementById("id-list-line");
	var outputExpectedField = document.getElementById("expected-response-list-line");
	
	var stimulusNumberP = document.getElementById("stimulus-number-p");
	var outputStimulusList = document.getElementById("stimulus-order-list");
	
	
	var noRandomizeLine = document.getElementById("no-randomise-line");
	var startTimerLine = document.getElementById("start-timer-stimulus-line");
	
	
	if(selection==""){
		//no item selected
		
		itemNumber=-1;
		selectedLoopNumber=-1;
		//set the fields
		itemSaveButton.setAttribute('disabled');
		duplicateItemButton.setAttribute('disabled');
		outputNameField.innerHTML = "No item selected";
		outputIdField.innerHTML = "ID: <span id='item-id-field'>-</span>";
		outputExpectedField.innerHTML="Expected response: <select disabled id='expected-response-field'><option value='+'>Positive response</option><option value='-'>Negative response</option><option value='^'>No response</option><option value='='>Any response</option></select>";
		stimulusNumberP.innerHTML ="<p id='stimulus-number-p'>Number of stimulus: -</p>";
		outputStimulusList.innerHTML="";
		deleteItemButton.setAttribute('disabled');
		noRandomizeLine.innerHTML="No randomise: <input id='no_randomise' type='checkbox' name='no_randomise' disabled value='true'>";
		startTimerLine.innerHTML="Start timer in stimulus:<select disabled id='timer-selection-field'><option value='0'>1</option></select>";
		generateTimerSelect();
	}else{
		//item selected
		itemNumber=selection[0].row;
		var numberOfLoops=calculateNumberOfLoopsBefore(itemNumber);
		itemSaveButton.removeAttribute("disabled");
		if(timeline.getData()[itemNumber].className=="loopBox"){
			//is a loop
			selectedLoopNumber=numberOfLoops;
			itemNumber=-1;
			var selectedLoop=loopArray[selectedLoopNumber];
			//fields setting
			outputNameField.innerHTML="Loop";
			duplicateItemButton.setAttribute('disabled');
			outputIdField.innerHTML = "Number of items: "+"<input id='id-input' type='number' min='1' value='"+selectedLoop.numberOfItems+"'>";
			outputExpectedField.innerHTML="Number of iterations: <input id='loop-number-iterations' type='number' name='first-item-possition' min='1' value='"+selectedLoop.numberOfIterations+"'>";
			stimulusNumberP.innerHTML ="<p id='stimulus-number-p'>Number of stimulus: -</p>";
			outputStimulusList.innerHTML="";
			deleteItemButton.setAttribute('disabled');
			noRandomizeLine.innerHTML="Possition of the first item: <input id='possition-first-item' type='number' name='first-item-possition' min='1' max='"+itemArray.length+"' value='"+(selectedLoop.firstItem+1)+"'>";
			startTimerLine.innerHTML="";
		}else{
			//not a loop
			//count the number of loops between 0 and row and deduct from itemNumber to calculate the selected item
			noRandomizeLine.innerHTML="No randomise: <input id='no_randomise' type='checkbox' name='no_randomise' value='true'>";
			startTimerLine.innerHTML="Start timer in stimulus:<select disabled id='timer-selection-field'><option value='0'>1</option></select>";
			var timerSelect = document.getElementById("timer-selection-field");
			var noRandomize = document.getElementById("no_randomise");
			itemNumber=itemNumber-numberOfLoops;
			selectedLoopNumber=-1;
			var selItem=itemArray[itemNumber];
			noRandomize.removeAttribute("disabled");
			noRandomize.checked=selItem.noRandomise;
			duplicateItemButton.removeAttribute("disabled");
			deleteItemButton.removeAttribute("disabled");
			outputNameField.innerHTML = selItem.name;
			outputIdField.innerHTML = "ID: "+"<input id='id-input' type='text' size='10' value='"+selItem.id+"'>";
			
			if(selItem.text!=""){
				//message field
				outputExpectedField.value='^';
				stimulusNumberP.innerHTML ="<p id='stimulus-number-p'>Text: <input id='message-input' type='text' size='50' value='"+selItem.text+"'></p>";
				outputStimulusList.innerHTML="";
				timerSelect.setAttribute('disabled');
				outputExpectedField.innerHTML="Expected response: <select disabled id='expected-response-field'><option value='+'>Positive response</option><option value='-'>Negative response</option><option value='^'>No response</option><option value='='>Any response</option></select>";
				//generateTimerSelect();
			}else{
				//normal field
				outputExpectedField.innerHTML="Expected response: <select id='expected-response-field'><option value='+'>Positive response</option><option value='-'>Negative response</option><option value='^'>No response</option><option value='='>Any response</option></select>";
				document.getElementById("expected-response-field").value=selItem.expectedResponse;
				timerSelect.removeAttribute("disabled");
				stimulusListGeneration();
				generateTimerSelect();
				
			}
		}
		
	}
}
/**
 * Calculates the number of loop items in the timeline before the finalNumber attribute
 * The method doesn't count the item in the position == finalNumber
 */
function calculateNumberOfLoopsBefore(finalNumber){
	var numberOfLoops=0;
	for(var i=0;i<finalNumber;i++){
		if(timeline.getData()[i].className=="loopBox"){
			numberOfLoops=numberOfLoops+1;
		}
	}
	return numberOfLoops;
}
/**
 * Generetes the options of the select of the attribute "Start timer in stimulus:"
 */
function generateTimerSelect(){
	var selectString="";
	var timerSelect = document.getElementById("timer-selection-field");
	if(itemNumber==-1){
		selectString="<option value='"+0+"'>"+1+"</option>";
		timerSelect.innerHTML=selectString;
	}else{
		var numberOfStimulus=itemArray[itemNumber].stimulusArray.length;
		selectString=selectString+"<option value='"+0+"'>"+1+"</option>";
		for(var i=1;i<numberOfStimulus;i++){
			selectString=selectString+"<option value='"+i+"'>"+(i+1)+"</option>";
		}
		timerSelect.innerHTML=selectString;
		timerSelect.value=itemArray[itemNumber].startTimerBeforeStimulus;
	}
}


/**
 * Function to generate the list of stimulus in the item pannel
 */
function stimulusListGeneration(){
	//the number of items
	var stimulusNumberP = document.getElementById("stimulus-number-p");
	stimulusNumberP.innerHTML ="<p id='stimulus-number-p'>Number of stimulus: "+itemArray[itemNumber].stimulusArray.length+"</p>";
	//the list
	var outputStimulusList = document.getElementById("stimulus-order-list");
	var selectedStimulus=itemArray[itemNumber];
	var stimulusArray = selectedStimulus.stimulusArray;
	var content="";
	for(i=0, ii=stimulusArray.length;i<ii;i++){
		if(selectedStimulus.startTimerBeforeStimulus==i){
			content=content+"<li onmouseover='stimulusListOnMouseOver(this);' onmouseout='stimulusListOnMouseOut(this);' onclick='selectStimulus(this);'> <img id='timer-icon' src='/assets/icons/timer.png' alt='timer icon' class='small-icon'><span id='selected-stimulus-line'>"+stimulusArray[i].text+" ,"+stimulusArray[i].type+"</span></li>";
		}else{
			content=content+"<li onmouseover='stimulusListOnMouseOver(this);' onmouseout='stimulusListOnMouseOut(this);' onclick='selectStimulus(this);'>"+stimulusArray[i].text+" ,"+stimulusArray[i].type+"</li>";
		}
		
	}
	outputStimulusList.innerHTML=content;
}

/**
 * Creates a new item with same attribute values of the selected one
 */
function duplicateItem(){
	if(itemNumber>=0){
		var selItem=itemArray[itemNumber];
		//add the duplicate of the item
		if(selItem.text==""){
			newItem(selItem.duplicate());
			organizeTimeLine();
		}else{
			newMessageItem(selItem.duplicate());
		}
	}
}

function deleteItem(){
	timeline.cancelDelete();
	if(itemNumber>=0){
		if(itemArray.length>1){
			itemArray.splice(itemNumber, 1);
			timeline.deleteItem(itemNumber);
			numberOfItems=numberOfItems-1;
			organizeTimeLine();
		}else{
			alert("The document must have at least one item.");
		}
		
	}else{
		alert("No item selected!");
	}
}

/**
 * The function called when clicked the save button of the item pannel
 */
function saveItem(){
	//validate there is an item selected
	if(itemNumber>=0){
		var id = document.getElementById("id-input").value;
		var timer = document.getElementById("timer-selection-field");
		var message = document.getElementById("message-input");
		var selItem=itemArray[itemNumber];
		selItem.noRandomise=document.getElementById("no_randomise").checked;
		if(message!=null){
			//message item
			selItem.id =id;
			selItem.text =message.value;
		}else
		{
			//normal item
			var expectedResponse = document.getElementById("expected-response-field").value;
			selItem.id =id;
			selItem.expectedResponse =expectedResponse;
			selItem.startTimerBeforeStimulus=timer.value;
			stimulusListGeneration();
			generateTimerSelect();
		}
		
	}else if(selectedLoopNumber>=0){
		//is a loop
		
		var selectedLoop=loopArray[selectedLoopNumber];
		//var seloop=loopArray[selectedLoopNumber];
		//console.log(document.getElementById("id-input").value);
		selectedLoop.numberOfItems=document.getElementById("id-input").value;
		selectedLoop.numberOfIterations=document.getElementById("loop-number-iterations").value;
		var firstpos=document.getElementById("possition-first-item").value-1;
		if(firstpos<0){
			selectedLoop.firstItem=0;
		}else if(firstpos>=itemArray.length){
			selectedLoop.firstItem=itemArray.length-1;
		}else{
			selectedLoop.firstItem=firstpos;
		}
		organizeTimeLine();
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
	selectedStimulusNumber=-1;
	for(var i=0,ii=listItems.length;i<ii && selectedStimulusNumber==-1 ;i++){
		if (listItems[i].attributes.getNamedItem("onmouseover")==null){
			selectedStimulusNumber=i;
		}
	}
	
	var stimulusToShow = itemArray[itemNumber].stimulusArray[selectedStimulusNumber];
	
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
	var specificFieldsArea = document.getElementById("specific-fields-area");
	var stimulusLine = document.getElementById("stimulus-present-line");
	var clearScreen = document.getElementById("clear_screen");
	var notErase = document.getElementById("not_erase");
	var isBlank = document.getElementById("is_blank");
	var synchronize = document.getElementById("synchronise");
	
	if(stimulus==null){
		//empty
		stimulusTextField.value="-";
		stimulusTextField.setAttribute('disabled');
		stimulusTypeField.setAttribute('disabled');
		stimulusTypeField.value="text";
		stimulusSaveButton.setAttribute('disabled');
		stimulusPannelHeader.innerHTML="No stimulus selected";
		stimulusDurationField.setAttribute('disabled');
		stimulusDurationField.value="";
		selectedStimulusNumber=-1;
		specificFieldsArea.innerHTML="";
		stimulusLine.setAttribute('disabled');
	    clearScreen.setAttribute('disabled');
	    notErase.setAttribute('disabled');
	    
	    isBlank.setAttribute('disabled');
	    synchronize.setAttribute('disabled');
		
		
	}else{
		//no empty
		stimulusTextField.removeAttribute("disabled");
		stimulusTextField.value=stimulus.text;
		stimulusTypeField.value=stimulus.type;
		stimulusTypeField.removeAttribute("disabled");
		stimulusSaveButton.removeAttribute("disabled");
		stimulusPannelHeader.innerHTML="Stimulus X";
		stimulusDurationField.removeAttribute("disabled");
		stimulusDurationField.value=stimulus.duration;
		stimulusTypeChange(stimulusTypeField);
		stimulusLine.removeAttribute("disabled");
	    clearScreen.removeAttribute("disabled");
	    notErase.removeAttribute("disabled");
	    isBlank.removeAttribute("disabled");
	    synchronize.removeAttribute("disabled");
		stimulusLine.value=stimulus.presentInLine;
		clearScreen.checked=stimulus.clearScreen;
	    notErase.checked=stimulus.notErasePrevious;
	    isBlank.checked=stimulus.isBlankInterval;
	    synchronize.checked=stimulus.synchroniseWithNext;
		
	}
	
}

/**
 * Cahnges the stimulus pannel when the type of the selected stimulus is changed
 */
function stimulusTypeChange(component){
	var selectedValue= component.options[component.selectedIndex].value;
	var stimulus=itemArray[itemNumber].stimulusArray[selectedStimulusNumber]
	var specificFieldsArea = document.getElementById("specific-fields-area");
	
	if(selectedValue=="text"){
		specificFieldsArea.innerHTML="";
	}else if(selectedValue=="bmp" ||selectedValue=="jpg"){
		var topPosition='<li>Top position: <input id="top-possition-field" type="number" name="quantity" value="'+stimulus.topPosition+'"></li>';
		var leftPosition='<li>Left position: <input id="left-possition-field" type="number" name="quantity" value="'+stimulus.leftPosition+'"></li>';
		specificFieldsArea.innerHTML=topPosition + leftPosition;
	}else if(selectedValue=="wav"){
		var audioChannelSelect='<select id="audio-channel-field" onchange="stimulusTypeChange(this)"><option value="0">Left</option><option value="1">Right</option><option value="2">Both</option></select>'
		var audioChannel='<li>Audio channel:'+audioChannelSelect+'</li>';
		specificFieldsArea.innerHTML=audioChannel;
		document.getElementById("audio-channel-field").value=stimulus.channel;
	}
}

/**
 * This function is called when pressed the save button of the item pannel
 */
function saveStimulus(){
	//obtain the stimulus
	var stimulus=itemArray[itemNumber].stimulusArray[selectedStimulusNumber]
	//obtain data
	var stimulusTypeField =document.getElementById("stimulus-type-field"); 
	var previousDuration=stimulus.duration;
	
	stimulus.text=document.getElementById("stimulus-text-field").value;
	stimulus.duration=document.getElementById("stimulus-duration-field").value;
	stimulus.type=stimulusTypeField.value;
	
	stimulus.presentInLine=document.getElementById("stimulus-present-line").value;
	stimulus.clearScreen=document.getElementById("clear_screen").checked;
	stimulus.notErasePrevious=document.getElementById("not_erase").checked;
	
	stimulus.isBlankInterval=document.getElementById("is_blank").checked;
	stimulus.synchroniseWithNext=document.getElementById("synchronise").checked;
	
	//if is an image stimulus or an audio stimulus it has more attributes
	if(stimulusTypeField.value=="jpg" || stimulusTypeField.value=="bmp"){
		stimulus.topPosition=document.getElementById("top-possition-field").value;
		stimulus.leftPosition=document.getElementById("left-possition-field").value;
	}else if(stimulusTypeField.value=="wav"){
		stimulus.channel=document.getElementById("audio-channel-field").value;
	}
	
	//reload the stimulus list of the item pannel and remark the selected one
	stimulusListGeneration();
	var listItems = document.getElementById("stimulus-order-list").children;
	var selected=listItems[selectedStimulusNumber];
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
	
	var start = new Date(timeline.options.min.getTime());
	var end = new Date (timeline.options.min.getTime());
	//is a loop?
	//timeline.getData()[itemNumber].className=="loopBox"
	
	//var lastItem = timeline.getItem(numberOfItems-1);
	for(var i=0, ii=itemArray.length;i<ii;i++){
		if(timeline.getData()[i].className=="loopBox"){
			//if is a loop, erase it
			timeline.deleteItem(i);
			i=i-1;
			
		}else{
			//not a loop, act normally
			//var timeLineItem = timeline.getItem(i);
			var totalTime=0;
			if(itemArray[i].text==""){
				
				var stimulusArray=itemArray[i].stimulusArray;
				for(j=0, jj=stimulusArray.length;j<jj;j++){
					totalTime=totalTime+parseInt(stimulusArray[j].duration);
				}
				if(totalTime<1){
					end.setMilliseconds(end.getMilliseconds()+1);
					//alert(itemArray[i].name+" - tot: "+totalTime);
				}else{
					end.setMilliseconds(end.getMilliseconds()+totalTime);
					//alert(itemArray[i].name+" - tot: "+totalTime);
				}
				timeline.changeItem(i,{
				'start' : start,
				'content' : itemArray[i].name,
				'end' : end
				})
				start = new Date (end.getTime());
				end = new Date (start.getTime());
				timeline.setSelection([{row: i}]);
			}else{
				//message item
				if(i>0 && timeline.getItem(i-1).end!=null){
					start.setMilliseconds(end.getMilliseconds()+1);
				}else{
					start.setMilliseconds(end.getMilliseconds());
				}
				timeline.changeItem(i,{
				'start' : start,
				'content' : "Item 0",
				'end' : null
				})
				start = new Date (start.getTime());
				start.setMilliseconds(start.getMilliseconds()+1);
				end = new Date (start.getTime());
				timeline.setSelection([{row: i}]);
			}
		}
	}
	//from itemArray.length erase all
	for(var i=timeline.getData().length-1,ii=itemArray.length;i>=ii;i--){
		timeline.deleteItem(i);
	}
	//add the loops
	
	for(var i=0, ii=loopArray.length;i<ii;i++){
		var dataContent="<img src='/assets/icons/loop.png' style='width:32px; height:32px; vertical-align: middle'> Loop";
		var firstItemNumber=loopArray[i].firstItem;
		var lastItemNumber=(parseInt(firstItemNumber)+parseInt(loopArray[i].numberOfItems))-1;
		if(lastItemNumber>=timeline.getData().length){
			lastItemNumber=timeline.getData().length-1;
		}
		console.log("first item"+firstItemNumber+"lastItem"+lastItemNumber);
		var start = new Date (timeline.getItem(firstItemNumber).start.getTime());
		var end = new Date (timeline.getItem(lastItemNumber).end.getTime());
		timeline.addItem({
			'start' : start,
			'content' : dataContent,
			'end' : end,
			'className':'loopBox'
		}); 
	}
	//?? this will change ??
	timeline.setSelection([{row:itemNumber}]);
}



//DRAG AND DROP METHODS OF THE STIMULUS ADDITION

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
				generateTimerSelect();
			}
		}else{
			alert("Can`t add a stimulus to a message item");
		}
			
	}else{
		alert("You must select an item first!");
	}
}


/*RIGHT PANNEL BUTTONS*/


/**
 * Opens the preview Window
 */
function previewWindow(){
	open('preview','Preview','top=600,left=600,width=600,resizable=no,height=600,');
} 

/**
 * Send the information of the document to the server and receive the created document
 */
function saveDocument(docId){
	var jsonText ={id:docId,json_data : JSON.stringify(itemArray)};
    //var text={json_data : JSON.stringify({"one": "Singular sensation","two": "Beady little eyes","three": "Little birds pitch by my doorstep"})};
	//alert(jsonText);
	$.ajax({
    url: 'save',
    type: 'POST',
    data: jsonText,
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
function downloadDocument(docId){
	var jsonText ={id:docId};
	$.ajax({
    url: 'download',
    type: 'POST',
    data: jsonText,
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

