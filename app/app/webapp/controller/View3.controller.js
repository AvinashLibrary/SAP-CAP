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
      onAfterRendering: function () {
        // var authors = this.getOwnerComponent().getModel("authors");
        // this.getView().setModel(authors,"authors");
        this.getView().byId("_IDGenPage324424231").bindElement({
          path: 'authors>/Authors(ID=150)',
          parameters: {
            $$updateGroupId: 'peopleGroupAdmin'
          }
        })
      },
      onItemUpdate: function () {
        var oSelected = this.byId("idParamTableView3").getSelectedItem();
        var oDataModel = this.byId("idParamTableView3").getModel("authors");
        Promise.all([oSelected.getBindingContext("authors").setProperty("title", 'alphasBetas')]).then(() => {
          MessageBox.success('updated');
        }).catch((error) => {
          MessageBox.error(error.message)
        });

        // oDataModel.submitBatch('peopleGroupAdmin');
      }, 
      onItemCreate: function () {
        var oSelected = this.byId("idParamTableView3").getBinding("items");
        var oDataModel = this.byId("idParamTableView3").getModel("authors");
        var obj = {};
        obj.ID = 300;
        obj.stock = 30;
        obj.title = "Avinash";
        Promise.all([oSelected.create(obj)]).then(() => {
          MessageBox.success('updated');
        }).catch((error) => {
          MessageBox.error(error.message)
        });
        //  oDataModel.submitBatch('peopleGroupAdmin');
      },
      onItemDelete: function () {
        var oSelected = this.byId("idParamTableView3").getSelectedItem();
        var oDataModel = this.byId("idParamTableView3").getModel("authors");
        oSelected.getBindingContext("authors").delete().then(function () {
            MessageBox.success("Deleted content");
        }.bind(this), function (oError) {
            MessageBox.error(oError.message);
        });
        // oDataModel.submitBatch('peopleGroupAdmin');
    },

    onItemCreateBonus: function () {
      var oSelected = this.byId("idParamTableView43").getBinding("items");
      var oDataModel = this.byId("idParamTableView43").getModel("authors");
      var obj = {};
      obj.ID = 300;
      obj.name = "Avi";
      Promise.all([oSelected.create(obj)]).then(() => {
        MessageBox.success('updated');
      }).catch((error) => {
        MessageBox.error(error.message)
      });
      //  oDataModel.submitBatch('peopleGroupAdmin');
    },

    onItemUpdateBnus: function () {
      var oSelected = this.byId("idParamTableView3").getSelectedItem();
      var oDataModel = this.byId("idParamTableView3").getModel("authors");
      Promise.all([oSelected.getBindingContext("authors").setProperty("name", 'Av1')]).then(() => {
        MessageBox.success('updated');
      }).catch((error) => {
        MessageBox.error(error.message)
      });

      // oDataModel.submitBatch('peopleGroupAdmin');
    }, 


    Save:function(){
      var oDataModel = this.byId("idParamTableView3").getModel("authors");
       oDataModel.submitBatch('peopleGroupAdmin');
    }

    });
  }
);
