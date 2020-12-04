
// const http = require('http');
// const util = require('./util.js');
// const fs = require('frida-fs');



const android_log_write = new NativeFunction(Module.getExportByName(null, '__android_log_write'), 'int', ['int', 'pointer', 'pointer']);


function log(data){
    const tag = Memory.allocUtf8String("thor_test");
    const str = Memory.allocUtf8String(data);

    android_log_write(3, tag, str);
}


var isArm64 = null;
function check_Arm64(){

    if( isArm64 != null)
      return isArm64;


    var modules = Process.enumerateModules();
    for(var i = 0; i < modules.length; i++) {
              
        if( modules[i].name == "libc.so" ){

            //log(modules[i].path);
            if(modules[i].path.indexOf("/lib64/") != -1 ){

                 log("arm64");
                 isArm64 = true;
                 return true;

            } else {
                 log("arm32");
                 isArm64 = false;
                 return false;

            }

        }

    }

}




// var x = fs.readFileSync('/data/local/tmp/frida_js/AppInspector.config');


// var config = JSON.parse(x);

function Send(data){

    var post_data = JSON.stringify(data);

    var options = {
                     hostname:config["server_hostname"],     
                     port:config["server_port"],
                     path:config["server_path"],
                     method:'POST',
                     headers: {
                          'Content-Type':'application/json; charset=utf-8',
                          'Content-Length': post_data.length
                     }
                  };
    var req = http.request(options,function(res){
                   
              });
    req.write(post_data);
    req.end();

}

function isHttp(str){

   
        var method = ["GET", "POST", "HEAD", "PUT","DELETE","CONNECT","OPTIONS","TRACE","PATCH"];

        for(var i=0; i < method.length; i++) {

            if( str.trim().startsWith(method[i]))
                return true;

        }

        return false;
}


var pkg_name = "";

if (Java.available) {

    Java.perform(function() {




           var app = Java.use("android.app.Application");

           app.attachBaseContext.implementation = function(arg) {

                  //log("android.app.Application  attachBaseContext");
                  //log("android.app.Application  attachBaseContext " + arg.getPackageName() );

                  pkg_name = arg.getPackageName();

                  return this.attachBaseContext(arg);


           }




    });

}





Interceptor.attach(Module.findExportByName("libssl.so", "SSL_write"), {
    onEnter: function(args) {
      
     
       if (args[1] !=0) {

           var sdata = Memory.readCString(args[1]).trim();

          

           // if(!isHttp(sdata)){

           //     return;
           // }

        //    var data = util.GetJson(pkg_name,true,false, sdata);           
  
        //    Send(data);
         
            console.log(sdata);

       }
        
        
         
        
   
    },
});


Interceptor.attach(Module.findExportByName("libc.so", "sendto"), {
    onEnter: function(args) {
      

       if (args[1] !=0) {

           var data = Memory.readCString(args[1]).trim();
    

           // if( !isHttp(data) )  {
           //    return;
           // }

     

        //    var sdata = util.GetJson(pkg_name,false,false,data);   

        //    sdata["Tag"] = "socket_data";
           
        //    //log("sendto " + data);
        //    Send(sdata);
           
           console.log(data);

       }
        
         
       
    },
});




Interceptor.attach(Module.findExportByName("libc.so", "send"), {
    onEnter: function(args) {
      
     


       if (args[1] !=0) {
           var data = Memory.readCString(args[1]).trim();

        //    var sdata = util.GetJson(pkg_name,false,false,data);  

        //    sdata["Tag"] = "socket_data"; 
           
        //    sdata["Method"] = "send";

        //    Send(sdata);

            console.log(data);

       }
        
         
       
    },
});




var android_dlopen_ext = Module.findExportByName(null, "android_dlopen_ext");
//log("android_dlopen_ext addr: " + android_dlopen_ext);

if(android_dlopen_ext != null){
    Interceptor.attach(android_dlopen_ext,{
        onEnter: function(args){
            var soName = args[0].readCString();
            //log(  "loading: " + soName);

            
            if( (soName == "libwebviewchromium.so") || (soName == "libmonochrome.so") ){
                    this.hook = true;
             }
          
        },
        onLeave: function(retval){

            
             if(this.hook) { 

                    var soAddr = Module.findBaseAddress("libwebviewchromium.so");

                    var t1 =  Module.findExportByName("libwebviewchromium.so", "Java_org_chromium_android_1webview_AwContentsClientBridge_nativeProceedSslError");
             

                    if(soAddr == null){
                       soAddr = Module.findBaseAddress("libmonochrome.so");
                       t1 =  Module.findExportByName("libmonochrome.so", "Java_org_chromium_android_1webview_AwContentsClientBridge_nativeProceedSslError");
                
                    }

                    log("libwebviewchromium.so base addr: " + soAddr);

                
                    var off = check_Arm64() ?parseInt(config["SSL_write_offset_64"],16):parseInt(config["SSL_write_offset_32"],16);
                

                    var SSL_write_addr = soAddr.add(off);

                    log("off addr: " + SSL_write_addr);

                    Interceptor.attach(t1, {
                            onEnter: function(args) {
                              
                                 if( args[3] == 1){
                                    log( "nativeProceedSslError proceed"  );

                                    var data = util.GetJson(pkg_name,true,true, null);  
                                    data["Tag"] = "WebViewSslError"; 
                                    data["Class"] = "WebView_proceed"; 
           
                                    data["Method"] = "nativeProceedSslError";          

                                    Send(data);




                                 } else if ( args[3] == 0){

                                    log( "nativeProceedSslError cancel"  );

                                 }
                                
                            },
                    });


                    Interceptor.attach(SSL_write_addr, {
                        onEnter: function(args) {
                          
                           log("webview-SSL_write " + pkg_name);

                           if (args[1] !=0) {

                               var sdata = Memory.readCString(args[1]).trim();

                               

                               if(!isHttp(sdata)){

                                   return;
                               }

                               
                               var data = util.GetJson(pkg_name,true,true, sdata);            

                               Send(data);

                           }
                            
                             
                            
                       
                        },
                    });



             }



            
        }
    });
}













