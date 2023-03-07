// window.addEventListener("load", function () {
// });
class MySlider {
	constructor(nameSlider, parameters) {
		this.nameSlider = nameSlider;

		// TODO ---   NODOS HTML
		// * Nodo my-slider
		this.$mySlider = document.querySelector(nameSlider);
		// * Nodo my-slider__slides
		this.$mySliderSlides = document.querySelector(`${nameSlider} .my-slider__slides`);
		this.$mySliderSlidesContainer = document.querySelector(`${nameSlider} .my-slider__slides-container`);
		// this.$mySliderSlide = document.querySelector(`${nameSlider} .my-slider__slide`);

		// TODO ---   BOTONES
		this.$mySliderNextbutton = document.querySelector(`${nameSlider} .my-slider__navegation-button--next`);
		this.$mySliderBackbutton = document.querySelector(`${nameSlider} .my-slider__navegation-button--back`);
		this.semaphoreButton = true;

		// TODO ---   CORDENADAS DEL EVENTO
		this.isDragging = false;
		// * posicion de x
		this.startPosition;
		this.currentPosition;
		// * posicion de y
		this.startPositionY;
		this.currentPositionY;

		// TODO ---   SEMAPHORO DE DESPLAZAMIENTO
		this.semaphore;

		// TODO ---   DESPLAZAMIENTO DEL SLIDE
		// * Actual dezplazamiento
		this.currentTranslate;
		// * Anterior desplazamiento
		this.prevTranslate = 0;
		// * index
		this.currentIndex = 0;

		// TODO ---   VARIABLES CSS
		// * Numero de columndas y filas de my-slider__slides
		this.numberOfColumns = getComputedStyle(document.querySelector(`${nameSlider}`)).getPropertyValue("--column");
		// this.numberOfColumns = Math.floor(parseInt(getComputedStyle(document.querySelector(`${nameSlider}`)).getPropertyValue("--column")));
		this.numberOfRows = Math.floor(parseInt(getComputedStyle(document.querySelector(`${nameSlider}`)).getPropertyValue("--row")));
		// * Gap de my-slider__slides
		this.gap = Math.floor(parseInt(getComputedStyle(document.querySelector(`${nameSlider}`)).getPropertyValue("--gap")));

		// TODO ---   ARRAY CON LOS SLIDE
		this.mySliderSlidesArray = document.querySelectorAll(`${this.nameSlider} .my-slider__slide`);

		// TODO ---   WIDTH DEL SLIDE
		this.slideWidth = document.querySelector(`${this.nameSlider} .my-slider__slide`).offsetWidth;

		// TODO ---   LOOP
		this.loop = parameters.loop;

		// TODO ---   DESPLAZAMIENTO AUTOMATICO
		this.interval = parameters.interval;
		this.semaphoreInterval;

		// TODO ---   ORIENTACIÓN
		this.orientation;
		this.newOrientation;
		this.indexScreen
		this.bb = true
		// this.loopActive = typeof this.loop !== "undefined" ? true : false
		this.loopActive = this.loop !== false ? true : false
	}
	// TODO ---   ORIENTACIÓN

	funtionOrientation() {
		if (window.matchMedia("(orientation: portrait)").matches) {
			this.funtionOrientation = "portrait";
		}

		if (window.matchMedia("(orientation: landscape)").matches) {
			this.orientation = "landscape";
		}
	}
	funtionNewOrientation() {
		if (window.matchMedia("(orientation: portrait)").matches) {
			this.newOrientation = "portrait";
		}

		if (window.matchMedia("(orientation: landscape)").matches) {
			this.newOrientation = "landscape";
		}
	}

	// TODO ---   INICIO
	initialize() {
		this.funtionOrientation();
		// TODO ---   CUCHADORES DE EVENTOS
		window.addEventListener(
			"resize",
			() => {
				this.slideWidth = document.querySelector(`${this.nameSlider} .my-slider__slide`).offsetWidth;
			},
			{
				passive: true,
			}
		);
		this.mySliderSlidesArray.forEach(
			(slide) => {
				slide.querySelector("img").addEventListener("dragstart", (e) => {
					e.preventDefault();
				});
			},
			{
				passive: true,
			}
		);
		this.$mySliderSlidesContainer.addEventListener("dragstart", (e) => {
			e.preventDefault();
		});
		this.$mySlider.oncontextmenu = function (e) {
			e.preventDefault();
			e.stopPropagation();
		};
		this.$mySliderSlidesContainer.addEventListener(
			"touchstart",
			(e) => {
				this.touchStart(e);
			},
			{
				passive: true,
			}
		);
		this.$mySliderSlidesContainer.addEventListener(
			"touchend",
			(e) => {
				this.touchEnd(e);
			},
			{
				passive: true,
			}
		);
		this.$mySliderSlidesContainer.addEventListener(
			"touchmove",
			(e) => {
				this.touchMove(e);
			},
			{
				passive: true,
			}
		);
		this.$mySliderSlidesContainer.addEventListener(
			"mousedown",
			(e) => {
				this.touchStart(e);
			},
			{
				passive: true,
			}
		);
		this.$mySliderSlidesContainer.addEventListener(
			"mousemove",
			(e) => {
				this.touchMove(e);
			},
			{
				passive: true,
			}
		);
		this.$mySliderSlidesContainer.addEventListener(
			"mouseup",
			(e) => {
				this.touchEnd(e);
			},
			{
				passive: true,
			}
		);
		this.$mySliderSlidesContainer.addEventListener(
			"mouseleave",
			(e) => {
				this.touchEnd(e);
			},
			{
				passive: true,
			}
		);

		// TODO ---   EJECUTAR FUNCIONES
		// *Botones de navegaciom
		if (this.$mySliderNextbutton) {
			this.navegationButton();
		}
		// *Loop
		if (this.loopActive) {
			this.$mySliderSlides.style.transition = "none";
			this.$mySliderSlides.prepend(this.$mySliderSlides.lastElementChild);
			this.currentIndex = 1;
			this.currentTranslate = this.currentIndex * -(this.slideWidth + this.gap);
			this.$mySliderSlides.style.transform = `translateX(${this.currentTranslate}px)`;
			this.prevTranslate = this.currentTranslate;
		} else {
			if (this.$mySliderNextbutton) this.$mySliderBackbutton.classList.add("my-slider__navegation-button--opacity-none");
		}
		// *Interval
		if (typeof this.interval !== "undefined") {
			this.semaphoreInterval = true;
			this.functionInterval();
		}
		window.addEventListener("resize", () => {
			this.$mySliderSlides.style.transition = "none";
			this.numberOfColumns = getComputedStyle(document.querySelector(`${this.nameSlider}`)).getPropertyValue("--column");
			this.numberOfRows = getComputedStyle(document.querySelector(`${this.nameSlider}`)).getPropertyValue("--row");
			if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
				this.funtionNewOrientation();
				if (this.newOrientation !== this.orientation) {
					if(typeof this.loop !== "undefined"){
						this.currentIndex = 1;
					}else{
						this.currentIndex = 0;
					}
					this.currentTranslate = this.currentIndex * -(this.slideWidth + this.gap);
					this.prevTranslate = this.currentTranslate;
					this.$mySliderSlides.style.transform = `translateX(${this.currentTranslate}px)`;
				}
				this.orientation = this.newOrientation;
			} else {
				this.currentIndex += 0;
				this.currentTranslate = this.currentIndex * -(this.slideWidth + this.gap);
				this.prevTranslate = this.currentTranslate;
				this.$mySliderSlides.style.transform = `translateX(${this.currentTranslate}px)`;
			}
		});

	}
	// TODO ---   FUNCIONES COMIENZO, MOVIMIENTO Y FINAL
	touchStart(e) {
		this.isDragging = true;
		this.startPosition = this.getPositionX(e);
		this.startPositionY = this.getPositionY(e);
		
	}
	touchMove(e) {
		if (this.semaphoreInterval) {
			this.semaphoreInterval = false;
		}
		if (this.isDragging) {
			this.$mySliderSlidesContainer.style.cursor = "grabbing";
			this.currentPosition = this.getPositionX(e);
			this.currentPositionY = this.getPositionY(e);
			this.currentTranslate = this.prevTranslate + this.currentPosition - this.startPosition;
			if (Math.abs(this.startPositionY - this.currentPositionY) < 10) {
				if (Math.abs(this.startPosition - this.currentPosition) > 10) {
					this.semaphore = true;
				}
			}
			if (this.semaphore) {
				if(!this.bb && this.loopActive) return
				this.setTranslate();
			}

			// // this.animation();
		}
	}
	touchEnd() {
		if(!this.bb && this.loopActive) return
		let movedBy, direction;
		movedBy = this.currentTranslate - this.prevTranslate;
		movedBy > 0 ? (direction = -1) : (direction = 1);
		if (this.semaphore) {
			// * cantidad de slide que se desplazan
			if(typeof this.loop !== "undefined"){
				this.currentIndex += 1 * direction;
			}else{
				if (Math.abs(movedBy) > this.slideWidth * 2.5) {
					this.currentIndex += 3 * direction;
				} else if (Math.abs(movedBy) > this.slideWidth * 1.5) {
					this.currentIndex += 2 * direction;
				} else if (Math.abs(movedBy) > 50) {
					this.currentIndex += 1 * direction;
				}
			}
			// this.setPositionByIndex()
			this.$mySliderSlides.addEventListener("transitionend", this.setPositionByIndex());
		}
		this.isDragging = false;
		this.semaphore = false;
		this.$mySliderSlidesContainer.style.cursor = "grab";
	}
	reorder() {
		if (this.loopActive) {
			if (this.currentIndex == 0) {
				this.$mySliderSlides.prepend(this.$mySliderSlides.lastElementChild);
				this.$mySliderSlides.style.transition = "none";
				this.currentIndex += +1;
				this.currentTranslate = this.currentIndex * -(this.slideWidth + this.gap);
				this.$mySliderSlides.style.transform = `translateX(${this.currentTranslate}px)`;
				this.prevTranslate = this.currentTranslate;
			} else if (this.currentIndex == this.mySliderSlidesArray.length - 1) {
				this.$mySliderSlides.appendChild(this.$mySliderSlides.firstElementChild);
				this.$mySliderSlides.style.transition = "none";
				this.currentIndex += -1;
				this.currentTranslate = this.currentIndex * -(this.slideWidth + this.gap);
				this.$mySliderSlides.style.transform = `translateX(${this.currentTranslate}px)`;
				this.prevTranslate = this.currentTranslate;
			}
		}
		this.bb = true
	}

	// TODO ---   ESTABLECER TRANSLACION DE $SLIDES
	setTranslate() {
		this.$mySliderSlides.style.transform = `translateX(${this.currentTranslate}px)`;
	}

	// TODO ---   OBTENER POSICION DE X
	getPositionX(e) {
		return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
	}
	getPositionY(e) {
		return e.type.includes("mouse") ? e.pageY : e.touches[0].clientY;
	}

	// TODO ---   ANIMACION
	// animation() {
	// this.setTranslate();
	// if(this.isDragging){
	// 	reguestAnimationFrame(this.animation())
	// }
	// }
	// TODO ---   ESTABLECER INDICE DE POSICION
	setPositionByIndex() {
		// *Bloquear el desplazamiento de los slide de los extremos
		if (!this.loopActive) {
			this.indexScreen = Math.ceil(this.mySliderSlidesArray.length / this.numberOfRows - Math.floor(this.numberOfColumns));
			if (this.numberOfRows < 2) {
				this.indexScreen = this.mySliderSlidesArray.length - Math.floor(this.numberOfColumns);
			}
			if (this.indexScreen <= this.currentIndex) {
				this.currentIndex = this.indexScreen;
			}
			if (this.currentIndex <= 0) {
				this.currentIndex = 0;
			}
			// * ocultar botones
			this.hidenButton();
		}
		this.slideWidth = this.$mySlider.clientWidth / this.numberOfColumns - this.gap;
		this.currentTranslate = this.currentIndex * -(this.slideWidth + this.gap);
		this.prevTranslate = this.currentTranslate;
		this.$mySliderSlides.style.transition = "transform .3s ease-out";
		this.setTranslate();
		this.$mySliderSlides.addEventListener("transitionend", () => {
			this.reorder();
		});
		this.$mySliderSlides.addEventListener("transitionend", () => {
			this.semaphoreButton = true;
		});

		this.bb = false
	}
	hidenButton() {
		if(this.$mySliderNextbutton){
			if (this.currentIndex == 0) {
				this.$mySliderBackbutton.classList.add("my-slider__navegation-button--opacity-none");
			} else {
				this.$mySliderBackbutton.classList.remove("my-slider__navegation-button--opacity-none");
			}
			if (this.currentIndex == this.indexScreen) {
				this.$mySliderNextbutton.classList.add("my-slider__navegation-button--opacity-none");
			} else {
				this.$mySliderNextbutton.classList.remove("my-slider__navegation-button--opacity-none");
			}
		}
	}

	navegationButton() {
		this.$mySlider.addEventListener("click", (e) => {
			if(!e.target.classList.contains("my-slider__navegation-button")) return
			if (e.target.classList.contains("my-slider__navegation-button--opacity-none")) return;
			if (this.semaphoreButton) {
				this.semaphoreButton = false;
				this.semaphoreInterval = false;
				if (e.target == this.$mySliderNextbutton) {
					this.currentIndex += 1 ;
					// this.currentIndex += 1 * Math.floor(this.numberOfColumns);
				} else if (e.target == this.$mySliderBackbutton) {
					this.currentIndex += -1 ;
					// this.currentIndex += -1 * Math.floor(this.numberOfColumns);
				}
				this.setPositionByIndex();
			}
		});
	}
	functionInterval() {
		setInterval(() => {
			if (this.semaphoreInterval) {
				this.currentIndex += 1;
				this.setPositionByIndex();
			} else if (!this.semaphoreInterval) {
				setTimeout(() => {
					this.semaphoreInterval = true;
				}, this.interval.resume);
			}
		}, this.interval.time);
	}
}
const sliderTop = new MySlider(".slider-galery-top", {
	// interval: {
	// 	time: 5000,
	// 	resume: 7000,
	// },
	loop: false,
});
sliderTop.initialize();
// const sliderCatalogueIndex = new MySlider(".slider-catalogue-index", {});
// sliderCatalogueIndex.initialize();
