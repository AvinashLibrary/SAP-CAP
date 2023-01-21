sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "../model/formatter",
    "sap/ui/model/message/MessageModel",
    "sap/m/MessagePopover",
    "sap/m/MessageItem",
    'sap/ui/core/Core',
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, JSONModel, Fragment, formatter, MessageModel, MessagePopover, MessageItem, Core) {
        "use strict";

        return Controller.extend("app.controller.View2", {

            onInit: function () {
                this.loaddata()
                var oMessageManager = sap.ui.getCore().getMessageManager(),
                    oMessageModel = oMessageManager.getMessageModel(),
                    oMessageModelBinding = oMessageModel.bindList("/", undefined, []);


                this.getView().setModel(oMessageModel, "message");

                oMessageModelBinding.attachChange(this.onMessageBindingChange, this);
                this._bTechnicalErrors = false;
                var model = this.getOwnerComponent().getModel("authors");
                model.attachDataReceived(function(){
                    debugger
                })


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

            loaddata() {
                // var processor = new sap.ui.core.message.MessageProcessor();
                // processor.attachMessageChange(function(data){
                //     debugger
                // })
                // var oMessageManager = sap.ui.getCore().getMessageManager();
                // oMessageManager.registerMessageProcessor(processor);
                // // oMessageManager.
                // this.getView().setModel(oMessageManager.getMessageModel(),
                //     "messages");
                // this.messageHandler = this.getView().getModel('messages');
                // this.messageHandler.attachEvent("messageChange",function (messageComplete) {
                //     debugger
                // })

                // var messageModelCustom = new sap.ui.model.message.MessageModel(oMessageManager);
                // messageModelCustom.requestCompleted = function(comments){
                //     debugger
                // }

                var model = this.getOwnerComponent().getModel("authors");
                var oList1 = model.bindContext("/Authors(ID=150)/books");
                oList1.requestObject().then((data) => {

                    var multiSaveModel = new JSONModel();
                    multiSaveModel.setData(data);
                    this.getView().setModel(multiSaveModel, 'localDataModel');
                })
            },

            generateNew: function () {
                var oDataModel = new sap.ui.model.odata.v4.ODataModel(
                    {
                        serviceUrl: '/admin/',
                        "synchronizationMode": "None",
                        "operationMode": "Server",
                        "autoExpandSelect": true,
                        "earlyRequests": true,
                        "updateGroupId": "myGroup",
                        // "groupId":"$auto"


                    }
                );
                var oNotControlList = oDataModel.bindList('/Authors(ID=150)/books');
                // oNotControlList.attachCreateCompleted((a, b) => {
                //     MessageBox.success('creation succcessfull')


                // });
                var arrrsay = [{
                    ID: 20737,
                    title: "avinash Book",
                    stock: 2222
                }, {
                    ID: 2037,
                    title: "avinash Book3",
                    stock: 223322
                }];


                // oNotControlList.attachCreateCompleted((obj)=>{
                //     obj.mParameters.context.oSyncCreatePromise.getResult().then((v)=>{
                //         debugger
                // })





                //    });

                var arrrsay = [{
                    ID: 20737,
                    title: "avinash Book",
                    stock: 2222
                }, {
                    ID: 2037,
                    title: "avinash Book3",
                    stock: 223322
                }];




                var promiseArr = [];
                promiseArr.push(editPrmise2);
                promiseArr.push(editPrmise);

                var content = oDataModel.bindContext(`/Authors(ID=101)`);
                var contentBonus = oDataModel.bindList(`/Bonus`);

                var content2 = oDataModel.bindContext(`/Books(ID=201)`);
                var editPrmise2 = content2.getBoundContext().setProperty("title", 'alphasBetas')
                var editPrmise = content.getBoundContext().setProperty("name", 'editPrmise')

                var arrrBonus = [{
                    ID: 1,
                    name: "Bon",

                }, {
                    ID: 2,
                    name: "Bo2",

                }];

                arrrBonus.forEach((obj) => {
                    var promis = contentBonus.create(obj).created();
                    promiseArr.push(promis)
                })

                arrrsay.forEach((obj) => {
                    var promis = oNotControlList.create(obj).created();
                    promiseArr.push(promis)
                })


                Promise.all(promiseArr).then((data) => {
                    MessageBox.success('creation succcessfull');
                    this.loaddata()

                }).catch((error) => {
                    MessageBox.error(error.error.message)
                })

                oDataModel.submitBatch('myGroup');
            },

            handleMessagePopoverPress: function (oEvent) {
                if (!this.oMP) {
                    this.createMessagePopover();
                }
                this.oMP.toggle(oEvent.getSource());
            },

            createMessagePopover: function () {
                var that = this;

                this.oMP = new MessagePopover({
                    activeTitlePress: function (oEvent) {
                        var oItem = oEvent.getParameter("item"),
                            oPage = that.getView().byId("messageHandlingPage"),
                            oMessage = oItem.getBindingContext("message").getObject(),
                            oControl = Element.registry.get(oMessage.getControlId());


                        if (oControl) {
                            oPage.scrollToElement(oControl.getDomRef(), 200, [0, -100]);
                            setTimeout(function () {
                                oControl.focus();
                            }, 300);
                        }
                    },
                    items: {
                        path: "message>/",
                        template: new MessageItem(
                            {
                                title: "{message>message}",
                                subtitle: "{message>additionalText}",
                                groupName: { parts: [{ path: 'message>controlIds' }], formatter: this.getGroupName },
                                activeTitle: { parts: [{ path: 'message>controlIds' }], formatter: this.isPositionable },
                                type: "{message>type}",
                                description: "{message>message}"
                            })
                    },
                    groupItems: true
                });

                this.getView().byId("messagePopoverBtn").addDependent(this.oMP);
            },

            _getMessagePopover: function () {
                var oView = this.getView();

                // create popover lazily (singleton)
                if (!this._pMessagePopover) {
                    this._pMessagePopover = Fragment.load({
                        id: oView.getId(),
                        name: "app.fragments.MessagePopover"
                    }).then(function (oMessagePopover) {
                        oView.addDependent(oMessagePopover);
                        return oMessagePopover;
                    });
                }
                return this._pMessagePopover;
            },
            onMessagePopoverPress: function (oEvent) {
                var oSourceControl = oEvent.getSource();
                this._getMessagePopover().then(function (oMessagePopover) {
                    oMessagePopover.openBy(oSourceControl);
                });
            },

            getAndCreateBonus() {

                var oDataModel = this.getOwnerComponent().getModel("authors");
                var contentLoad = oDataModel.bindContext(`/Bonus`);
                contentLoad.requestObject("value").then(function (aContexts) {

                });

                var contentBonus = oDataModel.bindList(`/Bonus`);

                var promiseArr = [];

                var arrrBonus = [{
                    ID: 1,
                    name: "Bon",

                }, {
                    ID: 2,
                    name: "Bo2",

                }];

                arrrBonus.forEach((obj) => {
                    var promis = contentBonus.create(obj).created();
                    promiseArr.push(promis)
                })

                Promise.all(promiseArr).then((data) => {
                    MessageBox.success('creation succcessfull');
                    this.loaddata()
                    this.RefreshBonus()

                }).catch((error) => {
                    MessageBox.error(error.error.message)
                })

                // this.oDataModel.submitBatch('myGroup');
            },
            getAndUpdateBonus() {
                var oDataModel = new sap.ui.model.odata.v4.ODataModel(
                    {
                        serviceUrl: '/admin/',
                        "synchronizationMode": "None",
                        "operationMode": "Server",
                        "autoExpandSelect": true,
                        "earlyRequests": true,
                        "updateGroupId": "myGroup2",
                        // "groupId":"$auto"


                    }
                );

                var oDataModel2 = new sap.ui.model.odata.v4.ODataModel(
                    {
                        serviceUrl: '/admin/',
                        "synchronizationMode": "None",
                        "operationMode": "Server",
                        "autoExpandSelect": true,
                        "earlyRequests": true,
                        "updateGroupId": "myGroup22",
                        // "groupId":"$auto"


                    }
                );

                // var contentLoad = oDataModel.bindList(`/Bonus`);
                // contentLoad.requestContexts().then((aContexts)=> {
                var content = oDataModel.bindContext(`/Bonus(ID=1)`);

                Promise.all([content.getBoundContext().setProperty("name", 'Tes')]).then(() => {
                    debugger
                    this.RefreshBonus()
                }).catch((errorPay) => {
                    MessageBox.error("errorPay.error.message")
                })

                oDataModel.submitBatch('myGroup2');
                // });



            },

            DeleteBonus: function () {
                var oDataModel = this.getOwnerComponent().getModel("authors");
                 
                Promise.all([oDataModel.delete(`/Bonus(ID=1)`)]).then((yy)=>{
                    debugger
                    this.RefreshBonus()
                }).catch((rr)=>{
                    debugger
                })
            },

            RefreshBonus:function(){
                this.getOwnerComponent().getModel("authors").refresh();
            },

            ResetBonus:function(){
                var oDataModel = this.getOwnerComponent().getModel("authors");
                 
                Promise.all([oDataModel.delete(`/Bonus(ID=1)`),oDataModel.delete(`/Bonus(ID=2)`)]).then((yy)=>{
                    debugger
                    this.RefreshBonus()
                }).catch((rr)=>{
                    debugger
                })
            },
            EditBonus:function(){
                    var oDataModel = this.getOwnerComponent().getModel("authors");
                    var content2 = oDataModel.bindContext(`/Bonus(ID=1)`);
                    Promise.all([content2.getBoundContext().setProperty("name", 'Tes')]).then(()=>{
                        debugger
                        this.RefreshBonus()
                    }).catch((rr)=>{
                        debugger
                    })
                
            }
            

        })
    })