export function log(message: string): void {
    console.log(message);
}

export function printStackTrace(params:void) {
    var logClz = Java.use("android.util.Log");
    console.log(logClz.getStackTraceString(Java.use("java.lang.Exception").$new()));
}
