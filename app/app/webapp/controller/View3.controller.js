sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
  ],
  function (BaseController, MessageBox) {
    "use strict";

    return BaseController.extend("app.controller.View3", {
      onInit() {
        
      },
      onAfterRendering:function(){
        // var authors = this.getOwnerComponent().getModel("authors");
        // this.getView().setModel(authors,"authors");
        this.getView().byId("_IDGenPage324424231").bindElement({
          path:'authors>/Authors(ID=150)',
          parameters: {
              $$updateGroupId : 'peopleGroupAdmin'
          }
        })
      },
      onItemUpdate:function(){
        var oSelected = this.byId("idParamTableView3").getSelectedItem();
        var oDataModel = this.byId("idParamTableView3").getModel("authors");
        Promise.all([oSelected.getBindingContext("authors").setProperty("title", 'alphasBetas')]).then(()=>{
            MessageBox.success('updated');
        }).catch((error)=>{
            MessageBox.error(error.message)
        });

        oDataModel.submitBatch('peopleGroupAdmin');
    }
      
    });
  }
);
