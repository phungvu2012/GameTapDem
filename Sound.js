function Sound(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.optionAudio = function(loop, volume){
		this.sound.loop = loop;
		this.sound.volume = volume;
		console.log('hello')
	}
	this.play = function() {
		this.sound.play()
	}
}