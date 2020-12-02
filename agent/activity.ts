'use strict'
import {traceMethod} from "./trace";
export class ActivityClass {
    hook(params:void) {
        Java.perform(function () {
            if(Java.available){
                var Activity="android.app.Activity";
                  // traceMethod(Activity,"finish",true,false);
                traceMethod(Activity,"startActivity",true,false);
                // traceMethod(Activity,"startActivityForResult",true,false);
                // traceMethod(Activity,"startActivityAsUser",true,false);
                // traceMethod(Activity,"startActivityIfNeeded",true,false);
                // traceMethod(Activity,"startService",true,false);
                // traceMethod(Activity,"bindService",true,false);
                // traceMethod(Activity,"sendBroadcast",true,false);
                

            }
        });
    }
}
