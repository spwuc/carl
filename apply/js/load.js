var Loader = function () {
    this.images = {};
    this.imgLen = 0;
    this.audios = {};
    this.cont = -1;
    var _this = this;

    this.check = setInterval(function () {
        if (_this.cont >= _this.imgLen) {
            clearInterval(_this.check)
            _this.imageLoaderComplete();
        }
    }, 50)
}

Loader.prototype.lodImage = function (id, src) {
    var img = new Image();
    img.src = src;
    this.images[id] = img;
    var _this = this;
    img.onload = function () {
        _this.imgLen++;
        _this.images[id] = img;
        _this.imageLoaderProgress(_this.cont, _this.imgLen );
    }
}
Loader.prototype.lodImages = function (arr) {
    this.cont = arr.length;
    for (var i = 0; i < arr.length; i++) {
        this.lodImage(arr[i].id, arr[i].src)
    }
}
Loader.prototype.complete = function (fn) {
    this.imageLoaderComplete = fn;
}
Loader.prototype.addProgressListener = function (fn) {
    this.imageLoaderProgress = fn;
}
