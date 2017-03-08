var Promise = function () {
    this.thens = [];
}
Promise.prototype.then = function (Resolved) {
    this.thens.push(Resolved)
    return this;
}
Promise.prototype.resoved = function (n) {
    var next = this.thens.shift();
    if (next) {
        var prms = next.apply(null, arguments);
        prms instanceof Promise && (prms.thens = this.thens)
    }
}


function doKeyframes(element, flipName, flipTime) {
    var promise = new Promise();
    if (!element) {
        return;
    }
    element.style.webkitAnimation = "" + flipName + " " + flipTime;
    var fn = function () {
        element.style.webkitAnimation = "";
        element.removeEventListener("webkitAnimationEnd", fn);
        promise.resoved();
    }
    element.addEventListener("webkitAnimationEnd", fn);
    return promise;
};
