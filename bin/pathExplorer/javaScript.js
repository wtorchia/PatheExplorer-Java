var previousEvent = null;
var previousElemetOutline = null;

document.addEventListener('click', intercept);
document.addEventListener('onclick', intercept);

function intercept(event) {
	
	if(previousEvent != null) {
		previousEvent.target.style.outline = previousElemetOutline;
	}
	previousEvent = event;
	previousElemetOutLine = event.target.style.outline;
	event.target.style.outline = 'solid blue 5px';
	var evt = event ? event:window.event;
	var path = getDomPath(event.target);
	app.sendMsg(path);	  		
	event.preventDefault();  	
}

function getDomPath(element) {
	var stack = [];
	while ( element.parentNode != null ) {						
		var sibCount = 0;
		var sibIndex = 0;
		
		for ( var i = 0; i < element.parentNode.childNodes.length; i++ ) {
			var sib = element.parentNode.childNodes[i];
			if ( sib.nodeName == element.nodeName ) {
				if ( sib === element ) {
					sibIndex = sibCount;
				}
				sibCount++;
			}
		}
		
		if ( element.hasAttribute('id') && element.id != '' ) {
			stack.unshift(element.nodeName.toLowerCase() + '#' + element.id);
		}					      
		else if ( sibCount > 1 && element.className != '') {
			stack.unshift(element.nodeName.toLowerCase() + '.' + element.className);
		} 
		else if ( sibCount > 1 ) {
			stack.unshift(element.nodeName.toLowerCase() + ':nth-child(' + (sibIndex +1) + ')');					      	
		} 
		else {
			stack.unshift(element.nodeName.toLowerCase());
		}
		
		element = element.parentNode;
	}
	return stack.slice(1); 
}



