$(document).ready(function() {
  let startDatePicker = $("#project-start-date");
  let createNewProjectButton = $(".new-project");
  let createNewPackageButton = $(".new-task-package");
  let createNewIdeaButton = $("#new-idea");
  let overlayContainer = $("#overlay-container");
  let addPackageButton = $("#add-new-package-btn");
  let toDoGroupInOverlay = $("#to-do-group");
  let closingX = $(".close-x");

  closingX.click(() => {
    closeOverlay();
  });

  createNewProjectButton.click(() => {
    overlayContainer.css("display", "flex");
    $("#new-project-container").show();
  });

  createNewIdeaButton.click(() => {
    overlayContainer.css("display", "flex");
    $("#new-idea-container").show();
  });

  createNewPackageButton.click(() => {
    overlayContainer.css("display", "flex");
    $("#new-package-container").show();
  });

  overlayContainer.click(function(e) {
    if (e.target === this) {
      closeOverlay();
    }
  });

  addPackageButton.click(function(e) {
    toDoGroupInOverlay.append(createToDoInputHTML(toDoGroupInOverlay.children().length + 1));
  });

  if (startDatePicker) startDatePicker.val(new Date().toDateInputValue());

  function closeOverlay() {
    overlayContainer.hide();
    $("#new-project-container").hide();
    $("#new-package-container").hide();
    $("#new-idea-container").hide();
    // overlayContainer.children().hide(); WHY IS IT NOT WORKING?
  }
});

Date.prototype.toDateInputValue = function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};

function createToDoInputHTML(childNr) {
  return `<div class="form-group">
  <label class="sr-only" for="todo-${childNr}">To-Do</label>
  <textarea class="form-control non-resize" id="todo-${childNr}" type="text" name="todo-${childNr}" placeholder="Go for a walk in the wild"
    ></textarea>
  </div>`;
}

// make textarea expand dynamically
/* (function(){
var measurer = $('<span>', {
  style: "display:inline-block;word-break:break-word;visibility:hidden;white-space:pre-wrap;"})
.appendTo('body');
function initMeasurerFor(textarea){
if(!textarea[0].originalOverflowY){
textarea[0].originalOverflowY = textarea.css("overflow-y");    
}  
var maxWidth = textarea.css("max-width");
measurer.text(textarea.text())
.css("max-width", maxWidth == "none" ? textarea.width() + "px" : maxWidth)
.css('font',textarea.css('font'))
.css('overflow-y', textarea.css('overflow-y'))
.css("max-height", textarea.css("max-height"))
.css("min-height", textarea.css("min-height"))
.css("min-width", textarea.css("min-width"))
.css("padding", textarea.css("padding"))
.css("border", textarea.css("border"))
.css("box-sizing", textarea.css("box-sizing"))
}
function updateTextAreaSize(textarea){
textarea.height(measurer.height());
var w = measurer.width();
if(textarea[0].originalOverflowY == "auto"){
var mw = textarea.css("max-width");
if(mw != "none"){
if(w == parseInt(mw)){
textarea.css("overflow-y", "auto");
} else {
textarea.css("overflow-y", "hidden");
}
}
}
textarea.width(w + 2);
}
$('textarea.autofit').on({
input: function(){      
var text = $(this).val();  
if($(this).attr("preventEnter") == undefined){
text = text.replace(/[\n]/g, "<br>&#8203;");
}
measurer.html(text);                       
updateTextAreaSize($(this));       
},
focus: function(){
initMeasurerFor($(this));
},
keypress: function(e){
if(e.which == 13 && $(this).attr("preventEnter") != undefined){
e.preventDefault();
}
}
});
})();*/
