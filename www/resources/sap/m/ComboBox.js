/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ComboBoxBase','./ComboBoxRenderer','./Popover','./SelectList','./library'],function(q,C,a,P,S,l){"use strict";var b=C.extend("sap.m.ComboBox",{metadata:{library:"sap.m",properties:{selectedKey:{type:"string",group:"Data",defaultValue:""},selectedItemId:{type:"string",group:"Misc",defaultValue:""},showSecondaryValues:{type:"boolean",group:"Misc",defaultValue:false}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false}},events:{selectionChange:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}}}}});function h(i){var d=this.getFocusDomRef(),c=d.selectionStart,e=d.selectionEnd,I=c!==e,t=d.value.substring(0,d.selectionStart),o=this.getSelectedItem();if(i&&(i!==o)){this.updateDomValue(i.getText());this.setSelection(i);this.fireSelectionChange({selectedItem:i});i=this.getSelectedItem();if(!q.sap.startsWithIgnoreCase(i.getText(),t)||!I){c=0;}this.selectText(c,d.value.length);}this.scrollToItem(i);}function s(i,e){if(document.activeElement===this.getFocusDomRef()){this.selectText(i,e);}}b.prototype._handleAriaActiveDescendant=function(i){var d=this.getFocusDomRef(),A="aria-activedescendant";if(d){if(i&&i.getDomRef()&&this.isOpen()){d.setAttribute(A,i.getId());}else{d.removeAttribute(A);}}};b.prototype._callMethodInControl=function(f,A){var L=this.getList();if(A[0]==="items"){if(L){return S.prototype[f].apply(L,A);}}else{return C.prototype[f].apply(this,A);}};b.prototype._setItemVisibility=function(i,v){var o=i&&i.$(),c="sapMSelectListItemBaseInvisible";if(v){i.bVisible=true;o.length&&o.removeClass(c);}else{i.bVisible=false;o.length&&o.addClass(c);}};b.prototype.setSelectedIndex=function(i,_){var I;_=_||this.getItems();i=(i>_.length-1)?_.length-1:Math.max(0,i);I=_[i];if(I){this.setSelection(I);}};b.prototype._createPopover=function(){var p=new P({showHeader:false,placement:sap.m.PlacementType.Vertical,offsetX:0,offsetY:0,initialFocus:this,bounce:false,showArrow:false});this._decoratePopover(p);return p;};b.prototype._decoratePopover=function(p){var t=this;p._setMinWidth=function(w){var o=this.getDomRef();if(o){o.style.minWidth=w;}};p.open=function(){return this.openBy(t);};};b.prototype.onAfterRenderingPopover=function(){var p=this.getPicker(),w=(this.$().outerWidth()/parseFloat(sap.m.BaseFontSize))+"rem";p._setMinWidth(w);};b.prototype._createDialog=function(){var d=new sap.m.Dialog({stretch:true,customHeader:new sap.m.Bar({contentLeft:new sap.m.InputBase({value:this.getSelectedItem().getText(),width:"100%",editable:false})})});d.getAggregation("customHeader").attachBrowserEvent("tap",function(){d.close();},this);return d;};b.prototype.onBeforeOpenDialog=function(){var H=this.getPicker().getCustomHeader();H.getContentLeft()[0].setValue(this.getSelectedItem().getText());};b.prototype.onBeforeRendering=function(){C.prototype.onBeforeRendering.apply(this,arguments);this.synchronizeSelection();};b.prototype.oninput=function(e){C.prototype.oninput.apply(this,arguments);if(e.isMarked("invalid")){return;}var o=this.getSelectedItem(),I=this.getItems(),c=e.target,v=c.value,f=true,V=false,d,m,i=0;for(;i<I.length;i++){d=I[i];m=q.sap.startsWithIgnoreCase(d.getText(),v);if(v===""){m=true;}this._setItemVisibility(d,m);if(m&&!V){V=true;}if(d.getEnabled()&&f&&m&&v!==""){f=false;if(this._bDoTypeAhead){this.updateDomValue(d.getText());}this.setSelection(d);if(o!==this.getSelectedItem()){this.fireSelectionChange({selectedItem:this.getSelectedItem()});}if(this._bDoTypeAhead){if(sap.ui.Device.os.blackberry||sap.ui.Device.os.android){setTimeout(s.bind(this,v.length,this.getValue().length),0);}else{this.selectText(v.length,9999999);}}this.scrollToItem(this.getSelectedItem());}}if(v===""||!V){this.setSelection(null);if(o!==this.getSelectedItem()){this.fireSelectionChange({selectedItem:this.getSelectedItem()});}}if(V){this.open();}else{this.isOpen()?this.close():this.clearFilter();}};b.prototype.onSelectionChange=function(c){var i=c.getParameter("selectedItem");this.setSelection(i);this.fireSelectionChange({selectedItem:this.getSelectedItem()});};b.prototype.onItemPress=function(c){var i=c.getParameter("item");this.close();this.updateDomValue(i.getText());if(sap.ui.Device.system.desktop){setTimeout(this.selectText.bind(this,this.getValue().length,this.getValue().length),0);}};b.prototype.onkeydown=function(e){C.prototype.onkeydown.apply(this,arguments);if(!this.getEnabled()||!this.getEditable()){return;}var k=q.sap.KeyCodes;this._bDoTypeAhead=(e.which!==k.BACKSPACE)&&(e.which!==k.DELETE);};b.prototype.oncut=function(e){C.prototype.oncut.apply(this,arguments);this._bDoTypeAhead=false;};b.prototype.onsapenter=function(e){C.prototype.onsapenter.apply(this,arguments);e.setMarked();if(!this.getEnabled()||!this.getEditable()){return;}var v=this.getValue();this.setValue(v);this.selectText(v.length,v.length);if(this.isOpen()){this.close();}};b.prototype.onsapdown=function(e){if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();e.preventDefault();var n,c=this.getSelectableItems();n=c[c.indexOf(this.getSelectedItem())+1];h.call(this,n);};b.prototype.onsapup=function(e){if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();e.preventDefault();var p,c=this.getSelectableItems();p=c[c.indexOf(this.getSelectedItem())-1];h.call(this,p);};b.prototype.onsaphome=function(e){if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();e.preventDefault();var f=this.getSelectableItems()[0];h.call(this,f);};b.prototype.onsapend=function(e){if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();e.preventDefault();var L=this.findLastEnabledItem(this.getSelectableItems());h.call(this,L);};b.prototype.onsappagedown=function(e){if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();e.preventDefault();var c=this.getSelectableItems(),i=c.indexOf(this.getSelectedItem())+10,I;i=(i>c.length-1)?c.length-1:Math.max(0,i);I=c[i];h.call(this,I);};b.prototype.onsappageup=function(e){if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();e.preventDefault();var c=this.getSelectableItems(),i=c.indexOf(this.getSelectedItem())-10,I;i=(i>c.length-1)?c.length-1:Math.max(0,i);I=c[i];h.call(this,I);};b.prototype.onfocusin=function(e){if(e.target===this.getOpenArea()){this.bCanNotOpenMessage=true;if(sap.ui.Device.system.desktop){this.focus();}}else{if(sap.ui.Device.system.desktop){setTimeout(function(){if(document.activeElement===this.getFocusDomRef()&&!this.bFocusoutDueRendering&&!this.getSelectedText()){this.selectText(0,this.getValue().length);}}.bind(this),0);}if(!this.isOpen()&&!this.bCanNotOpenMessage){this.openValueStateMessage();}this.bCanNotOpenMessage=false;}this.$().addClass("sapMFocus");};b.prototype.onsapfocusleave=function(e){C.prototype.onsapfocusleave.apply(this,arguments);var p=this.getAggregation("picker");if(!e.relatedControlId||!p){return;}var c=sap.ui.getCore().byId(e.relatedControlId),f=c&&c.getFocusDomRef();if(q.sap.containsOrEquals(p.getFocusDomRef(),f)){this.focus();}};b.prototype.setSelection=function(i){var L=this.getList(),k;if(L){L.setSelection(i);}this.setAssociation("selectedItem",i,true);this.setProperty("selectedItemId",(i instanceof sap.ui.core.Item)?i.getId():i,true);if(typeof i==="string"){i=sap.ui.getCore().byId(i);}k=i?i.getKey():"";this.setProperty("selectedKey",k,true);this._handleAriaActiveDescendant(i);};b.prototype.isSelectionSynchronized=function(){var i=this.getSelectedItem();return this.getSelectedKey()===(i&&i.getKey());};b.prototype.synchronizeSelection=function(){if(this.isSelectionSynchronized()){return;}var k=this.getSelectedKey(),i=this.getItemByKey(""+k);if(i&&(k!=="")){this.setAssociation("selectedItem",i,true);this.setProperty("selectedItemId",i.getId(),true);if(this._sValue===this.getValue()){this.setValue(i.getText());}}};b.prototype.isFiltered=function(){var L=this.getList();return L&&(L.getVisibleItems().length!==L.getItems().length);};b.prototype.isItemVisible=function(i){return i&&(i.bVisible===undefined||i.bVisible);};b.prototype.createPicker=function(p){var o=this.getAggregation("picker"),c=this.getRenderer().CSS_CLASS_COMBOBOXBASE;if(o){return o;}o=this["_create"+p]();this.setAggregation("picker",o,true);o.setHorizontalScrolling(false).addStyleClass(c+"Picker").addStyleClass(c+"Picker-CTX").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPicker,onAfterRendering:this.onAfterRenderingPicker},this).addContent(this.createList());return o;};b.prototype.createList=function(){this._oList=new S({width:"100%"}).addStyleClass(this.getRenderer().CSS_CLASS+"List").addEventDelegate({ontap:function(e){this.close();}},this).attachSelectionChange(this.onSelectionChange,this).attachItemPress(this.onItemPress,this);return this._oList;};b.prototype.onBeforeRenderingPicker=function(){var o=this["onBeforeRendering"+this.getPickerType()];o&&o.call(this);};b.prototype.onAfterRenderingPicker=function(){var o=this["onAfterRendering"+this.getPickerType()];o&&o.call(this);};b.prototype.onBeforeOpen=function(){var p=this["onBeforeOpen"+this.getPickerType()],d=this.getFocusDomRef();this.addStyleClass(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"Pressed");if(d){d.setAttribute("aria-owns",this.getList().getId());}this.addContent();p&&p.call(this);};b.prototype.onBeforeOpenPopover=function(){};b.prototype.onAfterOpen=function(){var d=this.getFocusDomRef(),i=this.getSelectedItem();if(d){d.setAttribute("aria-expanded","true");i&&d.setAttribute("aria-activedescendant",i.getId());}};b.prototype.onBeforeClose=function(){var d=this.getFocusDomRef();if(d){d.removeAttribute("aria-owns");d.removeAttribute("aria-activedescendant");}this.removeStyleClass(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"Pressed");};b.prototype.onAfterClose=function(){var d=this.getFocusDomRef();if(d){d.setAttribute("aria-expanded","false");}if(document.activeElement===d){this.openValueStateMessage();}this.clearFilter();};b.prototype.isItemSelected=function(i){return i&&(i.getId()===this.getAssociation("selectedItem"));};b.prototype.getDefaultSelectedItem=function(){return null;};b.prototype.clearSelection=function(){this.setSelection(null);};b.prototype.onItemChange=function(c){var d=this.getAssociation("selectedItem"),n=c.getParameter("newValue"),p=c.getParameter("name");if(d===c.getParameter("id")){switch(p){case"text":if(!this.isBound("value")){this.setValue(n);}break;case"key":if(!this.isBound("selectedKey")){this.setSelectedKey(n);}break;}}};b.prototype.selectText=function(i,c){C.prototype.selectText.apply(this,arguments);this.textSelectionStart=i;this.textSelectionEnd=c;return this;};b.prototype.addAggregation=function(A,o,c){this._callMethodInControl("addAggregation",arguments);if(A==="items"&&!c&&!this.isInvalidateSuppressed()){this.invalidate(o);}return this;};b.prototype.getAggregation=function(){return this._callMethodInControl("getAggregation",arguments);};b.prototype.setAssociation=function(A,i,c){var L=this.getList();if(L&&(A==="selectedItem")){S.prototype.setAssociation.apply(L,arguments);}return C.prototype.setAssociation.apply(this,arguments);};b.prototype.indexOfAggregation=function(){return this._callMethodInControl("indexOfAggregation",arguments);};b.prototype.insertAggregation=function(){this._callMethodInControl("insertAggregation",arguments);return this;};b.prototype.removeAggregation=function(){return this._callMethodInControl("removeAggregation",arguments);};b.prototype.removeAllAggregation=function(){return this._callMethodInControl("removeAllAggregation",arguments);};b.prototype.destroyAggregation=function(A,c){this._callMethodInControl("destroyAggregation",arguments);return this;};b.prototype.setProperty=function(p,v,c){var L=this.getList();if((p==="selectedKey")||(p==="selectedItemId")){L&&S.prototype.setProperty.apply(L,arguments);}return C.prototype.setProperty.apply(this,arguments);};b.prototype.removeAllAssociation=function(A,c){var L=this.getList();if(L&&(A==="selectedItem")){S.prototype.removeAllAssociation.apply(L,arguments);}return C.prototype.removeAllAssociation.apply(this,arguments);};b.prototype.clone=function(I){var c=C.prototype.clone.apply(this,arguments),L=this.getList();if(!this.isBound("items")&&L){for(var i=0,d=L.getItems();i<d.length;i++){c.addItem(d[i].clone());}c.setSelectedIndex(this.indexOfItem(this.getSelectedItem()));}return c;};b.prototype.findAggregatedObjects=function(){var L=this.getList();if(L){return S.prototype.findAggregatedObjects.apply(L,arguments);}return[];};b.prototype.setShowSecondaryValues=function(A){this.setProperty("showSecondaryValues",A,true);var L=this.getList();if(L){L.setShowSecondaryValues(A);}return this;};b.prototype.getItems=function(){var L=this.getList();return L?L.getItems():[];};b.prototype.setSelectedItem=function(i){if(typeof i==="string"){this.setAssociation("selectedItem",i,true);i=sap.ui.getCore().byId(i);}if(!(i instanceof sap.ui.core.Item)&&i!==null){return this;}if(!i){i=this.getDefaultSelectedItem();}this.setSelection(i);if(i){this.setValue(i.getText());}else if(i=this.getDefaultSelectedItem()){this.setValue(i.getText());}else{this.setValue("");}return this;};b.prototype.setSelectedItemId=function(i){i=this.validateProperty("selectedItemId",i);if(!i){i=this.getDefaultSelectedItem();}this.setSelection(i);i=this.getSelectedItem();if(i){this.setValue(i.getText());}else if(i=this.getDefaultSelectedItem()){this.setValue(i.getText());}else{this.setValue("");}return this;};b.prototype.setSelectedKey=function(k){k=this.validateProperty("selectedKey",k);var d=(k==="");if(d){this.setSelection(null);this.setValue("");return this;}var i=this.getItemByKey(k);if(i){this.setSelection(i);if(i){this.setValue(i.getText());}else if(i=this.getDefaultSelectedItem()){this.setValue(i.getText());}else{this.setValue("");}return this;}this._sValue=this.getValue();return this.setProperty("selectedKey",k);};b.prototype.getSelectedItem=function(){var v=this.getAssociation("selectedItem");return(v===null)?null:sap.ui.getCore().byId(v)||null;};b.prototype.removeItem=function(i){i=C.prototype.removeItem.apply(this,arguments);var I;if(this.isBound("items")&&!this.bDataUpdated){return i;}var v=this.getValue();if(this.getItems().length===0){this.clearSelection();}else if(this.isItemSelected(i)){I=this.getDefaultSelectedItem();this.setSelection(I);this.setValue(v);}return i;};return b;},true);