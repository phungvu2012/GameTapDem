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
		this.stage.setAttribute("class", "screenGame");


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
	welcome: "",
	thank: "",
	happy: [],
	wrong: [],
	load: function(number) {
		this.click = new Sound(data.sound.click.url);
		this.clickSound =  new Sound(data.sound.clickGame.url);
		this.loadAudioNumber(stage1.number);
		this.bubblePop = new Sound(data.sound.bubblePop.url);
		this.welcome = new Sound(data.sound.welcome.url);
		this.thank = new Sound(data.sound.thank.url);

		for(let i = data.sound.happy.min; i <= data.sound.happy.max; ++i) {
			this.happy[i] = new Sound(data.sound.happy.firstUrl + i + data.sound.happy.lastUrl)
		}
		for(let i = data.sound.wrong.min; i <= data.sound.wrong.max; ++i) {
			this.wrong[i] = new Sound(data.sound.wrong.firstUrl + i + data.sound.wrong.lastUrl)
		}
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
			// console.log(audio[i]);
		}
	}
}

var stage1 = {
		number: 20,
		gameNumber: data.game1.number,
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
				}, 1000); //1000
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
				clearInterval(interval.loopGame1)
				resetStage();
				stage2.load();
			}
		}
	}

var stage2 = {
	number: 20,
	gameNumber: data.game2.gameNumber,
	lesson: 1,
	button: {
		element1: "",
		element2: ""
	},
	load: function() {
		this.lesson = 1;
		this.button.element1 = document.createElement("button");
		this.button.element2 = document.createElement("button");

		myGameArea.stage.appendChild(this.button.element1);
		myGameArea.stage.appendChild(this.button.element2);
		myGameArea.stage.classList.add('stage2');
		myGameArea.stage.classList.remove('stage');
		this.createItem();
		this.button.element1.addEventListener("click", this.checkResult);
		this.button.element2.addEventListener("click", this.checkResult);
		this.button.element1.classList.add("element1");
		this.button.element2.classList.add("element2");

	},
	createItem: function() {
		console.log('create')
			for(let i = 0; i < this.number; i++) {
				var element = document.createElement('div');
				element.classList.add('item');
				element.classList.add('no_play');

				var img = document.createElement('img');
				img.src = data.game1.button.firstUrl + getRndInteger(data.game1.button.min, data.game1.button.max) + data.game1.button.lastUrl;
				element.appendChild(img);
				
				this.button.element1.appendChild(element);
			}

			for(let i = 0; i < this.number; i++) {
				var element = document.createElement('div');
				element.classList.add('item');
				element.classList.add('no_play');

				var img = document.createElement('img');
				img.src = data.game1.button.firstUrl + getRndInteger(data.game1.button.min, data.game1.button.max) + data.game1.button.lastUrl;

				element.appendChild(img);
				
				this.button.element2.appendChild(element);
			}
			this.startGame();
	},
	startGame: function() {
		console.log("stage2" + this.lesson)
		var img1 = this.button.element1.getElementsByTagName("div");
		for(let i = 0; i < this.gameNumber[this.lesson - 1].element1; i++) {
			// console.log(this.gameNumber[this.lesson - 1].element1)
			img1[i].classList.remove("no_play");
		}
		var img2 = this.button.element2.getElementsByTagName("div");
		for(let i = 0; i < this.gameNumber[this.lesson - 1].element2; i++) {
			img2[i].classList.remove("no_play");	
		}
		myGameArea.textScore.innerHTML = "Number: " + this.gameNumber[this.lesson - 1].number;
	},
	checkResult: function() {
		var lengthNoPlay = this.getElementsByClassName("no_play").length;
		if(stage2.number - lengthNoPlay === stage2.gameNumber[stage2.lesson - 1].number) {
			var rand = getRndInteger(data.sound.happy.min, data.sound.happy.max);
			audio.happy[rand].play();
			if(stage2.lesson >= stage2.gameNumber.length) {
				resetStage();
				stage3.load();
				// myGameArea.setAttribute("class", "")
			}
			else {
		    myGameArea.textScore.innerHTML = "";
			stage2.resetElement();
			stage2.lesson += 1;
			stage2.startGame();
			}
		}
		else {
			var rand = getRndInteger(data.sound.wrong.min, data.sound.wrong.max);
			audio.wrong[rand].play();
		}
	},
	resetElement: function() {
		var item = document.getElementsByClassName("item");
		console.log("hello" + item)
		for(let i = 0; i < item.length; i++) {
			item[i].classList.add("no_play");
		}
	}
}

var stage3 = {
	number: 20,
	item: [],
	numberLesson: 1,
	complete: false,
	load: function (gameArea) {
		myGameArea.stage.classList.add('stage3');

		var stageImg = document.createElement("img");
		stageImg.src = data.game2.box.url;
		myGameArea.stage.appendChild(stageImg);
		setPaddingElement(myGameArea.stage, data.game2.box.paddingTop * myGameArea.stage.clientHeight, data.game2.box.paddingRight * myGameArea.stage.clientWidth, data.game2.box.paddingBottom * myGameArea.stage.clientHeight, data.game2.box.paddingLeft * myGameArea.stage.clientWidth);
		// Tao các phần tử 
		this.createItem(myGameArea, this.number);
		// Tạo audio đọc số
	},
	createItem: function(gameArea, number) {
		this.lesson = 1;
		for(let i = 0; i < number; i++) {
			this.item[i] = document.createElement('div');
			this.item[i].classList.add('item');

			// this.item[i].classList.add('no_play');

			var img = document.createElement('img');
			var rand = getRndInteger(data.game2.numberImage.min, data.game2.numberImage.max);
			img.src = data.game2.numberImage.firstUrl + rand + data.game2.numberImage.lastUrl;
			this.item[i].appendChild(img);
			this.item[i].setAttribute("id", "id" + i + '-' + rand)

			this.item[i].addEventListener('click', this.check, false)


			gameArea.stage.appendChild(this.item[i]);

			this.createElephant();
			console.log('Winner')
		}
		this.chooseRandNumber();
	},
	createElephant: function() {
		var img = document.createElement('img');
		img.src = data.game2.elephant.firstUrl + 1 + data.game2.elephant.lastUrl;
		img.classList.add('elephant');

		myGameArea.stage.appendChild(img);
	},
	chooseRandNumber: function() {
		var rand = getRndInteger(0, data.game2.numberImage.max - data.game2.numberImage.min);
		console.log(rand);
		var index = this.item[rand].id.toString().indexOf('-');
		this.numberLesson = this.item[rand].id.toString().slice(index + 1);
		myGameArea.textScore.innerHTML = "" + this.numberLesson;
	},
	check: function() {
		var numberItem = this.id.toString().slice( this.id.toString().indexOf('-') + 1);
		if(numberItem == stage3.numberLesson) {
			var rand = getRndInteger(data.sound.happy.min, data.sound.happy.max);
			audio.happy[rand].play();
			this.classList.add("finished");
			stage3.complete = true;
			for(element of stage3.item) {
				var numberEle = element.id.toString().slice( element.id.toString().indexOf('-') + 1);
				if(numberEle == stage3.numberLesson) {
					if(element.classList.toString().indexOf("finished") === - 1) 
					stage3.complete = false;
				}
			}
		}
		else {
			var rand = getRndInteger(data.sound.wrong.min, data.sound.wrong.max);
			audio.wrong[rand].play();
		}

			
		if(stage3.complete) backHome();
	}
}

function resetStage() {
	myGameArea.stage.setAttribute("class", "screenGame");
	var myNode = document.getElementsByClassName("screenGame")[0];
	while (myNode.firstChild) {
	    myNode.removeChild(myNode.firstChild);
	}
    myGameArea.textScore.innerHTML = "";
}