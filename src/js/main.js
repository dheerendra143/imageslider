const imageSlider = {
    sliderWpRef: document.querySelector("#imageSliderWp"),
    nextBtnRef:  document.querySelector("#nextBtn"),
    prevBtnRef:  document.querySelector("#prevBtn"),
    slideWith: 200,
    sliderPosition: 0,
    slideCount: 5,

    init: function () {
        const _self = this;
        _self.loadImg();
        _self.addEventListener();
        _self.nextBtnRef.disabled = true;
    },
    addEventListener: function () {
        const _self = this;
        _self.nextBtnRef.addEventListener('click', (event) => { _self.nextBtnCall(event) });
        _self.prevBtnRef.addEventListener('click', (event) => { _self.prevBtnCall(event) })
    },
    prevBtnCall: function (event) {
        const _self = this;
        _self.nextBtnRef.disabled = false;
        let currentSlider = (Math.abs(_self.sliderPosition)) / _self.slideWith;
        if(currentSlider == (_self.slideCount - 2)) _self.prevBtnRef.disabled = true;
        if (currentSlider < (_self.slideCount - 1)) {
            _self.sliderPosition = (_self.sliderPosition - _self.slideWith);
            _self.sliderWpRef.style.transform = `translate(${_self.sliderPosition}px, 0px)`;
        } 
    },
    nextBtnCall: function (event) {
        const _self = this;
        _self.prevBtnRef.disabled = false;
        let currentSlider = (Math.abs(_self.sliderPosition)) / _self.slideWith;
        if(currentSlider == 1) _self.nextBtnRef.disabled = true;
        if (currentSlider > 0) {
            _self.sliderPosition = (_self.sliderPosition + _self.slideWith);
            _self.sliderWpRef.style.transform = `translate(${_self.sliderPosition}px, 0px)`;
        } 
    },
    getImgInfo: async function (id, no) {
        const API = `https://picsum.photos/v2/list?page=${id}&limit=${no}`
        return await fetch(API).then(res => res.json()).then(res => res)
    },
    loadImg: function () {
        const _self = this;
        let startId = Math.floor(Math.random() * 100);
        _self.getImgInfo(startId, _self.slideCount).then(list => {
            _self.setImgTemplateOnDOM(list)
        });
    },
    setImgTemplateOnDOM: function (imgList) {
        const _self = this;
        let imgTemplate = ``;
        for (let i in imgList) {
            imgTemplate += `<div class="image-slider__item">
            <p>${((+i)+1)}</p>
            <img src='${imgList[i].download_url}' alt='${imgList[i].author}' />
            <p>${imgList[i].author}</p>
            </div>
            `;
        }
        _self.sliderWpRef.innerHTML = imgTemplate;

    }
}

imageSlider.init();