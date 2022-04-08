/* Component Generation */
class ComponentGenerator {
  constructor() {
    this.alerts = _alerts;
  }
}

/* Alerts */
const _successAlert = function (message, duration) {
  let id = "success-alert-" + Math.floor(Math.random() * 1000000);
  let alert = `
    <div class="alert success" id="${id}">
        <div class="status-indicator"></div>
        <span>${message}</span>

        <script>
            /* wait 3s then destroy this */
            setTimeout(function() {
                $("#${id}").remove();
            }, ${duration});
        </script>
    </div>
    `;

  return alert;
};
const _errorAlert = function (message, duration) {
  let id = "error-alert-" + Math.floor(Math.random() * 1000000);
  let alert = `
    <div class="alert error" id="${id}">
        <div class="status-indicator"></div>
        <span>${message}</span>

        <script>
            /* wait 3s then destroy this */
            setTimeout(function() {
                $("#${id}").remove();
            }, ${duration});
        </script>
    </div>
    `;

  return alert;
};
const _warningAlert = function (message, duration) {
  let id = "warning-alert-" + Math.floor(Math.random() * 1000000);
  let alert = `
    <div class="alert warning" id="${id}">
        <div class="status-indicator"></div>
        <span>${message}</span>

        <script>
            /* wait 3s then destroy this */
            setTimeout(function() {
                $("#${id}").remove();
            }, ${duration});
        </script>
    </div>
    `;

  return alert;
};
const _infoAlert = function (message, duration) {
  let id = "info-alert-" + Math.floor(Math.random() * 1000000);
  let alert = `
    <div class="alert info" id="${id}">
        <div class="status-indicator"></div>
        <span>${message}</span>

        <script>
            /* wait 3s then destroy this */
            setTimeout(function() {
                $("#${id}").remove();
            }, ${duration});
        </script>
    </div>
    `;

  return alert;
};
const _alerts = {
  success: _successAlert,
  error: _errorAlert,
  warning: _warningAlert,
  info: _infoAlert,
};

const componentGenerator = new ComponentGenerator();
function showAlert(message, duration, type = "info") {
  const alertHolder = $("#alert-holder");
  var alert = "";

  if (type == "info") {
    alert = componentGenerator.alerts.info(message, duration);
  } else if (type == "error") {
    alert = componentGenerator.alerts.error(message, duration);
  } else if (type == "success") {
    alert = componentGenerator.alerts.success(message, duration);
  } else if (type == "warning") {
    alert = componentGenerator.alerts.warning(message, duration);
  }

  alertHolder.append(alert);
}

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
        crossDomain: true,
        headers: { "Access-Control-Allow-Origin": "*" },
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
    console.log(values);
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
