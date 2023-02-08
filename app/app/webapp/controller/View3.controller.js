sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/message/MessageModel",
    "sap/m/MessagePopover",
    "sap/m/MessageItem",
    'sap/ui/core/Core',
    "sap/ui/model/json/JSONModel"
  ],
  function (BaseController, MessageBox, MessageModel, MessagePopover, MessageItem, Core,JSONModel) {
    "use strict";

    return BaseController.extend("app.controller.View3", {
      onInit() {
        var oMessageManager = sap.ui.getCore().getMessageManager(),
          oMessageModel = oMessageManager.getMessageModel(),
          oMessageModelBinding = oMessageModel.bindList("/", undefined, []);
          oMessageModelBinding.attachChange(this.onMessageBindingChange, this);
          
          
          this._bTechnicalErrors = false;
          this.getView().setModel(oMessageModel, "message");

      },

      onMessageBindingChange: function (oEvent) {
        var aContexts = oEvent.getSource().getContexts(),
          aMessages,
          bMessageOpen = false;

        if (bMessageOpen || !aContexts.length) {
          return;
        }

        // Extract and remove the technical messages
        aMessages = aContexts.map(function (oContext) {
          return oContext.getObject();
        });
        sap.ui.getCore().getMessageManager().removeMessages(aMessages);

        // this._setUIChanges(true);
        this._bTechnicalErrors = true;
        MessageBox.error(aMessages[0].message, {
          id: "serviceErrorMessageBox",
          onClose: function () {
            bMessageOpen = false;
          }
        });

        bMessageOpen = true;
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

      onChangeName:function(oEvt){
        var context = oEvt.getSource().getBindingContext("authors");
        context.setProperty("name",oEvt.getParameter('value'));
      },

      onItemCreateBonus: function () {
        var oSelected = this.byId("idParamTableView43").getBinding("items");
        var oDataModel = this.byId("idParamTableView43").getModel("authors");
        var obj = {};
        obj.ID = 300;
        obj.name = "Av1";
        obj.value = "500";
        var obj2 = {};
        obj2.ID = 301;
        obj2.name = "Av2";
        obj2.value = "400";
        Promise.all([oSelected.create(obj),oSelected.create(obj2)])

        // .then(() => {
        //   MessageBox.success('updated');
        // }).catch((error) => {
        //   MessageBox.error(error.message)
        // });
        //  oDataModel.submitBatch('peopleGroupAdmin');
      },

      onItemUpdateBnus: function () {
        var oSelected = this.byId("idParamTableView43").getSelectedItem();
        var oDataModel = this.byId("idParamTableView43").getModel("authors");
        Promise.all([oSelected.getBindingContext("authors").setProperty("name", 'AvN')]);
        Promise.all([oSelected.getBindingContext("authors").setProperty("value", "200000")]);
        


        
        // .then(() => {
        //   MessageBox.success('updated');
        // }).catch((error) => {
        //   MessageBox.error(error.message)
        // });

        
      },


      onItemDeleteBon:function(){
        var oSelected = this.byId("idParamTableView43").getSelectedItems();
        oSelected.forEach((con)=>{
          con.getBindingContext("authors").delete();
        })
        
      },

      metaDataHandler:function(oEvent){
        var localModelFra = new JSONModel({ name: ''});
        this.getView().setModel(localModelFra,'localModelFra')
        oEvent.getSource().getDependents()[0].open();
      },


      Save: function () {
        var context = this.getView().byId("_IDGenInput3").getBindingContext("authors");
        var val = this.getView().byId("_IDGenInput3").getValue();
        context.setProperty("name",val);
        var oDataModel = this.byId("idParamTableView3").getModel("authors");
        oDataModel.submitBatch('peopleGroupAdmin').then((data)=>{
          window.alert('error')
        }).catch((eee)=>{

        });
   

      },
      revertChanges : function(){
        var oDataModel = this.byId("idParamTableView3").getModel("authors");
        oDataModel.resetChanges("peopleGroupAdmin");
      },
      CreationChecks:function(){
        
        var oSelected = this.byId("idParamTableView43").getBinding("items");
        var objParam = this.getView().getModel("localModelFra").getData();
        oSelected.create(objParam)
      }

    });
  }
);
