sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function(MessageToast,Fragment) {
    'use strict';

    return {
        completeSave: function(oEvent) {
            if (!this.pDialog) {
                this.pDialog = this.loadFragment({
                    name: "firoielementsapp.fragments.AddBonus",

                })
            };
            this.pDialog.then((oDialog) => {
                this.myDialog = oDialog;
                this.myDialog.open();
            });
        }
    };
});
