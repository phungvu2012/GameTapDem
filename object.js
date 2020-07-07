var interval = {};
var myGameArea = {
	gameArea: document.createElement('div'),
	stage: document.createElement('div'),
	homeButton: document.createElement('div'),
	videoButton: document.createElement('div'),
	instructor: document.createElement('div'),
	textScore: document.createElement("span"),
	createElement: function() {
		this.gameArea.classList.add('game-area');

		this.gameArea.appendChild(this.stage);

		this.homeButton.classList.add('home-button');
		this.homeButton.addEventListener("click", backHome);
		var homeImg = document.createElement("img");
		homeImg.src = data.home.url;
		this.homeButton.appendChild(homeImg);

		this.videoButton.classList.add('video-button');
		var videoImg = document.createElement("img");
		videoImg.src = data.video.url;
		this.videoButton.appendChild(videoImg);

		this.instructor.classList.add('instructor');
		this.instructor.classList.add("instructor");

		var bear = document.createElement("div");
		bear.classList.add("bear");
		bear.classList.add("action-bear");
		this.instructor.appendChild(bear);

		var cornerImg = document.createElement("img");
		cornerImg.classList.add("corner");
		cornerImg.src = data.flatform.url;
		this.instructor.appendChild(cornerImg);

		this.textScore.classList.add("score");	
		this.textScore.innerHTML = "";
		this.gameArea.appendChild(this.textScore);

		// this.gameArea.classList.add('game-area');
		var gameBox = document.getElementsByClassName("game-box")[0];
		this.gameArea.appendChild(this.homeButton);
		this.gameArea.appendChild(this.videoButton);
		this.gameArea.appendChild(this.instructor);
		gameBox.appendChild(this.gameArea);
		
	}
}
var audio = {
	click: "",
	clickSound: "",
	number: [],
	background: "",
	bubblePop: "",
	load: function(number) {
		this.click = new Sound(data.sound.click.url);
		this.clickSound =  new Sound(data.sound.clickGame.url);
		this.loadAudioNumber(stage1.number);
		this.bubblePop = new Sound(data.sound.bubblePop.url);
	},
	loadAudioNumber: function(number) {
		for (let i = 0; i < number; i++) {
			this.number[i] = new Sound(data.sound.number.firstUrl + (i+1) + data.sound.number.lastUrl)
		}
	},
	backgroundSound: function (volume) {
		this.background = new Sound(data.sound.background.firstUrl + 5 + data.sound.background.lastUrl);
		this.background.optionAudio(true, volume);
		this.background.autoplay = true;
		this.background.sound.classList.add("sound");
	},
	setAudio: function() {
		var audio = document.getElementsByTagName('audio');
		for (let i = 0; i < audio.length; i++) {
			audio[i].pause();
			audio[i].currentTime = 0;
			console.log(audio[i]);
		}
	}
}

var stage1 = {
		number: 20,
		gameNumber: [18, 16, 8],
		count: 0,
		item: [],
		complete: false,
		load: function (gameArea) {
			this.count = 0;
			this.complete = false;
			gameArea.stage.classList.add('stage');
			var stageImg = document.createElement("img");
			stageImg.src = data.game1.box.url;
			gameArea.stage.appendChild(stageImg);
			setPaddingElement(gameArea.stage, data.game1.box.paddingTop * gameArea.stage.clientHeight, data.game1.box.paddingRight * gameArea.stage.clientWidth, data.game1.box.paddingBottom * gameArea.stage.clientHeight, data.game1.box.paddingLeft * gameArea.stage.clientWidth);
			// Tao các phần tử 
			this.createItem(gameArea, this.number);
			// Tạo audio đọc số
		},
		createItem: function(gameArea, number) {
			this.lesson = 1;
			for(let i = 0; i < number; i++) {
				this.item[i] = document.createElement('div');
				this.item[i].classList.add('item');

				this.item[i].classList.add('no_play');

				var img = document.createElement('img');
				img.src = data.game1.button.firstUrl + getRndInteger(data.game1.button.min, data.game1.button.max) + data.game1.button.lastUrl;
				this.item[i].appendChild(img);
				gameArea.stage.appendChild(this.item[i]);
			}
		},
		countItem: function() {
			audio.clickSound.play();
			if(this.classList.toString().indexOf("under_start") > -1) {
				++stage1.count;
				console.log(stage1.count);
				this.classList.remove('under_start');
				audio.number[stage1.count-1].play();
				myGameArea.textScore.innerHTML = "Number: " + stage1.count;
			}
			else {
				--stage1.count;
				this.classList.add('under_start');
				myGameArea.textScore.innerHTML = "Number: " + stage1.count;
			}
		},
		introGame1: function() {
			var i = 1;
			interval.introGame1 = setInterval(function() {
					audio.bubblePop.play();
					audio.number[i-1].play();
					stage1.item[i-1].classList.remove('no_play');
					stage1.item[i-1].classList.remove('under_start');
					myGameArea.textScore.innerHTML = "Number: " + i;
					++i;
					if(i > stage1.number) {
						clearInterval(interval.introGame1);
						setTimeout(stage1.start, 1000);
					}
				}, 1000);
			interval.loopGame1 = setInterval(this.update, 200);
		},
		start: function() {
			stage1.count = 0;
			myGameArea.textScore.innerHTML = "";
			for(let i = 0; i <stage1.number; i++) {
				stage1.item[i].classList.add('under_start');
				stage1.item[i].addEventListener("click", stage1.countItem, false);
				stage1.item[i].classList.add('no_play');
			}
			var count = 1;
			interval.start = setInterval(function() {
				audio.bubblePop.play();
				// console.log(stage1.number)
				stage1.item[count-1].classList.remove('no_play');
				if(count >= stage1.gameNumber[stage1.lesson - 1]) clearInterval(interval.start);
				++count;
			}, 300);
		},
		update: function() {
			if(stage1.lesson >= stage1.gameNumber.length && stage1.count === stage1.gameNumber[stage1.lesson - 1]) {
				stage1.complete = true;
			}
			else if(stage1.count === stage1.gameNumber[stage1.lesson - 1] ) {
				++stage1.lesson;
				setTimeout(stage1.start, 500);
			}
			if(stage1.complete) {
				console.log("win")
				clearInterval(interval.loopGame1);
				resetStage();
			}
		}
	}

function resetStage() {
	var myNode = document.getElementsByClassName("stage")[0];
	while (myNode.firstChild) {
	    myNode.removeChild(myNode.firstChild);
	}
    myGameArea.textScore.innerHTML = "";
}