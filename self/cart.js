// 购物车对象
function Cart() {
    this.Count = 0; // 总数量
    this.Total = 0; // 总金额
    this.Items = new Array(); // 商品集合
};
//商品对象
function CartItem() {
    this.gid = 0; //商品唯一编号
    this.price = 0; // 商品单价
    this.buyPeriod = 0; //预购总期数
    this.times = 0; // 购买人次
    this.type = 1; // 1、云购   2、预购    3、全够    4、免税（单独购物车）  （3、4 必选地址）
    this.freight = 0; //运费
};
/*
 * 购物车操作 购物车localStorage名称
 */
var CartHelper = function() {
    this.cookieName = "wx_cart";
    //加载服务器端的
    this.load = function() {
        var cart = new Cart();
        this.save(cart);
        return cart;
    };
    // 清空购物车
    this.clear = function() {
        var cart = new Cart();
        this.save(cart);
        return cart;
    };
    //购物车初始化（非购物车也面 设置购物车图标的数字）
    this.init = function() {};
    //向购物车添加新商品
    this.add = function(cartItem) {
        var cart = this.read();
        var index = this.find(cartItem.gid, cartItem.type);
        // 如果ID已存在，覆盖数量(先去掉该商品当前的总金额、重新计算商品数量、重新根据商品数量计算总金额)
        //单商品总价=云购次数*云购单价*预购期数+运费
        //预购 1期 = 本期加+另外一起 
        if (index > -1) {
            if (parseInt(cartItem.type) < 3) { //云购
                cart.Total -= ((((cart.Items[index].times * 100) * (cart.Items[index].price * 100)) / 10000) * (cart.Items[index].buyPeriod)) + cart.Items[index].freight; //
                cart.Items[index].times += parseInt(cartItem.times); // 同一商品数量相加
                cart.Total += ((((cart.Items[index].times * 100) * (cart.Items[index].price * 100)) / 10000) * (cart.Items[index].buyPeriod)) + cart.Items[index].freight;
            }
        } else {
            cart.Items.push(cartItem);
            cart.Count++;
            cart.Total += ((((parseInt(cartItem.times) * 100) * (parseInt(cartItem.price) * 100)) / 10000) * (cartItem.buyPeriod)) + cartItem.freight;
        }
        this.save(cart);
        return cart;
    };
    // 改变购买人次（商品代码，改变后的商品数量）
    this.changeTimes = function(gid, times, type) {
        var cart = this.read();
        var index = this.find(gid, type);
        //统计总金额
        cart.Total -= ((((cart.Items[index].times * 100) * (cart.Items[index].price * 100)) / 10000) * (cart.Items[index].buyPeriod)) + cart.Items[index].freight; //
        cart.Items[index].times = times;
        cart.Total += ((((cart.Items[index].times * 100) * (cart.Items[index].price * 100)) / 10000) * (cart.Items[index].buyPeriod)) + cart.Items[index].freight;
        this.save(cart);
        cart = this.read(); //重新读取cart 用于获取计算后的商品中数量和总金额
        return cart;
    };
    // 改变预购期数
    this.changeBuyPeriod = function(gid, buyPeriod, type) {
        var cart = this.read();
        var index = this.find(gid, type);
        //统计总金额
        cart.Total -= ((((cart.Items[index].times * 100) * (cart.Items[index].price * 100)) / 10000) * (cart.Items[index].buyPeriod)) + cart.Items[index].freight; //
        cart.Items[index].buyPeriod = buyPeriod;
        cart.Total += ((((cart.Items[index].times * 100) * (cart.Items[index].price * 100)) / 10000) * (cart.Items[index].buyPeriod)) + cart.Items[index].freight;
        this.save(cart);
        cart = this.read(); //重新读取cart 用于获取计算后的商品中数量和总金额
        return cart;
    };
    // 移出购物车
    this.remove = function(gid, type) {
        var cart = this.read();
        var index = this.find(gid, type);
        if (index > -1) {
            var item = cart.Items[index];
            cart.Count--;
            cart.Total = cart.Total - ((((item.times * 100) * (item.price * 100)) / 10000) * (item.buyPeriod)) - item.freight;
            cart.Items.splice(index, 1);
            this.save(cart);
        }
        return cart;
    };
    // 根据ID查找
    this.find = function(gid, type) {
        var cart = this.read();
        var index = -1;
        for (var i = 0; i < cart.Items.length; i++) {
            if (cart.Items[i].gid == gid && cart.Items[i].type == type) {
                index = i;
                break;
            }
        }
        return index;
    };
    // localStorage操作
    this.save = function(cart) {
        // 把items转成Json
        var source = this.toJson(cart);
        localStorage.wx_cart=source;
    };
    // 读取购物车对象
    this.read = function() {
        // 读取localStorage中的购物车对象 cart
        var source = localStorage.wx_cart;
        var cart = new Cart();
        if (source == null || source == "") {
            return cart;
        }
        // 把json 转成购物车对象
        cart = this.toCart($.parseJSON(source));
        return cart;
    };
    // 把商品集合转换成json 字符串 如果出错，请检查 值是否为空了
    this.toJson = function(cart) {
        var items = cart.Items;
        var jsons = "{\"items\": [";
        for (var i = 0; i < items.length; i++) {
            if (i > 0) {
                jsons += ",";
            }
            var item = items[i];
            jsons += "{\"gid\":" + item.gid + "," + "\"price\":" + item.price + "," + "\"buyPeriod\":" + item.buyPeriod + "," + "\"times\":" + item.times + "," + "\"type\":" + item.type + "," + "\"freight\":" + item.freight + " }";
        }
        jsons += " ],\"Count\":" + cart.Count + ",\"Total\":" + cart.Total + "}";
        return jsons;
    };
    // 把商品集合转换成json 字符串 如果出错，请检查 值是否为空了
    this.toPayJson = function(cart) {
        var items = cart.Items;
        var jsons = "[";
        for (var i = 0; i < items.length; i++) {
            if (i > 0) {
                jsons += ",";
            }
            var item = items[i];
            jsons += "{\"buyPeriod\":" + item.buyPeriod + "," + "\"gid\":" + item.gid + "," + "\"buyTimes\":" + item.times + "}";
        }
        jsons += "]";
        return jsons;
    };
    // 把json字符串转成 购物车对象
    this.toCart = function(json) {
        var cart = new Cart();
        // 获取购物车 商品集合
        var items = json.items;
        if (items == null) {
            return cart;
        }
        for (var i = 0; i < items.length; i++) {
            var item = items[i]; // 获取商品对象
            var cartItem = new CartItem(); // 实例化购物车商品对象 并赋值
            cartItem.gid = item.gid;
            cartItem.price = item.price;
            cartItem.buyPeriod = item.buyPeriod; //参与期数
            cartItem.times = item.times; // 数量转文本
            cartItem.type = item.type;
            cartItem.freight = item.freight;
            // 保存商品对象至购物车
            cart.Items.push(cartItem);
            // 计算商品总金额
            cart.Total += ((((cartItem.times * 100) * (cartItem.price * 100)) / 10000) * (cartItem.buyPeriod)) + cartItem.freight;
            // 计算商品总数量
            cart.Count++;
        }
        return cart;
    };
};