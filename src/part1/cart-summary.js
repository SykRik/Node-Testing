var tax = require('./tax');

function CartSummary(items) {
	this._items = items;
}

CartSummary.prototype.getSubtotal = function () {
	if (this._items.length) {
		return this._items.reduce(function (subtotal, item) {
			return subtotal += (item.quantity * item.price);
		}, 0);
	}

	return 0;
};

CartSummary.prototype.getTax = function (state, done) {
    if (done == null)
        done = function () { };

	tax.calculate(this.getSubtotal(), state, function (taxInfo) {
		done(taxInfo.amount);
	});
};


function fakeRequestLogin(username, pass, callback) {
	setTimeout(function () {
		if (username == "admin" && pass == "admin")
			return callback(true , {"name": "admin"})
		return callback(false)
	}, 50)
}

CartSummary.prototype.login = function (username, pass, onDone) {
	if (onDone == null)
		onDone = function () { }

	
	if(username == null || pass == null)
		return onDone(400, "Missing Username Pass")

	var onRequestDone = function(loginRes, data) {
		if(loginRes) {
			return onDone(null, null)
		} else
			return onDone(409, "Wrong User Name Pass")

	}

	fakeRequestLogin(username, pass, onRequestDone)
}

module.exports = CartSummary;