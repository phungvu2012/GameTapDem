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
					url: ""
				},
				wrong: {
					url: ""
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