//global variables
var itemArray
var loopArray
var canvasP;
var canvasP_context;
var canvasTextWidth=450;
var canvasTextHeigth=300;
//load the data
function proyectLoad(){
	itemArray = new Array ();
	loopArray = new Array ();
	var items=jsonConfigurationFile.items;
	var loops=jsonConfigurationFile.loops;
	console.log("number of items:"+items.length);
	console.log("number of loops:"+loops.length);
	for(var i=0, ii=items.length;i<ii;i++){
		itemArray.push(Item.fromJSON(items[i]));
	}
	for(var i=0, ii=loops.length;i<ii;i++){
		loopArray.push(Loop.fromJSON(loops[i]));
		
	}
	console.log("number of items2:"+itemArray.length);
	console.log("number of loops2:"+loopArray.length);
}
//Preview
function startPreview(){
	document.getElementById("startButton").setAttribute('disabled');
	canvasP = document.getElementById("writtin-pannel");
	canvasP_context = canvasP.getContext("2d");
	canvasP_context.fillStyle = '#000';
	canvasP_context.font = '50pt Arial';
	canvasP_context.textBaseline = 'middle';
	canvasP_context.textAlign = 'center';
	setMessage();
}
//global variables for execution
var currentItemNumber=0;
var currentStimulusNumber=0;
var milliseconds=4000;
var loopStartArray=new Array();
var loopEndArray=new Array();
var loopIterationsArray=new Array();

function setMessage(){
	if(currentItemNumber<itemArray.length){
		//any loop begins?
		//for(var i=0;i<loopArray.length;i++)
		console.log(loopArray.length);
		while(loopArray.length>0&&loopArray[0].firstItem==currentItemNumber){
			var currentLoop=loopArray[0];
			if(currentLoop.numberOfItems>0&&currentLoop.numberOfIterations>0){
				loopStartArray.push(currentLoop.firstItem);
				loopEndArray.push(currentLoop.firstItem+currentLoop.numberOfItems-1);
				loopIterationsArray.push(currentLoop.numberOfIterations);
			}
			loopArray.splice(0,1);
			console.log("one");
		}
		//show the item
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
				//any loop ends?
				var found=false;
				for(var i=0, ii=loopEndArray.length;i<ii&&!found;i++){
					
					if(loopEndArray[i]==currentItemNumber){
						//a loop end on this item (go to the begining of the loop)
						if(loopIterationsArray[i]>1){
							
							found=true;
							currentItemNumber=loopStartArray[i];
							currentStimulusNumber=0;
							
							loopIterationsArray[i]=loopIterationsArray[i]-1;
						}//no more iteration on this loop, erase it
						else{
							loopEndArray.splice(i,1);
							loopIterationsArray.splice(i,1);
							loopStartArray.splice(i,1);
						}
						
					}
				}
				if(!found){
					//when no loop ends go to next item
					currentItemNumber=currentItemNumber+1;
					currentStimulusNumber=0;
				}
				setMessage();
			}
		}
		
	}else{
		//the preview is over
		canvasP_context.clearRect(0, 0, canvasP.width, canvasP.height);
		canvasP_context.fillText("Finished", canvasTextWidth, canvasTextHeigth);
		currentItemNumber=0;
		proyectLoad();
		document.getElementById("startButton").removeAttribute('disabled');
	}
	
}
function showStimulus(stimulus){
	var textToShow=stimulus.text;
	milliseconds=stimulus.duration*1000;
	
	if(!stimulus.notErasePrevious){
		canvasP_context.clearRect(0, 0, canvasP.width, canvasP.height);
	}
	if(!stimulus.isBlankInterval){
		var heightToshow=canvasTextHeigth-(stimulus.presentInLine*50)
		canvasP_context.fillText(textToShow, canvasTextWidth, heightToshow);	
	}
	
}
function showMessageItem(messageItem){
	var textToShow=messageItem.text;
	milliseconds=3000;
	canvasP_context.clearRect(0, 0, canvasP.width, canvasP.height);
	canvasP_context.fillText(textToShow, canvasTextWidth, canvasTextHeigth);
}
