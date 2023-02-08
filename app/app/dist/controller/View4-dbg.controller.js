sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
  ],
  function (BaseController, MessageBox, JSONModel) {
    "use strict";

    return BaseController.extend("app.controller.View4", {
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
        var k = true;

        if (k) {
          this.Context= this.getView().byId("_IDGenSimpleForm1").bindContext({
            path: 'authors>/Authors(ID=150)',
            parameters: {
              $$updateGroupId: 'peopleGroupAdmin'
            }
          })
        } else {
          var authorsLocal = new JSONModel();
          var data = { ID: null, name: '' };
          authorsLocal.setData(data);
          this.getView().byId("_IDGenSimpleForms1").setModel(authorsLocal, 'authorsLocal');
        }


      },



      

      onChangeName:function(oEvt){
        // var context = oEvt.getSource().getBindingContext("authors");
        // context.setProperty("name",oEvt.getParameter('value'));
      },
      onSubmit: function () {
        var model = this.getOwnerComponent().getModel("authors");
        // var obj = this.getView().byId("_IDGenSimpleForms1").getModel("authorsLocal").getData();
        // var contentBonus = oDataModel.bindList(`/Authors`);
        // contentBonus.create(obj);
        model.submitBatch("peopleGroupAdmin").then(()=>{

        }).catch(()=>{
          debugger
        });
      },
      openNameDialog: function () {
        if (!this.pDialog) {
            this.pDialog = this.loadFragment({
                name: "app.fragments.ValueHelp",

            })
        };
        this.pDialog.then((oDialog) => {
            this.myDialog = oDialog;
            // this.myDialog.setModel('localModelFra', localModelFra);
            // this.myDialog = oDialog;
            this.myDialog.open();
        });
    },

    onDialogClose:function(oEvent){
      var aContexts = oEvent.getParameter("selectedContexts");
      
    }



    });
  }
);
