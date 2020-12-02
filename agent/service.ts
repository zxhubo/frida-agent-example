'use strict'
import {traceMethod} from "./trace";
export class ServiceClass {
    hook(params:void) {
        Java.perform(function () {
            if(Java.available){
                var Service = "android.app.Service";

                traceMethod(Service,"startActivity",true,false);
                // traceMethod(Service,"startService",true,false);
                // traceMethod(Service,"bindService",true,false);
                // traceMethod(Service,"sendBroadcast",true,false);

            }
        });
    }
}
