// from https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
$("input[data-type='phone']").on({
  keyup: function () {
    formatPhoneNumber($(this));
  },
});

function formatPhoneNumber(phoneNumberString) {
  var cleaned = ("" + phoneNumberString.val()).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    phoneNumberString.val("(" + match[1] + ") " + match[2] + "-" + match[3]);
  }
  return null;
}
