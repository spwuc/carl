var html = '<body unselectable="on" style="-moz-user-select:none;-webkit-user-select:none;" onselectstart="return false;">'
            + '<div id="box">'
                + '<div id="shuru1">'
                    + '<div id="shuru"></div>'
                    + '<div id="shuru2"></div>'
               + ' </div>'

                + '<table width="190" border="0" align="center" cellpadding="0" cellspacing="4" id="biaod">'
                    + '<tr id="on">'
                        + '<td align="center" valign="middle">MC</td>'
                        + '<td align="center" valign="middle">MR</td>'
                        + '<td align="center" valign="middle">MS</td>'
                        + '<td align="center" valign="middle">M+</td>'
                        + '<td align="center" valign="middle">M-</td>'
                    + '</tr>'
                    + '<tr id="tw">'
                        + '<td align="center" valign="middle" onclick="test.aheadClear()">←</td>'
                        + '<td align="center" valign="middle" onclick="test.clearCe()">CE</td>'
                        + '<td align="center" valign="middle" onclick="test.clear()">C</td>'
                        + '<td align="center" valign="middle" onclick="test._negative()">±</td>'
                        + '<td align="center" valign="middle" onclick="test.operation(this.innerHTML)">√</td>'
                    + '</tr>'
                    + '<tr id="tr">'
                        + '<td align="center" valign="middle" onclick="test.setNum(this.innerHTML)">7</td>'
                        + '<td align="center" valign="middle" onclick="test.setNum(this.innerHTML)">8</td>'
                        + '<td align="center" valign="middle" onclick="test.setNum(this.innerHTML)">9</td>'
                        + '<td align="center" valign="middle" onclick="test.operation(this.innerHTML)">/</td>'
                        + '<td align="center" valign="middle" onclick="test.operation(this.innerHTML)">%</td>'
                    + '</tr>'
                    + '<tr id="th">'
                        + '<td align="center" valign="middle" onclick="test.setNum(this.innerHTML)">4</td>'
                        + '<td align="center" valign="middle" onclick="test.setNum(this.innerHTML)">5</td>'
                        + '<td align="center" valign="middle" onclick="test.setNum(this.innerHTML)">6</td>'
                        + '<td align="center" valign="middle" onclick="test.operation(this.innerHTML)">*</td>'
                        + '<td align="center" valign="middle" onclick="test.operation(this.innerHTML)">1/x</td>'
                    + '</tr>'
                    + '<tr id="fi">'
                        + '<td align="center" valign="middle" onclick="test.setNum(this.innerHTML)">1</td>'
                        + '<td align="center" valign="middle" onclick="test.setNum(this.innerHTML)">2</td>'
                        + '<td align="center" valign="middle" onclick="test.setNum(this.innerHTML)">3</td>'
                        + '<td align="center" valign="middle" onclick="test.operation(this.innerHTML)">-</td>'
                        + '<td rowspan="2" align="center" valign="middle" onclick="test.amount()" id="amount">=</td>'
                    + '</tr>'
                    + '<tr id="si">'
                        + '<td colspan="2" align="center" valign="middle" onclick="test.setNum(this.innerHTML)" id="zr">0</td>'
                        + '<td align="center" valign="middle" onclick="test.setNum(this.innerHTML)">.</td>'
                        + '<td align="center" valign="middle" onclick="test.operation(this.innerHTML)">+</td>'
                    + '</tr>'
                + '</table>'

            + '</div>'
        + '</body>';
var css = '<style>body, input, tr, td ,p{'
+ 'margin: 0;'
+ 'padding: 0;'
+ 'font-family:Arial;'
+ 'font-size:14px;'
+ '}'
+ '#box {'
    +'position:absolute;'
    +'top:0;'
    +'left:0;'
    + 'width:99%;'
    + 'height:99%;'
    + 'background: #dde7f3;'
    + '-moz-border-radius: 10px;'
    + '-webkit-border-radius: 10px;'
    + 'border-radius: 3px;'
    + 'border: 1px solid #013;'
    + 'overflow: hidden;'
+ '}'

+ '#shuru {'
    + 'height:25px;'
    + 'border: none;'
    + 'text-align:right;'
    + 'padding-right:5px;'
+ '}'
+ '#shuru1 {'
    + 'background: url(img/shurukuang.jpg)  repeat-x;'
    + 'width: 99%;'
    + 'margin-left:auto;'
    + 'margin-right:auto;'
    + 'margin-top:10px;'
    + 'font-size:25px;'
    +'font-weight:bold;'
    + 'font-family:Consolas;'
    +'-moz-border-radius: 10px;'
    +'-webkit-border-radius: 10px;'
    + 'border-radius: 3px;'
    + 'border: 1px solid #999;'
+ '}'
+ '#shuru2 {'
    + 'height: 25px;'
    + 'border: none;'
    + 'text-align:right;'
    + 'padding-right:5px;'
+ '}'

+ '#biaod {'
    + 'height: 187px;'
    + 'width:100%;'
    + 'margin-top:10px;'

+ '}'

+ '#biaod #on td {'
    + 'width:100px;'
+ '}'

+ '#biaod #on {'
    + 'background: url(img/bg4.jpg);'
+ '}'

+ '#biaod #tw,#biaod #tr,#biaod #th,#biaod #fi,#biaod #si {'
    + 'background: url(img/bg4.jpg);'
+ '}'
+ '#biaod #zr:hover {'
    + 'background: url(img/bj3.jpg);'
+ '}'

+ '#biaod #zr:active{'
    + 'background: url(img/bjj2.jpg);'
+ '}'
+ '#biaod #amount{'
   + ' background: url(img/bg4.jpg);'
+'}'
+ '#biaod #amount:hover {'
   + ' background: url(img/bj3.jpg);'
+ '}'

+ '#biaod #amount:active {'
    + 'background: url(img/bjj2.jpg);'
+ '}'

+ '#biaod td {'
    + 'border: 1px solid #999;'
    + 'cursor: pointer;'
    + 'min-height:10px;'
    + 'height:38px;'
    + '-moz-border-radius: 10px;'
    + '-webkit-border-radius: 10px;'
    + 'border-radius: 3px;'
+ '}'

+ '#biaod td:hover {'
   + ' background: url(img/bj3.jpg);'
+ '}'
+ '#biaod td:active {'
    + 'background: url(img/bjj2.jpg);'
+ '}'
+ '</style>';
document.write(html + css)
; (function () {
    var computerCounter = function () {
        this.onNum = 0;
        this.twNum = 0;
        this.result = 0;
        this.operator = null;
        this.tintroduce = document.getElementById('shuru2');
        this.tintroduce1 = document.getElementById('shuru');
        this.precmd = null;
        this.tintroduce.innerHTML = 0;
    }
    var p = computerCounter.prototype;
    //设置数字
    p.setNum = function (num) {
        if (this.precmd == 'EXC') {
            this.clear();
        }
        if (this.operator) {
            this.twNum += num.toString();
            this.tintroduce.innerHTML = Number(this.twNum);
        } else {
            this.onNum += num.toString();
            this.tintroduce.innerHTML = Number(this.onNum);
        }
        this.precmd = 'NUM';
    }
    //运算符号
    p.operation = function (operator) {
	if (this.precmd != 'EXC' && this.operator != null) {
            this.amount();
        }
        this.operator = operator;
        this.twNum = 0;
        this.tintroduce1.innerHTML = Number(this.onNum) + this.operator;
        this.precmd = 'OPE';
        if (this.operator === '√') {
            this._radical();
            this.onNum = this.result;
            this.precmd = 'EXC';
        }
        if (this.operator === '±') { this._negative(); }
        if (this.operator === '1/x') {
            this._fraction();
            this.tintroduce1.innerHTML = 'reciproc(' + Number(this.thNum) + ')';
        }
    }
    //点击等号
    p.amount = function () {
        if (this.operator === null) this.result = Number(this.onNum);
        //if (this.operator === '√') this._radical();
        if (this.operator === '+') this._add();
        if (this.operator === '-') this._subtract();
        if (this.operator === '*') this._multiply();
        if (this.operator === '/') this._divide();
        if (this.operator === '%') this._residue();
        this.onNum = this.result;
        this.tintroduce1.innerHTML = '';
        this.tintroduce.innerHTML = this.result;
        this.precmd = 'EXC';

    }
    //清空(CE键)
    p.clearCe = function () {
        if (this.operator) {
            this.twNum = 0;
        } else {
            this.onNum = 0;
        }
        this.tintroduce.innerHTML = 0;
    }
    //向前清除
    p.aheadClear = function () {
        this.rs = this.tintroduce.innerHTML.toString().slice(0, this.tintroduce.innerHTML.toString().length - 1);
        this.tintroduce.innerHTML = this.rs;
        if (this.operator) {
            this.twNum = this.rs;
        } else {
            this.onNum = this.rs;
        }
        if (this.tintroduce.innerHTML === '') {
            this.tintroduce.innerHTML = 0;
            this.rs = 0;
        }
    }
    //清空
    p.clear = function () {
        this.onNum = 0;
        this.twNum = 0;
        this.result = 0;
        this.tintroduce.innerHTML = 0;
        this.tintroduce1.innerHTML = '';
        this.operator = null;

    }
    //加法
    p._add = function () {
        this.result = Number(this.onNum) + Number(this.twNum);
    }
    //减法
    p._subtract = function () {
        this.result = this.onNum - this.twNum;
    }
    //乘法
    p._multiply = function () {
        this.result = this.onNum * this.twNum;
    }
    //除法
    p._divide = function () {
        this.result = this.onNum / this.twNum;
    }
    //求余数
    p._residue = function () {
        this.result = this.onNum % this.twNum;
    }
    //负数
    p._negative = function () {
        this.tintroduce.innerHTML = -this.result || -this.twNum || -this.onNum;
        if (this.tintroduce.innerHTML == -this.result) {
            this.result = -this.result;
        }
        if (this.tintroduce.innerHTML == -this.twNum) {
            this.twNum = -this.twNum;
        }
        if (this.tintroduce.innerHTML == -this.onNum) {
            this.onNum = -this.onNum;
        }
    }
    //求根号
    p._radical = function () {
        this.result = Math.sqrt(this.onNum);
        this.tintroduce.innerHTML = this.result;
    }
    //几分子几
    p._fraction = function () {
        this.tintroduce.innerHTML = 1 / Number(this.onNum);
        if (this.tintroduce.innerHTML == 1 / Number(this.onNum)) {
            this.thNum = this.onNum;
            this.onNum = 1 / Number(this.onNum);
        }
    }
    window.computerCounter = computerCounter;
}(window))
