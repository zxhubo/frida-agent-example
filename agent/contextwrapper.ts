'use strict'
import {traceMethod} from "./trace";
export class ContextWrapperClass {
    hook(params:void) {
        Java.perform(function () {
            if(Java.available){
                var ContextWrapper = "android.content.ContextWrapper";

                traceMethod(ContextWrapper,"startActivity",true,false);
                // traceMethod(ContextWrapper,"startActivityAsUser",true,false);
                // traceMethod(ContextWrapper,"startService",true,false);
                // traceMethod(ContextWrapper,"bindService",true,false);
                // traceMethod(ContextWrapper,"sendBroadcast",true,false);
                

            }
        });
    }
}
