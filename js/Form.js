/* Forms */
class FormManager {
  constructor(form) {
    this.form = $(form);
    this.action = this.form.attr("action");
    this.method = this.form.attr("method");
    this.inputs = this._generateInputManagers(this.form);
    this.submitButton = this.form.find("button[type=submit]");
  }

  clear() {
    this.inputs.forEach((input) => {
      input.clearValue();
      input.clearError();
    });
  }

  validate() {
    var valid = true;
    this.inputs.forEach((input) => {
      if (
        input.getElement().attr("required") == "required" &&
        input.getValue() == ""
      ) {
        input.setError("Sorry, this field is required.");
        valid = false;
      }
    });
    return valid;
  }

  async submit() {
    if (!this.validate()) {
      return {
        error: true,
        success: false,
        errorMessage: "Please fill out all required fields.",
      };
    }
    let values = this.getValues();
    try {
      let response = await $.ajax({
        url: this.action,
        method: this.method,
        data: values,
        dataType: "json",
      });

      return {
        success: true,
        error: false,
        response: response,
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  getValues() {
    let values = {};
    this.inputs.forEach((input) => {
      values[input.name] = input.getValue();
    });
    return values;
  }

  _generateInputManagers(form) {
    let inputs = form.find("input, textarea");

    inputs = inputs.map(function (index, input) {
      return "#" + $(input).attr("id");
    });

    inputs = inputs.map(function (index, input) {
      return new InputManager(input);
    });

    /* Spread to get a normal array */
    return [...inputs];
  }
}
