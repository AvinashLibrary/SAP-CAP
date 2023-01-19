sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "../model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, JSONModel, Fragment,formatter) {
        "use strict";

        return Controller.extend("app.controller.View1", {
            formatter: formatter,
            onInit: function () {
                var localModel = new JSONModel({ title: '', stock: '', ID: null });
                this.getView().setModel(localModel, 'localModel');
                var multiSaveModel = new JSONModel({ result: [] });
                this.getView().setModel(multiSaveModel, 'multiSaveModel');
                var localModelFra = new JSONModel({ title: '', stock: '', ID: null, image: null });
                this.getView().setModel(localModelFra,'localModelFra')


            },

            onAfterRendering: function () {
                var wizard = this.getView().byId("_IDGenWizard1");
                // var finalStep = wizard.getSteps()[wizard.getSteps().length- 1]
                wizard.setCurrentStep(this.getView().byId("_IDGenWizardStep45"));
            },


            getTotalData: function () {
                var model = this.getOwnerComponent().getModel();
                var oList = model.bindList("/Books");
                var oList1 = model.bindContext("/Books");


                // context of Data loaded
                oList.requestContexts().then(function (aContexts, data) {
                    aContexts.forEach(function (oContext, data) {
                        debugger
                    });
                });

                // content data loaded
                oList1.requestObject("value").then(function (aContexts) {

                    sap.m.MessageBox.success("DATA message should appear in the success message box", {
                        title: "Success",                                      // default
                        onClose: null,                                       // default
                        styleClass: "",                                      // default
                        actions: sap.m.MessageBox.Action.CLOSE,              // default
                        emphasizedAction: null,                              // default
                        initialFocus: nullJSON,                                  // default
                        textDirection: sap.ui.core.TextDirection.Inherit,    // default
                        details: JSON.stringify(aContexts)
                    });



                });






            },
            generateNew: function () {
                var model = this.getOwnerComponent().getModel();
                var context = this.getView().byId("idParamTable").getBinding('items').getHeaderContext()
                var oNotControlList = model.bindList("/Books",context);
                oNotControlList.attachCreateCompleted((a, b) => {
                    // MessageBox.success('creation succcessfull')
                    model.refresh()
                });
                var obj = this.getView().getModel('localModel').getData();
                obj.ID = parseInt(obj.ID);
                obj.stock = parseInt(obj.stock);
                oNotControlList.create(obj)
            },

            generateNewList: function () {
                var model = this.getOwnerComponent().getModel();
                var ControlList = this.getView().byId('idParamTable').getBinding("items");
                ControlList.attachCreateCompleted((a, b) => {
                    MessageBox.success('creation succcessfull')
                });
                var obj = this.getView().getModel('localModel').getData();
                obj.ID = parseInt(obj.ID);
                obj.stock = parseInt(obj.stock);
                ControlList.create(obj)
            },

            addToArray: function () {
                var localModel = this.getView().getModel('localModel');
                var multiSaveModel = this.getView().getModel('multiSaveModel');
                var obj = JSON.parse(JSON.stringify(localModel.getData()));
                localModel.setData({ title: '', stock: '', ID: '' });
                var arrVal = multiSaveModel.getProperty('/result');
                obj.ID = parseInt(obj.ID);
                obj.stock = parseInt(obj.stock);
                arrVal.push(obj);
                multiSaveModel.setProperty('/result', arrVal);
                sap.m.MessageBox.success("DATA message should appear in the success message box", {
                    title: "Success",                                      // default
                    onClose: null,                                       // default
                    styleClass: "",                                      // default
                    actions: sap.m.MessageBox.Action.CLOSE,              // default
                    emphasizedAction: null,                              // default
                    initialFocus: null,                                  // default
                    textDirection: sap.ui.core.TextDirection.Inherit,    // default
                    details: JSON.stringify(arrVal)
                });

            },

            saveArray: function () {
                var oDataModel = new sap.ui.model.odata.v4.ODataModel(
                    {
                        serviceUrl: '/browse/',
                        "synchronizationMode": "None",
                        "operationMode": "Server",
                        "autoExpandSelect": true,
                        "earlyRequests": true,
                        "groupId": "$auto"

                    }
                )
                // var model = this.getOwnerComponent().getModel();
                // model.sGroupId = '$auto';
                var oNotControlList = oDataModel.bindList("/Books");
                var oNotControlListcontext = oDataModel.bindContext("/Books");
                var multiSaveModel = this.getView().getModel('multiSaveModel');
                var arr = multiSaveModel.getData()['result'];
                oNotControlList.attachCreateCompleted((a, b) => {
                    debugger
                    MessageBox.success('creation succcessfull')
                });
                arr.forEach((val) => {
                    oNotControlList.create(val)
                })


            },

            deleteMultipleData: function () { // multiple delete and read at same time acheived with same submitbatch
                var oDataModel = new sap.ui.model.odata.v4.ODataModel(
                    {
                        serviceUrl: '/browse/',
                        "synchronizationMode": "None",
                        "operationMode": "Server",
                        "autoExpandSelect": true,
                        "earlyRequests": false,
                        "groupId": "$auto"

                    }
                );
                var oSelected = this.byId("idParamTable").getSelectedItems();
                oSelected.forEach((valObj) => {
                    var val = valObj.getBindingContext().getObject();
                    var path = `/Books(${val.ID})`
                    oDataModel.delete(path)

                });

                var oList1 = oDataModel.bindContext("/Books");
                oList1.requestObject("value");

                oDataModel.submitBatch('API').then((succcess) => {
                    MessageBox.success('Deletion and read Batch succcessfull')
                }).catch((error) => {
                    MessageBox.success('Deletion Error')
                });

            },
            onItemDelete: function () {
                var oSelected = this.byId("idParamTable").getSelectedItem();
                oSelected.getBindingContext().delete("$auto").then(function () {
                    MessageBox.success("Deleted content");
                }.bind(this), function (oError) {
                    MessageBox.error(oError.message);
                });
            },

            getGroupHeader(oGroup) {
                // var flag = this.getOwnerComponent().getModel("FeatureFlags");
                // debugger
                return new sap.m.GroupHeaderListItem({
                    title: oGroup.key
                })
            },

            getGroup: function (oContext) {
                // return false;
                // var flag = this.getOwnerComponent().getModel("FeatureFlags");
                // debugger
                return oContext.getProperty('author');
            },


            checkHeaderAndModelParameters: function () {
                var oDataModel = new sap.ui.model.odata.v4.ODataModel(
                    {
                        serviceUrl: '/browse/',
                        "synchronizationMode": "None",
                        "operationMode": "Server",
                        "autoExpandSelect": true,
                        "earlyRequests": true,
                        "groupId": "$auto"

                    }
                );
                var oList1 = oDataModel.bindContext("{path'/Books' , urlParameters:{'param1' : '1'}}");
                oList1.requestObject().then(function (aContexts) {
                    debugger
                })

            },

            Filtering: function () {
                var bindings = this.getView().byId("idParamTable").getBinding("items");

                var oFilter = new sap.ui.model.Filter({
                    path: "ID",
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: 201
                });
                bindings.filter([oFilter]);

            },
            FunctionImport: function () {
                var oDataModel = new sap.ui.model.odata.v4.ODataModel(
                    {
                        serviceUrl: '/browse/',
                        "synchronizationMode": "None",
                        "operationMode": "Server",
                        "autoExpandSelect": true,
                        "earlyRequests": true,
                        "groupId": "$direct"

                    }
                );
                var importContext = oDataModel.bindContext('/getCustomerPayload()');
                importContext.requestObject("value").then(function (aContexts) {
                    MessageBox.success(aContexts)
                }).catch((error) => MessageBox.error(error.message))

            },

            FunctionImportObj: function () {
                var oDataModel = new sap.ui.model.odata.v4.ODataModel(
                    {
                        serviceUrl: '/browse/',
                        "synchronizationMode": "None",
                        "operationMode": "Server",
                        "autoExpandSelect": true,
                        "earlyRequests": true,
                        "groupId": "$direct"

                    }
                );

                var importContext = oDataModel.bindContext("/getCustomerPayloadObj(id=@id)?@id='1'");
                importContext.requestObject("value").then(function (arrVal) {
                    sap.m.MessageBox.success("DATA message should appear in the success message box", {
                        title: "Success",                                      // default
                        onClose: null,                                       // default
                        styleClass: "",                                      // default
                        actions: sap.m.MessageBox.Action.CLOSE,              // default
                        emphasizedAction: null,                              // default
                        initialFocus: null,                                  // default
                        textDirection: sap.ui.core.TextDirection.Inherit,    // default
                        details: JSON.stringify(arrVal)
                    });
                }).catch((error) => MessageBox.error(error.message))
            },

            multipleCreateUsingUpdateId: function () {
                var multiSaveModel = this.getView().getModel('multiSaveModel');
                var data = multiSaveModel.getProperty('/result');
                var oDataModel = new sap.ui.model.odata.v4.ODataModel(
                    {
                        serviceUrl: '/browse/',
                        "synchronizationMode": "None",
                        "operationMode": "Server",
                        "autoExpandSelect": true,
                        "earlyRequests": true,
                        "updateGroupId": "fullCreateSync"

                    }
                );

                var oNotControlList = oDataModel.bindList("/Books");
                var obj = this.getView().getModel('localModel').getData();

                oNotControlList.attachCreateCompleted((a, b) => {
                    // var model = this.getOwnerComponent().getModel();
                    debugger
                    // MessageBox.success('creation succcessfull')
                    // model.refresh()
                });

                data.forEach((objParam) => {
                    objParam.ID = parseInt(objParam.ID);
                    objParam.stock = parseInt(objParam.stock);
                    oNotControlList.create(objParam)
                });

                var fnSuccess = function (msg) {
                    debugger
                    // this._setBusy(false);
                    // MessageToast.show(this._getText("changesSentMessage"));
                    // this._setUIChanges(false);
                }.bind(this);

                var fnError = function (oError) {
                    debugger
                    // this._setBusy(false);
                    // this._setUIChanges(false);
                    // MessageBox.error(oError.message);
                }.bind(this);


                oDataModel.submitBatch('fullCreateSync').then(fnSuccess, fnError);

            },

            getETagCorrelation: function () {
                var oDataModel = new sap.ui.model.odata.v4.ODataModel(
                    {
                        serviceUrl: '/browse/',
                        "synchronizationMode": "None",
                        "operationMode": "Server",
                        "autoExpandSelect": true,
                        "earlyRequests": true,
                        "updateGroupId": "fullCreateSync",
                        "httpHeaders": {
                            "customAvinash": "avinash"
                        }

                    }
                );

                var importContext = oDataModel.bindContext('/getETagCorrelation()');
                importContext.requestObject("value").then(function (aContexts) {
                    MessageBox.success(aContexts)
                }).catch((error) => MessageBox.error(error.message))
            },

            openCreateBookDialog: function () {
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "app.fragments.Image",

                    })
                };
                this.pDialog.then((oDialog) => {
                    this.myDialog = oDialog;
                    // this.myDialog.setModel('localModelFra', localModelFra);
                    // this.myDialog = oDialog;
                    this.myDialog.open();
                });
            },

            generateNewCurrency: function () {

            },
            storeInUI: function () {
                
                var input = document.createElement('input');
                input.type = 'file';

                input.onchange = e => {
                    var file = e.target.files[0];
                    var reader = new FileReader();
                    this.oPayload;
                    reader.fileName = file.name;
                    this.type = file.type;
                    // reader.item = that.item;
                    reader.readAsDataURL(file);

                    reader.onload = function (e) {
                        var sContentStream = e.target.result;
                        var sFileContent = sContentStream.substring(sContentStream.indexOf(",") + 1, sContentStream.length);
                        this.oPayload = sFileContent.toString();
                        this.mime = sContentStream.split(";")[0].split(":")[1];
                    }.bind(this)
                }

                input.click();
            },

            storeBackend: function () {
                var oDataModel = new sap.ui.model.odata.v4.ODataModel(
                    {
                        serviceUrl: '/browse/',
                        "synchronizationMode": "None",
                        "operationMode": "Server",
                        "autoExpandSelect": true,
                        "earlyRequests": true,
                        "groupId": "$auto"

                    }
                );
                var oNotControlList = oDataModel.bindList("/Books");
                var objParam = this.myDialog.getModel("localModelFra").getData();
                             
                    objParam.ID = parseInt(objParam.ID);
                    objParam.stock = parseInt(objParam.stock);
                    objParam.image = this.oPayload;

               

                oNotControlList.create(objParam);
                oNotControlList.attachCreateCompleted((a, b) => {
                    this.getOwnerComponent().getModel().refresh();

                });
            },

            downloadAttachment:function(){
                var oModel = this.getOwnerComponent().getModel();
                var oSelected = this.byId("idParamTable3").getSelectedItem();
                // oSelected.forEach((valObj) => {
                    var val = oSelected.getBindingContext().getObject();
                    // var path = `/Books(${val.ID})`
                    // oDataModel.delete(path)

                // });
                var oList =  oModel.bindProperty(`/Books(ID=${val.ID})/image`);
                oList.requestValue().then(function (sValue) {
                    var byteString = atob(sValue);
                    var ab = new ArrayBuffer(byteString.length);
                    var ia = new Uint8Array(ab);
                    
                    for (var i = 0; i < byteString.length; i++) {
                        ia[i] = byteString.charCodeAt(i);
                    }
                    var blob = new Blob([ab], { type: this.type });
                    var url  = window.URL.createObjectURL(blob);
                    sap.m.URLHelper.redirect(url, true);
                }.bind(this));


            },

            addSequential:function(){
                var oModel = this.getOwnerComponent().getModel("authors");
                var oNotControlList = oModel.bindList("/Authors");
                var obj = {
                    ID:130,
                    name:'Avinash change'
                }
                oNotControlList.attachCreateCompleted((a, b) => {
                    var oDataModel = new sap.ui.model.odata.v4.ODataModel(
                        {
                            serviceUrl: '/admin/',
                            "synchronizationMode": "None",
                            "operationMode": "Server",
                            "autoExpandSelect": true,
                            "earlyRequests": true,
                            "updateGroupId": "myGroup",
                            
    
                        }
                    );
                    var oNotControlListChild = oDataModel.bindList(`${a.getParameter('context').getPath()}/books`,{$$updateGroupId : "myGroup",bSkipRefresh:true});
                    var arr = [{
                        ID:2222,
                        title:'Avinash Title'
                    },
                    {
                        ID:2223,
                        title:'Avinash Book'
                    }];
                    arr.forEach((obj)=>{
                        oNotControlListChild.create(obj,{bSkipRefresh:true});
                    })
                    oDataModel.submitBatch('myGroup').then((fnSuccess)=>{
                        debugger
                        // var table = this.getView().byId("idParamTable35").getBinding('items');
                        // oModel.refresh("$auto");
                       
                    });
                    

                });
                
                oNotControlList.create(obj,{bSkipRefresh:true})
                
            },
            onTotalRefresh:function(){
                var oModel = this.getOwnerComponent().getModel("authors");
                // this.onRefresh()
                oModel.refresh();
                oModel.refresh();
            },

            saveArrayPromise:function(){
                var oDataModel = new sap.ui.model.odata.v4.ODataModel(
                    {
                        serviceUrl: '/browse/',
                        "synchronizationMode": "None",
                        "operationMode": "Server",
                        "autoExpandSelect": true,
                        "earlyRequests": true,
                        "groupId": "$auto"
                        

                    }
                );
                                
                var oNotControlListChild = oDataModel.bindList("/Books")
                var arr = [{
                    ID:2222,
                    title:'Avinash Title'
                },
                {
                    ID:2223,
                    title:'Avinash Book'
                }];
                var promS = [];
                arr.forEach((obj)=>{
                    promS.push(oNotControlListChild.create(obj).created());
                    
                })
                Promise.all(promS).then((val)=>{
                    debugger
                })
                
            },

            EditOrPutCall:function(){
                var oDataModel = new sap.ui.model.odata.v4.ODataModel(
                    {
                        serviceUrl: '/admin/',
                        "synchronizationMode": "None",
                        "operationMode": "Server",
                        "autoExpandSelect": true,
                        "earlyRequests": true,
                        "updateGroupId": "myGroupEdit"
                        

                    }
                );
                debugger

                var headerContext = this.getView().byId("idParamTable35").getBinding('items').getHeaderContext()
                // var obj = this.getView().byId('idParamTable35').getSelectedItem().getBindingContext("authors").getObject()

                var content = oDataModel.bindContext(`/Authors(ID=170)`,headerContext);
               
                var content2 = oDataModel.bindContext(`/Authors(ID=150)`,headerContext);
               
                

                Promise.all([content.getBoundContext().setProperty("name", 'Tester second'),content.getBoundContext().setProperty("placeOfDeath",'Ambala'),content2.getBoundContext().setProperty("name", 'Tester first'),content2.getBoundContext().setProperty("placeOfDeath",111)]).then(()=>{
                    debugger
                }).catch((errorPay)=>{
                    MessageBox.error(errorPay.error.message)
                })

                oDataModel.submitBatch("myGroupEdit").then((val)=>{
                    debugger
                })

            },

            navToView2:function(){
                this.getOwnerComponent().getRouter().navTo('RouteView2');
            }

            // 1. Multiple delete using batch -- done
            // 2. absolute binding with table and form
            // 3.Multiple create -- done
            // 4. try to bind tabel with relative binding the add path from controller to create complete path
            // 5. how to use function imports -- done
            // 6. Simple Filter to List -done
            // 6. Simple Filter to List using url 
            // 7. sort -- done
            // 8. group  -- done
            // 9 . some basic error -- done some cases 501
            // 10. common response for multiple create same entity -- some what done
            // 11. common response for multiple create same different entity -- doesn't seem to be possible dirrectly 
            // 12. create using path for multiple create same entity



        });
    });

