function CartSummary(items) {
    this._items = items;
};

CartSummary.prototype.getSubtotal = function () {
    if(this._items.length){
        return this._items.reduce(function(subtotal, item){
            subtotal += (item.quantity * item.price);
            return subtotal;
        }, 0);
    }
    return 0;
};

CartSummary.prototype.getTax = function(){
    tax.calculate(this.getSubtotal(), state, function(){
        done(taxInfo.amount);
    });
};

module.exports = CartSummary;