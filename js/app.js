(function(){

    const rootElement = document.querySelector('.slider');
    Lib.loadImages(function(data){
        let VM = {}
        VM.imagesVM = new ImagesViewModel(data)
        // slider.images = data;
        // slider.actualPosition = Math.floor((data.length-1)/2);
        // slider.printImages();
        // slider.changeMainImg();
        // slider.updateImages();
        //
        //
        // bindEvents();
        rivets.bind(rootElement,VM)

    });



})();
function changeSmile(event) {
    slimey.className = ''
    slimey.classList.add("slimey-"+event.value);
}


