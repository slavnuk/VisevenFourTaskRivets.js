class ImagesViewModel {
    constructor(images){
        this.images = images
        this.prevImage = null
        let index = Math.floor((images.length-1)/2)
        this._setActiveMainImage(index)
    }
    removeImage(event, data){
        let currentImage = data.imagesVM.currentImage
        let indexToRemove = data.imagesVM.images.indexOf(currentImage);
        data.imagesVM.images.splice(indexToRemove, 1)
        if(indexToRemove > 1)
            data.imagesVM._setActiveMainImage(indexToRemove-1)
        else
            data.imagesVM._setActiveMainImage(0)
    }
    nextImage(event, vm) {
        let indexToCurrent = vm.imagesVM.images.indexOf(vm.imagesVM.currentImage);
        let getRandom = () => {
            return Math.round(Math.random()*100)
        }

        if(vm.imagesVM.currentImage == vm.imagesVM.images[vm.imagesVM.images.length-1]){
            vm.imagesVM.loadAsync('https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=9c0b191a1d8415714a70a2a3db4abdeb&extras=url_m&text=sea')
                .then((data) => {
                    let randomImage = JSON.parse(data).photos.photo[getRandom()];
                    let count = vm.imagesVM.images.push({
                        "title": "Second Title",
                        "url": randomImage.url_m + '',
                        "email": "test@mail.com",
                        "rate": "neutrally"
                    });
                    vm.imagesVM._setActiveMainImage(count - 1)
                    vm.imagesVM.scrollEnd();
                });
        }
        else

            vm.imagesVM._setActiveMainImage(indexToCurrent + 1)

    }
    prewImage(event, vm){
        let indexToCurrent = vm.imagesVM.images.indexOf(vm.imagesVM.currentImage);
        if(indexToCurrent==0)
            indexToCurrent=vm.imagesVM.images.length;
            vm.imagesVM._setActiveMainImage(indexToCurrent - 1)
    }
    scrollEnd(){
        var parent = document.querySelector('.images'),
            img = document.querySelector('.border')
        img.classList.remove('border')
        //MEGA FIX
        setTimeout(()=>{
            img.classList.add("border")
            parent.scrollLeft = parent.scrollWidth

        },500)
    }
    _setActiveMainImage(index) {
        this.currentImage = this.images[index]
        this.images = this.images.map((image)=>{
            if (this.currentImage == image)
                image.active = true
            else
                image.active = false
            return image
        })
    }
    changeMainImage(event, data) {
        data.imagesVM._setActiveMainImage(data.index)
    }

    loadAsync (url) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();

            request.open('GET', url + ((/\?/).test(url) ? '&' : '?') + (new Date()).getTime(), true); // no-cache
            request.onload = function () {
                if (request.status === 200) {
                    resolve(request.response);
                } else {
                    reject(Error(request.statusText));
                }
            };

            request.onerror = function () {
                reject(Error('Network Error'));
            };
            request.send();
        });
    }
    addImage(event, vm){
        var valid1 = false;
        var valid2 = false;
        var valid3 = false;
        var self = this;
        var title = document.querySelector('input[name="title"]');
        var url = document.querySelector('input[name="url"]');
        var email = document.querySelector('input[name="email"]');
        var rate = document.querySelector('input[name="rate"]');

        if(title.value.length != 0){
            title.classList.remove('warn');valid1 = true;

        }else{
            title.classList.add('warn');valid1 = false;
        }
        if(url.length != 0 &&  /\.(jpe?g|png|gif|bmp)$/i.test(url.value) ){
            url.classList.remove('warn');
            valid2 = true;
        }
        else{
            url.classList.add('warn');valid2 = false;
        }
        if(email.length !=0 &&/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i.test(email.value)){
            email.classList.remove('warn');
            valid3 = true;
        }
        else{
            email.classList.add('warn'); valid3 = false;
        }

        if(valid1 && valid2 && valid3){
            let count = vm.imagesVM.images.push({
                title: title.value,
                url: url.value,
                email:email.value,
                rate:rate.value
            });
            Lib.saveJSON(this.images, function(){
                vm.imagesVM._setActiveMainImage(count - 1)
                vm.imagesVM.scrollEnd();


            });

        }
    }
    changeSmile(event) {
    slimey.className = ''
    slimey.classList.add("slimey-"+event.value);
}
}