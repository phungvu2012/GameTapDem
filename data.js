		var data = {
			backgroundImage: {
				url: "views/background-color/color (10).png",
			},
			screen: {
				width: window.innerWidth,
				height: document.documentElement.clientHeight
			},
			kodiImage: {
				url: "views/kodi/kodi (1).png",
			},
			flatform: {
				url: "views/kodi/platform.png",
			},
			video: {
				url: "views/video/icon (1).png",
			},
			home: {
				url: "views/home/home.png",
			},
			game1: {
				number: [16, 10, 8],
				box: {
					url: "views/box/box (2).png",
					width: 2048,
					height: 1536,
					paddingTop: 0.091,
					paddingLeft: 0.0635,
					paddingBottom: 0.174,
					paddingRight: 0.07
				},
				button: {
					firstUrl: "views/reyabug/icon (",
					lastUrl: ").png",
					min: 1,
					max: 100
				}
			},
			game2:{
				gameNumber: [
					{
						number: 16,
						element1: 16,
						element2: 12
					}, 
					{
						number: 12,
						element1: 14,
						element2: 12
					}, 
					{
						number: 8,
						element1: 8,
						element2: 18
					}],
				box: {
					url: "views/game2/gia.png",
					width: 2048,
					height: 1536,
					paddingTop: 0.08,
					paddingLeft: 0,
					paddingBottom: 0.35,
					paddingRight: 0.07
				},
				elephant: {
					firstUrl: "views/game2/elephant (",
					lastUrl: ").png",
					min: 1,
					max: 4
				},
				numberImage: {
					firstUrl: "views/number/",
					lastUrl: ".png",
					min: 1,
					max: 20
				}
			},
			screenGame: {},
			ratio: 1,
			zoom: 1,
			stage: {
				zoom: 0.8
			},
			sound: {
				welcome: {
					url: "views/kodi/5 kodi - welcome to my room excited.mp3"
				},
				background: {
					firstUrl: "views/sound/music (",
					lastUrl: ").mp3"
				},
				number: {
					firstUrl: "views/sound number/",
					lastUrl: ".mp3"
				},
				click: {
					url: "views/sound/Mouse-Click-00-c-FesliyanStudios.com.mp3"
				},
				clickGame: {
					url: "views/reyabug/numberline_wing_flap.mp3"
				},
				bubblePop: {
					url: "views/sound/back_button.mp3"
				},
				happy: {
					firstUrl: "views/kodi/happy (",
					lastUrl: ").mp3",
					min: 1,
					max: 5
				},
				wrong: {
					firstUrl: "views/kodi/wrong (",
					lastUrl: ").mp3",
					min: 1,
					max: 3
				},
				thank: {
					url: "views/kodi/usgk$kodivoice$thanksforplayingwithme.mp3"
				}

			},
			setScreenGame: function() {
				this.ratio = this.backgroundImage.width / this.backgroundImage.height;
				this.zoom = this.screen.height / this.backgroundImage.height
				this.screenGame.height = this.screen.height;
				this.screenGame.width = this.screenGame.height * this.ratio;
				this.stage.height = this.screenGame.height * this.stage.zoom;
				this.stage.width = this.screenGame.width * this.stage.zoom;
			}
		}