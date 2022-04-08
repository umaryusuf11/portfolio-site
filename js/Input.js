/* Input Fields */
$("input, textarea").change(function () {
  if ($(this).val() != "") {
    $(this).parent().addClass("filled");
  } else {
    $(this).parent().removeClass("filled");
  }
});

class InputManager {
  constructor(input) {
    this.input = $(input);
    this.input.change(function () {
      if ($(this).val() != "") {
        $(this).parent().addClass("filled");
      } else {
        $(this).parent().removeClass("filled");
      }
    });

    this.name = this.input.attr("name");
  }

  showError(message) {
    this.input.parent().addClass("error");
  }

  hideError() {
    this.input.parent().removeClass("error");
  }

  setError(message) {
    this.input.siblings(".error").children("span").text(message);
    this.showError(message);
  }

  clearError() {
    this.hideError();
    this.input
      .siblings(".error")
      .children("span")
      .text("Oops, there has been an issue somewhere.");
  }

  setRequired() {
    this.input.attr("required", true);
    var im = this;
    this.input.change(function () {
      if (im.getValue() == "") {
        im.setError("Sorry, this field is required.");
      } else {
        im.clearError();
      }
    });
  }

  getElement() {
    return this.input;
  }

  getValue() {
    return this.input.val();
  }

  setValue(value) {
    this.input.val(value);
  }

  clearValue() {
    this.setValue("");
  }

  _returnTrue() {
    return true;
  }
}
