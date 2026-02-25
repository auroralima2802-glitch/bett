<template>
    <div class="carousel-container">

		<div class="carousel-items" :style="carouselStyles"
			v-touch:swipe.right="prevSlide"
			v-touch:swipe.left="nextSlide"
		>
			<div @click="navigateToPage(banner.redirect_to), pauseAutoplay" v-for="(banner, index) in banners" 
				:key="index" 
				:style="{ transform: `translateX(-${currentIndex * 100}%)`, transitionDuration: `500ms` }" 
				class="carousel-slide"
			>
				<img :src="banner.banner_url" :alt="'banner'" />
			</div>
		</div>
        

        <button v-if="showItemNavigators || showItemNavigatorsOnHover" @click="prevSlide" class="nav-button prev-button">&#10094;</button>
        <button v-if="showItemNavigators || showItemNavigatorsOnHover" @click="nextSlide" class="nav-button next-button">&#10095;</button>

        <div v-if="showIndicators" class="carousel-indicators">
            <span v-for="(banner, index) in banners" 
                  :key="index" 
                  @click="jumpToSlide(index)" 
                  :class="{ active: currentIndex === index }"
            ></span>
        </div>
    </div>
</template>

<script>
export default {
	
	props: {
		banners: {
			type: Array,
			default: () => [],
		},
		responsiveOptions: {
			type: Array,
			default: () => [
				{
					breakpoint: 1199,
					height: 300
				},
				{
					breakpoint: 991,
					height: 250
				},
				{
					breakpoint: 767,
					height: 170
				},
			],
		},
		numVisible: {
			type: Number,
			default: 1
		},
		circular: {
			type: Boolean,
			default: true
		},
		autoPlay: {
			type: Boolean,
			default: true
		},
		showItemNavigators: {
			type: Boolean,
			default: false
		},
		showThumbnails: {
			type: Boolean,
			default: false
		},
		transitionInterval: {
			type: Number,
			default: 5000
		},
		showItemNavigatorsOnHover: {
			type: Boolean,
			default: false
		},
		showIndicators: {
			type: Boolean,
			default: true
		}
	},

	data() {
        return {
            currentIndex: 0,
            interval: null,
			isAutoplayPaused: false,
        }
    },


	computed: {
        carouselStyles() {
            let matchedStyle = {};
            for (let option of this.responsiveOptions) {
                if (window.innerWidth <= parseInt(option.breakpoint)) {
                    matchedStyle = { height: `${option.height}px` };
                }
            }
            return matchedStyle;
        }
    },

	mounted() {
		if (this.autoPlay) {
			this.startAutoPlay();
		}
	},

	beforeUnmount() {
		clearInterval(this.interval);
	},

	methods: {
		navigateToPage(page) {
			document.location = page
		},

		pauseAutoplay() {
			clearInterval(this.interval);
			this.isAutoplayPaused = true;
		},

		resumeAutoplay() {
			if (this.isAutoplayPaused && this.autoPlay) {
				this.startAutoPlay();
				this.isAutoplayPaused = false;
			}
		},

		resetAutoplay() {
			this.pauseAutoplay();
			setTimeout(this.resumeAutoplay, 5000);  // Retoma o autoplay após 5 segundos de inatividade
		},
		
		nextSlide() {
			if (this.currentIndex < this.banners.length - 1) {
				this.currentIndex++;
			} else if (this.circular) {
				this.currentIndex = 0;
			}
			this.resetAutoplay();
		},


		prevSlide() {
			console.log('prev')

			if (this.currentIndex > 0) {
				this.currentIndex--;
			} else if (this.circular) {
				this.currentIndex = this.banners.length - 1;
			}
			this.resetAutoplay();
		},

		jumpToSlide(index) {
			this.currentIndex = index;
			this.resetAutoplay();
		},

		startAutoPlay() {
			this.interval = setInterval(this.nextSlide, this.transitionInterval);
		},
	}
}
</script>
  
<style scoped>
.carousel-container {
	display: flex;
	position: relative;
	overflow: hidden;
	margin-bottom: 20px;
	cursor: pointer;
	width: 100%;
  /*   border-radius: 7px; */
}
.carousel-items {
	display: flex;
	position: relative;
	overflow: hidden;
	margin-bottom: 20px;
	cursor: pointer;
	width: 100%;
   /*  border-radius: 7px; */
}
.carousel-slide {
	display: inline-block;
	transition: transform 0.5s;
	flex: 0 0 100%;
}
.carousel-slide > img {
	object-fit: cover;
	object-position: bottom;
	height: 100%;
	width: 100%;
}
.nav-button {
	position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.2);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 18px;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
}
.prev-button {
	left: 15px;
}
.next-button {
	right: 15px;
}
.carousel-indicators {
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	gap: 5px;
}
.carousel-indicators span {
	width: 10px;
	height: 10px;
	background-color: #cdcdcd;
	border-radius: 50%;
	cursor: pointer;
	transition: background-color 0.3s;
}
.carousel-indicators span.active {
	background-color: var(--app-primary-color);
	width: 10px;
}

@media (max-width: 1600px) {
    .carousel-items {
        height: 300px;
    }
}

@media (max-width: 991px) {
    .carousel-items {
        height: 250px;
    }
}

@media (max-width: 767px) {
    .carousel-items {
        height: 200px;
    }
}
</style>
