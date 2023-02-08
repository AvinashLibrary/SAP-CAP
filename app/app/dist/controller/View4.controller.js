sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageBox","sap/ui/model/json/JSONModel"],function(e,t,n){"use strict";return e.extend("app.controller.View4",{onInit(){var e=sap.ui.getCore().getMessageManager(),t=e.getMessageModel(),n=t.bindList("/",undefined,[]);n.attachChange(this.onMessageBindingChange,this);this._bTechnicalErrors=false;this.getView().setModel(t,"message")},onMessageBindingChange:function(e){var n=e.getSource().getContexts(),a,o=false;if(o||!n.length){return}a=n.map(function(e){return e.getObject()});sap.ui.getCore().getMessageManager().removeMessages(a);this._bTechnicalErrors=true;t.error(a[0].message,{id:"serviceErrorMessageBox",onClose:function(){o=false}});o=true},onAfterRendering:function(){var e=true;if(e){this.Context=this.getView().byId("_IDGenSimpleForm1").bindContext({path:"authors>/Authors(ID=150)",parameters:{$$updateGroupId:"peopleGroupAdmin"}})}else{var t=new n;var a={ID:null,name:""};t.setData(a);this.getView().byId("_IDGenSimpleForms1").setModel(t,"authorsLocal")}},onChangeName:function(e){},onSubmit:function(){var e=this.getOwnerComponent().getModel("authors");e.submitBatch("peopleGroupAdmin").then(()=>{}).catch(()=>{debugger})},openNameDialog:function(){if(!this.pDialog){this.pDialog=this.loadFragment({name:"app.fragments.ValueHelp"})}this.pDialog.then(e=>{this.myDialog=e;this.myDialog.open()})},onDialogClose:function(e){var t=e.getParameter("selectedContexts")}})});