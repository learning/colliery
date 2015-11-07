(function () {
    'use strict';

    var app = WinJS.Application;

    function shareHandler(eventObject) {
        var shareOperation = eventObject.detail.shareOperation;
        if (shareOperation.data.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.text)) {
            shareOperation.data.getTextAsync().done(function (text) {
                console.warn(text);
            }, function (e) {
                console.error(e);
            });
        }
    }

    app.onactivated = function (args) {
        if (args.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.shareTarget) {
            shareHandler(args);
        }
    };

    app.start();
})();