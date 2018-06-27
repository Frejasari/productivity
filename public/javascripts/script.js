$(document).ready(function() {
  let startDatePicker = document.getElementById("project-start-date");
  if (startDatePicker) startDatePicker.value = new Date().toDateInputValue();
});

Date.prototype.toDateInputValue = function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};
