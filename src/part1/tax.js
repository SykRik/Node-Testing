module.exports = {
  calculate: function(subtotal, state, done) {
      // implemented later or in parallel by our coworker
      setTimeout(function () {
        done({
          amount: 30
        });
      }, 0);    
  }
};