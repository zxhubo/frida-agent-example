'use strict'
import { printStackTrace } from "./logger";
import {traceMethod} from "./trace";
export class MiscClass {
    hook(params:void) {
        Java.perform(function () {
            if(Java.available){

                traceMethod("android.widget.Toast","show",true,false);
                traceMethod("android.app.Dialog","show",true,false);
                traceMethod("java.lang.System","load",true,false);
                traceMethod("dalvik.system.DexClassLoader","$init",true,false);
                traceMethod("dalvik.system.DexClassLoader","loadClass",true,false);

             
            }
        });
    }
}
