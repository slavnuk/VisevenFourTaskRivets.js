var Lib = (function(){

    function getImages(cb){
        var xml = new XMLHttpRequest();
        var data;
        xml.open('GET', 'data/data.json', true);
        xml.onreadystatechange = function(){
            var json;
            if(xml.readyState === 4){

                try{
                    data = JSON.parse(this.responseText);
                }
                catch(e){
                    console.log(e);
                }
                cb(data);
            }
        };
        xml.send();
    }
    function saveJSON(data, cb){
        var xml = new XMLHttpRequest();
        xml.open('POST', 'savejson', true);
        xml.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xml.onreadystatechange = function(){
            if(xml.readyState === 4 && this.status === 200){

                cb(this.responseText);
            }
        };
        xml.send(JSON.stringify(data));
    }

    return {
        loadImages: getImages,
        saveJSON: saveJSON
    }
})();