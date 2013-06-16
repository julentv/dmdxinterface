//global variables
var itemArray = new Array ();
var loopArray = new Array ();
//load the data
function proyectLoad(){
	var items=jsonConfigurationFile.items;
	var loops=jsonConfigurationFile.loops;
	for(var i=0, ii=items.length;i<ii;i++){
		itemArray.push(Item.fromJSON(items[i]));
	}
	for(var i=0, ii=loops.length;i<ii;i++){
		loopArray.push(Loop.fromJSON(loops[i]));
	}
}
//Preview
function startPreview(){
	setMessage();
}
//global variables for execution
var currentItemNumber=0;
var currentStimulusNumber=0;
var milliseconds=4000;
function setMessage(){
	if(currentItemNumber<itemArray.length){
		if(itemArray[currentItemNumber].text!=""){
			//message item
			showMessageItem(itemArray[currentItemNumber]);
			currentItemNumber=currentItemNumber+1;
			window.setTimeout("setMessage()",milliseconds);
		}else{
			if(currentStimulusNumber<itemArray[currentItemNumber].stimulusArray.length){
				//show the stimulus
				showStimulus(itemArray[currentItemNumber].stimulusArray[currentStimulusNumber]);
				currentStimulusNumber=currentStimulusNumber+1;
				window.setTimeout("setMessage()",milliseconds);
			}else{
				//next item
				currentItemNumber=currentItemNumber+1;
				currentStimulusNumber=0;
				setMessage();
			}
		}
	}else{
		//the preview is over
		document.getElementById("writtin-pannel").innerHTML="Finished!!";
	}
	
}
function showStimulus(stimulus){
	var textToShow=stimulus.text;
	milliseconds=stimulus.duration*1000;
	document.getElementById("writtin-pannel").innerHTML=textToShow;
}
function showMessageItem(messageItem){
	var textToShow=messageItem.text;
	milliseconds=5000;
	document.getElementById("writtin-pannel").innerHTML=textToShow;
}
