import {printStackTrace} from "./logger";

export class WebViewClass {
    hook(params:void) {
        Java.perform(function () {
            if(Java.available){

                /**
                 * hook WebView methods
                 */
                var WebView_name="android.webkit.WebView";
                // var WebView_name="com.heytap.browser.export.webview.WebView";
                // var WebView_name="com.heytap.webview.mc.client.MCWebView";
                // var WebView_name="com.tencent.smtt.sdk.WebView";
                // var WebView_name="com.uc.webview.export.WebView";
                // var WebView_name="com.alipay.mobile.nebulacore.web.H5WebView";
                // var WebView_name="com.alipay.mobile.nebula.webview.APWebView";
                // var WebView_name="com.miui.webkit.WebView";
                // var WebView_name="com.miui.webkit_api.WebView";

                var WebView=Java.use(WebView_name);
                var WebViewClient_Name=undefined;

                // WebView.getUrl.implementation=function(){
                //   console.warn("Hooking "+WebView_name+".getUrl(p1) successful");
                //   var ret=this.getUrl();
                //   console.log("WebView.getUrl() ,ret="+ret);
                //   return ret;
                // }

                WebView.loadUrl.overload('java.lang.String').implementation=function(p1:string){
                    console.warn("Hooking "+WebView_name+".loadUrl(p1) successful,url = "+p1);
                    // this.getSettings().setJavaScriptEnabled(true);
                    printStackTrace();
                    this.loadUrl(p1);
                }
            
            
                WebView.loadUrl.overload('java.lang.String','java.util.Map').implementation=function(p1:string,p2:any){
                    console.warn("Hooking "+WebView_name+".loadUrl(p1,p2) successful,url = "+p1+", p2"+p2);
                    printStackTrace();
            
                    if(p2!=null&&p2.size()!=0){
                    console.log("the Map size ="+p2.size());
                    var iterator = p2.entrySet().iterator();
                    while(iterator.hasNext()){
                        var entry = Java.cast(iterator.next(),Java.use('java.util.HashMap$Node'));
                        console.log(entry.getKey()+": "+entry.getValue());   
                    }
                    }
                    this.loadUrl(p1,p2);
                }
            
                WebView.addJavascriptInterface.implementation=function(p1:any,p2:any){
                    console.warn("Hooking "+WebView_name+".addJavascriptInterface() successful, "+p1+":"+p2);
                    printStackTrace();
                    this.addJavascriptInterface(p1,p2);
                }
            
                WebView.removeJavascriptInterface.implementation=function(p1:any){
                    console.warn("Hooking "+WebView_name+".removeJavascriptInterface() successful, "+p1);
                    // printStackTrace();
                    this.removeJavascriptInterface(p1);
                }
            
            
                WebView.evaluateJavascript.implementation=function(p1:any,p2:any){
            
                    // if(p1.length>500){
                    //   this.evaluateJavascript(p1,p2);
                    //   return;
                    // }
            
                    console.warn("Hooking "+WebView_name+".evaluateJavascript() successful, p1="+p1);
                    printStackTrace();
                    this.evaluateJavascript(p1,p2);
                }
            
                WebView.setWebChromeClient.implementation=function(p1:any){
                    console.warn("Hooking "+WebView_name+".setWebChromeClient() successful, p1="+p1);
                    // printStackTrace();
                    this.setWebChromeClient(p1);
                }
            
                WebView.setWebViewClient.implementation=function(p1:any){
                    console.warn("Hooking "+WebView_name+".setWebViewClient() successful, p1="+p1);
                    printStackTrace();
                    this.setWebViewClient(p1);
                }


                // var WebSettings_name="com.tencent.smtt.sdk.WebSettings";

                //     var WebSettings=Java.use(WebSettings_name);
                //     WebSettings.setJavaScriptEnabled.implementation=function(p1:boolean){
                //         console.warn("Hooking "+WebSettings_name+".setJavaScriptEnabled() successful, p1="+p1);
                //         // getStackTrace();
                //         this.setJavaScriptEnabled(p1);
                //     }



                /**
                 * hook WebViewClient methods
                 */
                var WebViewClient_name:string="com.douyu.module.webview.AbstractDYWebActivity$DYWebViewClient";
                try {

                    
                    var WebViewClient=Java.use(WebViewClient_name);

                    var overloads=WebViewClient.shouldOverrideUrlLoading.overloads;
                    overloads.forEach(function(overload:any) {
                    var argsType="('";
                    overload.argumentTypes.forEach(function(type:any){                    
                        argsType=argsType+type.className+"','";            
                    }); 
                    if (argsType.length >1) {
                        argsType=argsType.substr(0, argsType.length - 2);
                    }
                    argsType=argsType+")";      
                    overload.implementation=function(){
                        console.warn("Hook "+WebViewClient_name+".shouldOverrideUrlLoading"+argsType+" succeed ......");
                        printStackTrace();
                        console.log("shouldOverrideUrlLoading->arg[0]:"+arguments[0].getUrl());
                        if (argsType.indexOf("WebResourceRequest")>-1) {
                        console.log("shouldOverrideUrlLoading->arg[1]:"+decodeURIComponent(arguments[1].getUrl()));
                        }else{
                        console.log("shouldOverrideUrlLoading->arg[1]:"+decodeURIComponent(arguments[1]));
                        }

                        var ret= overload.apply(this,arguments);
                        console.log("shouldOverrideUrlLoading ret="+ret);
                        return ret;
                    }

                    });

                    // WebViewClient.onReceivedSslError.implementation = function(arg1,arg2,arg3){
                    //   console.log("Hook "+WebViewClient_name+".onReceivedSslError() successful");
                    //   getStackTrace();
                    //   arg2.proceed();
                    //   return;
                    //  }

                    WebViewClient.stopLoading.implementation = function(){
                            console.warn("Hooking android.webkit.WebView.stopLoading() successful");
                            printStackTrace();
                            // this.stopLoading();
                            return;
                        }

                    WebViewClient.onPageFinished.implementation = function(p1:any,p2:any){
                            console.warn("Hooking android.webkit.WebView.onPageFinished() successful");

                            return;
                        }

                    

                } catch(e) {

                    if (e.message.indexOf('ClassNotFoundException') != -1) {

                    console.warn(WebViewClient_name + " not found!");
                    } else {
                    // throw new Error(e);
                    }
                }
                
                /**
                 * hook WebChromeClient methods
                 */
                var WebChromeClient_name="com.douyu.module.webview.H5WebActivity$H5WebChromeClient";
                try {
                    
                    var WebChromeClient = Java.use(WebChromeClient_name);
                
                      WebChromeClient.onJsPrompt.implementation = function(arg_0:any, arg_1:any, arg_2:any, arg_3:any, arg_4:any) {
                        console.warn("Hook "+WebChromeClient_name+".onJsPrompt() succeed ......");
                        console.log("WebChromeClient->onJsPrompt (argType: WebView): " + arg_0);
                        console.log("WebChromeClient->onJsPrompt (argType: java.lang.String): " + arg_1);
                        console.log("WebChromeClient->onJsPrompt (argType: java.lang.String): " + arg_2);
                        console.log("WebChromeClient->onJsPrompt (argType: java.lang.String): " + arg_3);
                        console.log("WebChromeClient->onJsPrompt (argType: JsPromptResult): " + arg_4);
                        var retval = this.onJsPrompt(arg_0, arg_1, arg_2, arg_3, arg_4);
                        console.log("WebChromeClient->onJsPrompt (retType: boolean): " + retval);
                        return retval;
                      }
                
                
                      WebChromeClient.onJsConfirm.implementation = function(arg_0:any, arg_1:any, arg_2:any, arg_3:any) {
                        console.warn("Hook "+WebChromeClient_name+".onJsConfirm() succeed ......");
                        console.log("WebChromeClient->onJsConfirm (argType: android.webkit.WebView): " + arg_0);
                        console.log("WebChromeClient->onJsConfirm (argType: java.lang.String): " + arg_1);
                        console.log("WebChromeClient->onJsConfirm (argType: java.lang.String): " + arg_2);
                        console.log("WebChromeClient->onJsConfirm (argType: JsConfirmResult): " + arg_3);
                        var retval = this.onJsConfirm(arg_0, arg_1, arg_2, arg_3);
                        console.log("WebChromeClient->onJsConfirm (retType: boolean): " + retval);
                        return retval;
                      }
                
                      WebChromeClient.onConsoleMessage.overload('com.miui.webkit_api.ConsoleMessage').implementation = function(arg_0:any) {
                        console.warn("Hook "+WebChromeClient_name+".onConsoleMessage() succeed ......");
                        console.log(arg_0.message())
                        var retval = this.onConsoleMessage(arg_0);
                        console.log("WebChromeClient->onConsoleMessage (retType: boolean): " + retval);
                        return retval;
                      }
                      WebChromeClient.onConsoleMessage.overload('java.lang.String', 'int', 'java.lang.String').implementation = function(arg_0:any,arg_1:any,arg_2:any) {
                        console.warn("Hook "+WebChromeClient_name+".onConsoleMessage() succeed ......");
                        console.log(arg_0);
                        console.log(arg_1);
                        console.log(arg_2);
                        var retval = this.onConsoleMessage(arg_0,arg_1,arg_2);
                        console.log("WebChromeClient->onConsoleMessage (retType: boolean): " + retval);
                        return retval;
                      }
                
                
                  } catch(e) {
                
                    if (e.message.indexOf('ClassNotFoundException') != -1) {
                
                      console.warn(WebChromeClient_name + " not found!");
                    } else {
                      // throw new Error(e);
                    }
                  }

                

            }
        });
    }
}
