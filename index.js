

const rootElement = document.querySelector('.slider');
const imageModel = {
    images:[
        {
            title:"sssss",
            url:"https://farm5.staticflickr.com/4219/34884600576_1b92220359.jpg"
        },
        {
            title:"sssss",
            url:"https://farm5.staticflickr.com/4219/34884600576_1b92220359.jpg"
        }

    ],
    actualPosition:0
}

rivets.configure({
    prefix: 'rv',
    rootInterface: '.',
    templateDelimiters: ['{', '}'],
    handler: function(target, event, binding){
        this.call(target, event, binding.view.models)
    }
})














const view = rivets.bind(rootElement,imageModel)
