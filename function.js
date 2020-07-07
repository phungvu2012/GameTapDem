function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
}


function setPaddingElement(element, top, right, bottom, left) {
	element.style.padding = top + "px " + right + "px " + bottom + "px " + left + "px";
}

