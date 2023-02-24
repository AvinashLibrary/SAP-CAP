sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        dsds: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
