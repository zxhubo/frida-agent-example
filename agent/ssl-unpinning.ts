'use strict'
import {traceMethod} from "./trace";
export class SSLUnpinningClass {
    hook(params:void) {
        Java.perform(function () {
            if(Java.available){
                

                /*
                * hook class okhttp3.CertificatePinner 
                * hook method check
                */
               var className_certificatePinner:string = "okhttp3.CertificatePinner";
                try {

                    	
                    traceMethod(className_certificatePinner,"check",false,true);
                    // traceMethod(className_certificatePinner,"check$okhttp",true);

                } catch(e) {

                
                    if (e.message.indexOf('ClassNotFoundException') != -1) {

                        console.warn(className_certificatePinner + " not found!");
                    } else {

                        throw new Error(e);

                    }
                }

                /*
                * hook class com.android.org.conscrypt.Platform 
                * hook method checkServerTrusted
                */
               var className_platform_1 = "com.android.org.conscrypt.Platform";
                try {

                    	
                    traceMethod(className_platform_1,"checkServerTrusted",false,true);

                } catch(e) {

                
                    if (e.message.indexOf('ClassNotFoundException') != -1) {

                        console.warn(className_platform_1 + " not found!");
                    } else {

                        throw new Error(e);

                    }
                }


                /*
                * hook class org.conscrypt.Platform 
                * hook method checkServerTrusted
                */
               var className_platform_2 = "org.conscrypt.Platform";
                try {

                        	
                        traceMethod(className_platform_2,"checkServerTrusted",false,true);

                } catch(e) {

                
                    if (e.message.indexOf('ClassNotFoundException') != -1) {

                        console.warn(className_platform_2 + " not found!");
                    } else {

                        throw new Error(e);

                    }


                }



                /*
                * hook class android.webkit.WebViewClient，但是在实际情况中，都是继承WebViewClient然后重写账这几个函数，因此需要填入实际的类名
                * hook method onReceivedSslError、stopLoading、onReceivedError
                */
               var classNname_webViewClient = "android.webkit.WebViewClient";
                try {
                        
                        // var class_name = "com.tencent.smtt.sdk.WebViewClient";

                        traceMethod(classNname_webViewClient,"onReceivedSslError",false,true);
                        // traceMethod(class_name,"stopLoading",false,true);
                        traceMethod(classNname_webViewClient,"onReceivedError",false,true);

                } catch(e) {

                
                    if (e.message.indexOf('ClassNotFoundException') != -1) {

                        console.warn(classNname_webViewClient + " not found!");
                    } else {

                        throw new Error(e);

                    }


                }

                /**
                 * 这种情况一般发生在用户自定义了SSLSocketFactory的时候才会使用得到，并且都会实现接口X509TrustManager重写
                 * X509TrustManager的checkServerTrusted函数，因此这里的类名需要根据实际的X509TrustManager的子类名填写
                 */

                var className_x509TrustManager = "javax.net.ssl.X509TrustManager";
                try{

                        	
                        traceMethod(className_x509TrustManager,"checkServerTrusted",false,true);
                }catch(e){
                    if (e.message.indexOf('ClassNotFoundException') != -1) {

                        console.log(className_x509TrustManager + " not found!");
                    } else {

                        throw new Error(e);

                    }
                    
                }



            }
        });
    }
}
