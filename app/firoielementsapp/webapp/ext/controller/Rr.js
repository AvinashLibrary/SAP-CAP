sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        rr: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
