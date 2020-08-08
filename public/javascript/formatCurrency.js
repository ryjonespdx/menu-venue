// currency formatting from: https://codepen.io/559wade/pen/LRzEjj?editors=1000
$("input[data-type='currency']").on({
  keyup: function () {
    formatCurrency($(this));
  },
  blur: function () {
    formatCurrency($(this), "blur");
  },
});

function formatNumber(n) {
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side, and puts cursor back to proper position
  var input_val = input.val();

  if (input_val === "") {
    return;
  }

  var original_len = input_val.length;

  var caret_pos = input.prop("selectionStart");

  // check for decimal
  if (input_val.indexOf(".") >= 0) {
    var decimal_pos = input_val.indexOf(".");

    var dollars = input_val.substring(0, decimal_pos);
    var cents = input_val.substring(decimal_pos);

    dollars = formatNumber(dollars);
    cents = formatNumber(cents);

    if (blur === "blur") {
      cents += "00";
    }

    cents = cents.substring(0, 2);

    input_val = "$" + dollars + "." + cents;
  } else {
    input_val = formatNumber(input_val);
    input_val = "$" + input_val;

    if (blur === "blur") {
      input_val += ".00";
    }
  }

  input.val(input_val);

  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}
