/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define('sap/ui/test/TestUtils',['jquery.sap.global','sap/ui/core/Core'],function(q){"use strict";var m={};function d(a,e,P){var A=QUnit.objectType(a),E=QUnit.objectType(e),n;if(A!==E){throw new Error(P+": actual type "+A+" does not match expected type "+E);}if(A==="array"){if(a.length<e.length){throw new Error(P+": array length: "+a.length+" < "+e.length);}}if(A==="array"||A==="object"){for(n in e){d(a[n],e[n],P==="/"?P+n:P+"/"+n);}}else if(a!==e){throw new Error(P+": actual value "+a+" does not match expected value "+e);}}function p(a,e,M,E){try{d(a,e,"/");QUnit.push(E,a,e,M);}catch(b){QUnit.push(!E,a,e,(M||"")+" failed because of "+b.message);}}return{deepContains:function(a,e,M){p(a,e,M,true);},notDeepContains:function(a,e,M){p(a,e,M,false);},useFakeServer:function(s,b,f){var h,M,P,r,R,o,S,u,U={};function c(n){if(/\.xml$/.test(n)){return"application/xml";}if(/\.json$/.test(n)){return"application/json";}return"application/x-octet-stream";}b="/"+window.location.pathname.split("/")[1]+"/test-resources/"+b+"/";for(u in f){r=f[u];h=r.headers||{};if(r.source){P=b+r.source;if(!m[P]){o=q.sap.sjax({url:P,dataType:"text"});if(!o.success){throw new Error(P+": resource not found");}m[P]=o.data;}M=m[P];h["Content-Type"]=h["Content-Type"]||c(P);}else{M=r.message||"";}U[u]=[r.code||200,h,M];}sinon.xhr.supportsCORS=true;S=s.useFakeServer();for(u in U){S.respondWith(u,U[u]);}S.autoRespond=true;sinon.FakeXMLHttpRequest.useFilters=true;sinon.FakeXMLHttpRequest.addFilter(function(a,u,A){return!(u in f);});R=S.restore;S.restore=function(){sinon.FakeXMLHttpRequest.filters=[];R.apply(this,arguments);};},withNormalizedMessages:function(c){sinon.test(function(){var C=sap.ui.getCore(),g=C.getLibraryResourceBundle;this.stub(C,"getLibraryResourceBundle").returns({getText:function(k,a){var r=k,t=g.call(C).getText(k),i;for(i=0;i<10;i+=1){if(t.indexOf("{"+i+"}")>=0){r+=" "+(i>=a.length?"{"+i+"}":a[i]);}}return r;}});c.apply(this);}).apply({});}};},true);