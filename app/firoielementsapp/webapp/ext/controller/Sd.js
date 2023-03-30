sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        ff: function(oEvent) {
            this.getOwnerComponent().getRouter().navTo('RouteView2');
        }
    };
});
