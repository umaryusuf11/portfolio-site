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

class ComponentGenerator {
  constructor() {
    this.alerts = _alerts;
  }
}
