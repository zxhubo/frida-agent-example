'use strict'

import * as webview from "./webview";
import * as activity from "./activity";
import * as service from "./service";
import * as contextwrapper from "./contextwrapper";
import * as misc from "./misc";


/**
 * 整个 Frida hook 脚本的启动入口
 * @param params 
 */
function main(params:void):void {
    console.error("[+++] Frida hook start ......");
    new webview.WebViewClass().hook();
    new activity.ActivityClass().hook();
    new service.ServiceClass().hook();
    new contextwrapper.ContextWrapperClass().hook();
    new misc.MiscClass().hook();
}

main();
