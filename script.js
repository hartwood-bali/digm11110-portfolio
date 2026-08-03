// Hartwood Ubud Bali photo carousel
// Add more image URLs to this array whenever you want more photos.
const carouselImages = [
  "images/carousel-1.jpg",
  "images/carousel-2.jpg",
  "images/carousel-3.jpg",
  "images/carousel-4.jpeg",
  "images/carousel-5.jpeg",
  "images/carousel-6.jpeg",
  "images/carousel-9.jpeg",
  "images/carousel-10.jpeg",
  "images/sGdNtrtf.jpeg",
  "images/tCVZAAUm.jpeg"
];

const carouselTrack=document.querySelector("#carousel-track");
const carouselDots=document.querySelector("#carousel-dots");
const carousel=document.querySelector(".carousel");
const nextButton=document.querySelector(".carousel-btn-next");
const prevButton=document.querySelector(".carousel-btn-prev");
let currentIndex=0;let autoplay;let touchStartX=0;let touchEndX=0;
function getSlidesPerView(){return window.matchMedia("(max-width: 900px)").matches?1:2}
function getMaxIndex(){return Math.max(0,carouselImages.length-getSlidesPerView())}
function buildCarousel(){carouselTrack.innerHTML="";carouselImages.forEach((imageUrl,index)=>{const slide=document.createElement("figure");slide.className="carousel-slide";const image=document.createElement("img");image.src=imageUrl;image.alt=`Hartwood Ubud Bali property photo ${index+1}`;image.loading="lazy";slide.appendChild(image);carouselTrack.appendChild(slide)});buildDots();updateCarousel()}
function buildDots(){carouselDots.innerHTML="";const dotCount=getMaxIndex()+1;for(let index=0;index<dotCount;index+=1){const dot=document.createElement("button");dot.className="carousel-dot";dot.type="button";dot.setAttribute("aria-label",`Go to carousel position ${index+1}`);dot.addEventListener("click",()=>{currentIndex=index;updateCarousel();restartAutoplay()});carouselDots.appendChild(dot)}}
function updateCarousel(){const slidesPerView=getSlidesPerView();const maxIndex=getMaxIndex();if(currentIndex>maxIndex){currentIndex=maxIndex}const slideWidth=100/slidesPerView;carouselTrack.style.transform=`translateX(-${currentIndex*slideWidth}%)`;const dots=carouselDots.querySelectorAll(".carousel-dot");dots.forEach((dot,index)=>{dot.classList.toggle("is-active",index===currentIndex);dot.setAttribute("aria-current",index===currentIndex?"true":"false")})}
function goToNextSlide(){const maxIndex=getMaxIndex();currentIndex=currentIndex>=maxIndex?0:currentIndex+1;updateCarousel()}
function goToPreviousSlide(){const maxIndex=getMaxIndex();currentIndex=currentIndex<=0?maxIndex:currentIndex-1;updateCarousel()}
function startAutoplay(){stopAutoplay();autoplay=setInterval(goToNextSlide,5000)}
function stopAutoplay(){clearInterval(autoplay)}
function restartAutoplay(){stopAutoplay();startAutoplay()}
nextButton.addEventListener("click",()=>{goToNextSlide();restartAutoplay()});prevButton.addEventListener("click",()=>{goToPreviousSlide();restartAutoplay()});carousel.addEventListener("mouseenter",stopAutoplay);carousel.addEventListener("mouseleave",startAutoplay);carousel.addEventListener("touchstart",event=>{stopAutoplay();touchStartX=event.changedTouches[0].screenX});carousel.addEventListener("touchend",event=>{touchEndX=event.changedTouches[0].screenX;handleSwipe();startAutoplay()});
function handleSwipe(){const swipeDistance=touchEndX-touchStartX;const minimumSwipeDistance=50;if(swipeDistance>minimumSwipeDistance){goToPreviousSlide()}if(swipeDistance<-minimumSwipeDistance){goToNextSlide()}}
window.addEventListener("resize",()=>{buildDots();updateCarousel()});

const header=document.querySelector(".site-header");
if(header){
  const toggleScrolledClass=()=>{header.classList.toggle("scrolled", window.scrollY > 10);};
  toggleScrolledClass();
  window.addEventListener("scroll", toggleScrolledClass, {passive:true});
}

const navToggle=document.querySelector(".nav-toggle");
const navLinks=document.querySelector(".nav-links");
if(navToggle && navLinks){
  navToggle.addEventListener("click",()=>{
    const isOpen=navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen.toString());
  });
}

const heroMobileSlide=document.querySelector(".hero-mobile-slide");
const heroMobileCarousel=document.querySelector(".hero-mobile-carousel");
let heroMobileIndex=0;
let heroMobileAutoplay;

const initHeroMobileCarousel=()=>{
  if(!heroMobileSlide || !heroMobileCarousel) return;

  const imageSources=[];
  const mainImage=document.querySelector(".hero-main-image img");
  const smallImages=document.querySelectorAll(".hero-small-grid img");

  if(mainImage?.src) imageSources.push(mainImage.src);
  smallImages.forEach(img=>{ if(img.src) imageSources.push(img.src); });

  if(!imageSources.length) return;

  const setHeroImage=index=>{
    heroMobileSlide.style.backgroundImage=`url(${imageSources[index]})`;
  };

  const nextHeroImage=()=>{
    heroMobileIndex=(heroMobileIndex+1)%imageSources.length;
    setHeroImage(heroMobileIndex);
  };

  const startHeroAutoplay=()=>{
    clearInterval(heroMobileAutoplay);
    heroMobileAutoplay=setInterval(nextHeroImage,5000);
  };

  setHeroImage(heroMobileIndex);
  startHeroAutoplay();

  window.addEventListener("resize",()=>{
    if(window.matchMedia("(max-width: 900px)").matches){
      heroMobileCarousel.style.display="block";
    } else {
      heroMobileCarousel.style.display="none";
    }
  });
};

initHeroMobileCarousel();

const initAmenitiesAccordion=()=>{
  const headings=document.querySelectorAll('.amenities-heading');
  headings.forEach(heading=>{
    const labelText=heading.textContent.trim();
    const button=document.createElement('button');
    button.type='button';
    button.className='amenities-toggle';
    button.innerHTML=`<span class="amenities-toggle-label">${labelText}</span><span class="amenities-arrow" aria-hidden="true">▼</span>`;
    heading.textContent='';
    heading.appendChild(button);
    heading.setAttribute('aria-expanded','false');

    const group=document.createElement('div');
    group.className='amenities-group';
    let next=heading.nextElementSibling;
    while(next && !next.classList.contains('amenities-heading')){
      const sibling=next;
      next=next.nextElementSibling;
      group.appendChild(sibling);
    }
    if(group.children.length){
      heading.parentNode.insertBefore(group, heading.nextElementSibling);
      const toggleSection=()=>{
        const isOpen=heading.classList.toggle('open');
        heading.setAttribute('aria-expanded', isOpen.toString());
        button.querySelector('.amenities-arrow').textContent=isOpen?'▲':'▼';
        if(isOpen){
          group.style.maxHeight=`${group.scrollHeight}px`;
          group.style.opacity='1';
        } else {
          group.style.maxHeight='0px';
          group.style.opacity='0';
        }
      };
      button.addEventListener('click',toggleSection);
      const isMobile=window.matchMedia('(max-width: 900px)').matches;
      if(isMobile){
        group.style.maxHeight='0px';
        group.style.opacity='0';
        heading.classList.remove('open');
        button.querySelector('.amenities-arrow').textContent='▼';
      } else {
        heading.classList.add('open');
        heading.setAttribute('aria-expanded','true');
        button.querySelector('.amenities-arrow').textContent='▲';
        group.style.maxHeight='none';
        group.style.opacity='1';
      }
      window.addEventListener('resize',()=>{
        const mobile=window.matchMedia('(max-width: 900px)').matches;
        if(mobile){
          if(!heading.classList.contains('open')){
            group.style.maxHeight='0px';
            group.style.opacity='0';
            button.querySelector('.amenities-arrow').textContent='▼';
          }
        } else {
          heading.classList.add('open');
          heading.setAttribute('aria-expanded','true');
          button.querySelector('.amenities-arrow').textContent='▲';
          group.style.maxHeight='none';
          group.style.opacity='1';
        }
      });
    }
  });
};

initAmenitiesAccordion();

buildCarousel();startAutoplay();
