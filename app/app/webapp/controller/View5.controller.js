sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
  ],
  function (BaseController, MessageBox) {
    "use strict";

    return BaseController.extend("app.controller.App", {
      onInit() {
        // var model = this.getOwnerComponent().getModel();
        // var oList = model.bindList("/Books");

        // oList.requestContexts(2, 10).then(function (aContexts) {
        //   aContexts.forEach(function (oContext) {
        //     debugger

        //   });

        // });
      }
      
    });
  }
);
