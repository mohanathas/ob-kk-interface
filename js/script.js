const meter = new Swiper('.meter', {
  slidesPerView: 3,
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  mousewheel: {
    enabled: false,
  },
  grabCursor: true,
  direction: "vertical",
  navigation: {
    prevEl: '.swiper-button-prev-lm',
    nextEl: '.swiper-button-next-lm'
  }
});

const centimeter = new Swiper('.centimeter', {
  loop: true,
  slidesPerView: 3,
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  mousewheel: {
    enabled: false,
  },
  grabCursor: true,
  direction: "vertical",
  navigation: {
    prevEl: '.swiper-button-prev-lcm',
    nextEl: '.swiper-button-next-lcm'
  }
});

localStorage.setItem("loopCount", 0)
localStorage.setItem("prevCentimeterValue", 0)

meter.on('slideChange', function() {
  var nextMeterSlide = meter.slides[meter.activeIndex + 1];
  var meterValue = nextMeterSlide.getAttribute('data-value') || 0;

  var nextCentimeterSlide = centimeter.slides[centimeter.activeIndex + 1];
  var centimeterValue = nextCentimeterSlide.getAttribute('data-value') || 0;

  var totalValue = parseInt(meterValue) + parseInt(centimeterValue) / 100;
  document.querySelector('#cable-length-value').value = totalValue.toFixed(2);

  if (meterValue == 20) {
    centimeter.slideToLoop(999);
  }

  if (meterValue == 20 && centimeterValue == 00) {
    document.querySelector('.centimeter').classList.add('swiper-disabled');
  } else {
    document.querySelector('.centimeter').classList.remove('swiper-disabled');
  }

  if (meterValue >= 1 || centimeterValue >= 10) {
    document.querySelector('.cable-length-outer').classList.add('length-setted');
  } else {
    document.querySelector('.cable-length-outer').classList.remove('length-setted');
  }
  if ((meterValue >= 1 && centimeterValue >= 00) || (meterValue == 0 && centimeterValue >= 00)) {
    document.querySelector('.confirm-cable-length').classList.remove('d-none');
    document.querySelector('.confirm-cable-length').classList.add('d-inline-block');
  } else {
    document.querySelector('.confirm-cable-length').classList.add('d-none');
    document.querySelector('.confirm-cable-length').classList.remove('d-inline-block');
  }
});

centimeter.on('slideChange', function() {
  var nextMeterSlide = meter.slides[meter.activeIndex + 1];
  var meterValue = nextMeterSlide.getAttribute('data-value') || 0;

  var nextCentimeterSlide = centimeter.slides[centimeter.activeIndex + 1];
  var centimeterValue = nextCentimeterSlide.getAttribute('data-value') || 0;

  var totalValue = parseInt(meterValue) + parseInt(centimeterValue) / 100;
  document.querySelector('#cable-length-value').value = totalValue.toFixed(2);

  if (meterValue == 20 && centimeterValue == 00) {
    document.querySelector('.centimeter').classList.add('swiper-disabled');
  } else {
    document.querySelector('.centimeter').classList.remove('swiper-disabled');
  }

  if (meterValue >= 1 || centimeterValue >= 10) {
    document.querySelector('.cable-length-outer').classList.add('length-setted');
  } else {
    document.querySelector('.cable-length-outer').classList.remove('length-setted');
  }
  if (meterValue == 20 && centimeterValue != 90) {
    centimeter.slideToLoop(999);
    document.querySelector('.centimeter').classList.add('swiper-disabled');
  }

  if (centimeterValue > 00) {
    document.querySelector('.confirm-cable-length').classList.remove('d-none');
    document.querySelector('.confirm-cable-length').classList.add('d-inline-block');
  } else {
    document.querySelector('.confirm-cable-length').classList.add('d-none');
    document.querySelector('.confirm-cable-length').classList.remove('d-inline-block');
  }

});

centimeter.on('slideChange', function() {
  var activeIndex = parseInt(centimeter.activeIndex, 10);
  var nextCentimeterSlide = centimeter.slides[activeIndex + 1];
  var centimeterValue = nextCentimeterSlide.getAttribute('data-value') || 0;

  var prevCentimeterValue = localStorage.getItem("prevCentimeterValue") || 0;
  var loopCount = Math.min(20, parseInt(localStorage.getItem("loopCount") || 0, 10));

  if (prevCentimeterValue === "90" && centimeterValue === "00") {
    loopCount += 1;
    localStorage.setItem("loopCount", loopCount);
    meter.slideTo(loopCount);
  }
  else if (prevCentimeterValue === "00" && centimeterValue === "90") {
    loopCount = Math.max(0, loopCount - 1);
    localStorage.setItem("loopCount", loopCount);
    meter.slideTo(loopCount);
  }
  localStorage.setItem("prevCentimeterValue", centimeterValue);

});

var storedPrevCentimeterValue = localStorage.getItem("prevCentimeterValue");
var storedLoopCount = localStorage.getItem("loopCount");

/*
if (storedPrevCentimeterValue && storedLoopCount) {
  meter.slideTo(storedLoopCount);
}*/

meter.on('slideChange', function() {
  var nextMeterSlide = meter.slides[meter.activeIndex + 1];
  var meterValue = nextMeterSlide.getAttribute('data-value') || 0;
  localStorage.setItem("loopCount", meterValue);
});




const connector1 = new Swiper('.connector1', {
  initialSlide: 0,
  loop: true,
  centeredSlides: false,
  slidesPerView: 1,
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  mousewheel: {
    enabled: false,
  },
  grabCursor: true,
  direction: "vertical",
  on: {
    slideChange: function() {
      var activeIndex = this.activeIndex;
      var activeSlide = this.slides[activeIndex];
      var value = activeSlide.getAttribute('data-value');
      if (value) {
        document.getElementById("connector-value1").innerHTML = value;
        document.querySelector(".cable-connector1-outer").classList.add("cable-selected");
        document.querySelector('.cable-full').classList.add('cable-nc-1');
      } else {
        document.getElementById("connector-value1").innerHTML = "Stecker 1 wählen";
        document.querySelector(".cable-connector1-outer").classList.remove("cable-selected");
        document.getElementById("connector-value1-price").innerHTML = "Nutzen Sie die Pfeiltasten";
        document.querySelector('.cable-full').classList.remove('cable-nc-1');
      }
    }
  },
  navigation: {
    prevEl: '.swiper-button-prev-c1',
    nextEl: '.swiper-button-next-c1'
  }
});

const connector2 = new Swiper('.connector2', {
  initialSlide: 0,
  loop: true,
  centeredSlides: false,
  slidesPerView: 1,
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  mousewheel: {
    enabled: false,
  },
  grabCursor: true,
  direction: "vertical",
  on: {
    slideChange: function() {
      var activeIndex = this.activeIndex;
      var activeSlide = this.slides[activeIndex];
      var value = activeSlide.getAttribute('data-value');
      if (value) {
        document.getElementById("connector-value2").innerHTML = value;
        document.querySelector(".cable-connector2-outer").classList.add("cable-selected");
        document.querySelector('.cable-full').classList.add('cable-nc-2');
      } else {
        document.getElementById("connector-value2").innerHTML = "Stecker 2 wählen";
        document.querySelector(".cable-connector2-outer").classList.remove("cable-selected");
        document.getElementById("connector-value2-price").innerHTML = "Nutzen Sie die Pfeiltasten";
        document.querySelector('.cable-full').classList.remove('cable-nc-2');
      }
      if (connector1.activeIndex == 0 && this.activeIndex == 0) {
        document.querySelector('.cable').classList.add('cable-loading');
      } else {
        document.querySelector('.cable').classList.remove('cable-loading');
      }
    }
  },
  navigation: {
    prevEl: '.swiper-button-prev-c2',
    nextEl: '.swiper-button-next-c2'
  }
});


const step1Button = document.querySelector('#step-1');
const step2Button = document.querySelector('#step-2');
const step3Button = document.querySelector('#step-3');


const step1Outer = document.querySelector('.step-1-outer');
const step2Outer = document.querySelector('.step-2-outer');
const step3Outer = document.querySelector('.step-3-outer');

const step1OuterEdit = document.querySelector('.cable-connector1-outer .edit');
const step3OuterEdit = document.querySelector('.cable-connector2-outer .edit');

step1Button.addEventListener('click', function() {
  step1Outer.classList.add('loading');
  setTimeout(function() {
    step1Outer.classList.add('rotated');
    step1Outer.classList.remove('loading');
  }, 1500);
});

step2Button.addEventListener('click', function() {
  step2Outer.classList.add('loading');
  setTimeout(function() {
    step2Outer.classList.add('rotated');
    step2Outer.classList.remove('loading');
  }, 1500);
});

step3Button.addEventListener('click', function() {
  step3Outer.classList.add('loading');
  setTimeout(function() {
    step3Outer.classList.add('rotated');
    step3Outer.classList.remove('loading');
  }, 1500);
});



const cableElements1 = document.querySelectorAll('.cable-connector1-outer .swiper-wrapper > div:not(.dummy) > .cable');
const cableElements2 = document.querySelectorAll('.cable-connector2-outer .swiper-wrapper > div:not(.dummy) > .cable');
const cableFull = document.querySelector('.cable-full');

cableElements1.forEach(function(cableElement) {

  const button = document.createElement('div');
  button.classList.add('add-cable-comp', 'btn', 'btn-outline', 'btn-dark', 'd-inline-block', 'd-lg-none');
  button.innerHTML = 'Stecker auswählen';

  button.addEventListener('click', function() {
    const step1Outer = cableElement.closest('.cable-connector1-outer');
    cableFull.classList.add('cable-nc-1-mobile');
    step1Outer.classList.add('rotated-active');
    step1OuterEdit.classList.remove('d-none');
    connector1.disable();
  });

  cableElement.appendChild(button);
});


const saveButton = document.querySelector('.confirm-cable-length');

saveButton.addEventListener('click', function() {

  const step2Outer = document.querySelector('.cable-length-outer');
  const editButton = document.querySelector('.edit-2');

  step2Outer.classList.add('rotated-active');
  cableLengthOuter.classList.add('cable-length-set');
  saveButton.classList.add('d-none');
  saveButton.classList.remove('d-inline-block');
  editButton.classList.remove('d-none');
  meter.disable();
  centimeter.disable();
});


cableElements2.forEach(function(cableElement) {
  const button = document.createElement('div');
  button.classList.add('add-cable-comp', 'btn', 'btn-outline', 'btn-dark', 'd-inline-block', 'd-lg-none');
  button.innerHTML = 'Stecker auswählen';

  button.addEventListener('click', function() {
    const step3Outer = cableElement.closest('.cable-connector2-outer');
    cableFull.classList.add('cable-nc-2-mobile');
    step3Outer.classList.add('rotated-active');
    step3OuterEdit.classList.remove('d-none');
    connector2.disable();
  });


  cableElement.appendChild(button);
});


const cableConnector1Outers = document.querySelectorAll('.cable-connector1-outer');
const cableLengthOuter = document.querySelector('.cable-length-outer');
const cableLengthOuterEdit = document.querySelector('.edit-2');
const cableConnector2Outers = document.querySelectorAll('.cable-connector2-outer');

cableConnector1Outers.forEach(function(cableConnector1Outer) {
  const editElement = cableConnector1Outer.querySelector('.edit');
  editElement.addEventListener('click', function() {
    cableConnector1Outer.classList.remove('rotated-active');
    step1OuterEdit.classList.add('d-none');
    cableFull.classList.remove('cable-nc-1-mobile');
    connector1.enable();
  });
});

  cableLengthOuterEdit.addEventListener('click', function() {
    cableLengthOuter.classList.remove('rotated-active');
    cableLengthOuter.classList.remove('cable-length-set');
    this.classList.add('d-none');
    meter.enable();
    centimeter.enable();
    saveButton.classList.add('d-inline-block');
  });


cableConnector2Outers.forEach(function(cableConnector2Outer) {
  const editElement = cableConnector2Outer.querySelector('.edit');
  editElement.addEventListener('click', function() {
    cableConnector2Outer.classList.remove('rotated-active');
    cableFull.classList.remove('cable-nc-2-mobile');
    step3OuterEdit.classList.add('d-none');
    connector2.enable();
  });
});

window.onload = function() {
  meter.slideNext();
};