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
	//calculates the duration of item
	this.calculateDuration=function(){
		var duration=0
		for(i=0, ii=this.stimulusArray.length;i<ii;i++){
			duration=duration+this.stimulusArray[i].duration;
		}
		if(duration<=0){
			duration=1;
		}
		return(duration);
	}
}
//converts a json object in a item object
Item.fromJSON=function(jsonObject){
	
	var item=new Item(jsonObject.item_number,jsonObject.text);
	item.expectedResponse=jsonObject.expected_response;
	item.startTimerBeforeStimulus=jsonObject.start_timer_before_stimulus;
	item.noRandomise=jsonObject.no_randomise;
	//the stimulus
	var stimulusArray=jsonObject.stimulus;
	for(var i=0,ii=stimulusArray.length;i<ii;i++){
		item.stimulusArray.push(Stimulus.fromJSON(stimulusArray[i]));
	}
	
	return(item);
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
//converts a json object in a stimulus object
Stimulus.fromJSON=function(jsonObject){
	//the order?????????????????????
	var stimulus=new Stimulus(jsonObject.text, jsonObject.stimulus_type);
	
	stimulus.duration=jsonObject.duration;
	stimulus.topPosition=jsonObject.top_possition;
	stimulus.leftPosition=jsonObject.left_possition;
	stimulus.channel=jsonObject.channel;
	stimulus.clearScreen=jsonObject.clear_screen;
	stimulus.notErasePrevious=jsonObject.not_erase_previous;
	stimulus.presentInLine=jsonObject.present_in_line;
	stimulus.isBlankInterval=jsonObject.is_blank_interval;
	stimulus.synchroniseWithNext=jsonObject.synchronise_with_next;
	return(stimulus);
}
//loop class
function Loop (firstItem){
	//the order of the first item in the loop
	this.firstItem=firstItem;
	this.numberOfItems=1;
	this.numberOfIterations=1;
	//not possible to duplicate
}
//converts a json object in a stimulus object
Loop.fromJSON=function(jsonObject){
	var loop= new Loop(jsonObject);
	loop.firstItem=jsonObject.first_item;
	loop.numberOfItems=jsonObject.number_of_items;
	loop.numberOfIterations=jsonObject.number_of_iterations;
	return(loop);
}
