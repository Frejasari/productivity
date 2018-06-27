$(document).ready(function() {
  let startDatePicker = $("#project-start-date");
  let createNewProjectButton = $(".new-project");
  let overlayContainer = $("#overlay-container");

  createNewProjectButton.click(() => {
    overlayContainer.css("display", "flex");
    $("#new-project-container").show();
  });

  overlayContainer.click(function(e) {
    if (e.target === this) {
      overlayContainer.hide();
      $("#new-project-container").hide();
      // overlayContainer.children().hide(); WHY IS IT NOT WORKING?
    }
  });

  if (startDatePicker) startDatePicker.val(new Date().toDateInputValue());
});

Date.prototype.toDateInputValue = function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};
