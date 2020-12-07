// 'use strict'
// @ts-nocheck
import {traceMethod} from "./trace";
export class OpenCommonClass {
    hook(params:void) {
        Java.perform(function () {
            if(Java.available){
                console.log("[+] dump dex start ......");
                
                // var exports = Module.enumerateExportsSync("libart.so");
                // for(var i=0;i<exports.length;i++){
                    
                //     var name =exports[i].name;
                //     c=exports[i].address;

                //     // if(name=="_ZN3art7DexFile10OpenCommonEPKhjRKNSt3__112basic_stringIcNS3_11char_traitsIcEENS3_9allocatorIcEEEEjPKNS_10OatDexFileEbbPS9_PNS0_12VerifyResultE"){
                //     if(name.indexOf("OpenCommon")!=-1){

                //         console.log("[***]"+name +" at :"+c);
                //         break;
                //     }
                    
                        
                    
                // }


                var so_name:string;
                var method_name:string;
                var method_address:any;
                var sdk_int:number = Java.use("android.os.Build$VERSION").SDK_INT.value;
                if(29 <= sdk_int){
                    so_name = "libdexfile.so";
                    method_name = "art13DexFileLoader10OpenCommon";
                }else if(26<=sdk_int && sdk_int < 29){
                    so_name = "libart.so";
                    method_name = "OpenCommon";
                }else if(26 > sdk_int){
                    so_name = "libart.so";
                    method_name = "OpenMemory";
                }

                var modules = Process.enumerateModules();

                modules.forEach(function(module){
                    if(module.name == so_name){
                        var exports = module.enumerateExports();
                        exports.forEach(function(exportMethod){
                            if(exportMethod.name.indexOf(method_name) != -1){
                                console.log(exportMethod.name);
                                method_address = exportMethod.address;
                                return;
                            }
                        });
                    }
                });

                
                var nativePointer=new NativePointer(method_address);
                Interceptor.attach(nativePointer,{
                    onEnter: function (args) {
                        console.log("[*] hook OpenCommond succeed ......");
                        //dex起始位置
                
                        //32位的libart.so 
                        // var begin = args[1];
                        //64位的libart.so 
                        var begin = this.context.x0;
                        //打印magic
                        console.log("magic : " + Memory.readUtf8String(begin));
                        //dex fileSize 地址
                        //var address = parseInt(begin,16) + 0x20
                        var address = ptr(parseInt(begin,16)).add(0x20);
                        //dex 大小
                        var dex_size = Memory.readInt(ptr(address));
                
                        console.log("dex_size :" + dex_size);
                        //dump dex 到/data/data/pkg/目录下
                        
                        var file = new File("/data/data/com.lite.lanxin/" + dex_size + ".dex", "wb");
                        file.write(Memory.readByteArray(begin, dex_size));
                        file.flush();
                        file.close();
                    },
                    onLeave: function (retval) {
                        if (retval.toInt32() > 0) {
                            /* do something */
                        }
                    }
                });
            }
        });
    }
}
