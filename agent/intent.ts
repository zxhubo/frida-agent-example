'use strict'
import {traceMethod} from "./trace";
export class ActivityClass {
    hook(params:void) {
        Java.perform(function () {
            if(Java.available){
                var Intent:string = "android.content.Intent";
                traceMethod(Intent,"$init",true,false);  
                

            }
        });
    }
}
