Java.perform(function() {
    var RootBeer = Java.use('com.scottyab.rootbeer.RootBeer');
    var Build = Java.use('android.os.Build');
    var Runtime = Java.use('java.lang.Runtime');
    var SystemProperties = Java.use('android.os.SystemProperties');
    var File = Java.use('java.io.File');

    console.log('[*] MEGA-COMBINED BYPASS STARTING...');

    // 1. RootBeer Methods Bypass
    var rootbeerMethods = ['detectTestKeys', 'detectRootManagementApps', 
                           'detectPotentiallyDangerousApps', 'detectRootCloakingApps', 
                           'checkForBinary', 'checkForSuBinary', 'checkForDangerousProps', 
                           'checkForRWPaths', 'checkSuExists', 'isRooted'];

    rootbeerMethods.forEach(function(method) {
        try {
            RootBeer[method].overload().implementation = function() { return false; };
            RootBeer[method].overload('java.lang.String').implementation = function(s) { return false; };
        } catch(e) {}
    });

    // 2. Build Tags Fix (For TestKeys)
    try {
        Build.TAGS.value = "release-keys";
    } catch(e) {}

    // 3. System Properties (For Dangerous Props)
    SystemProperties.get.overload('java.lang.String').implementation = function(name) {
        if (name.includes("debuggable") || name.includes("tags")) return "0";
        if (name.includes("secure")) return "1";
        return this.get(name);
    };

    // 4. Runtime Exec (For shell checks)
    Runtime.exec.overload('java.lang.String').implementation = function(cmd) {
        if (cmd.includes("getprop") || cmd.includes("su") || cmd.includes("busybox")) {
            console.log('[+] Blocked Runtime.exec: ' + cmd);
            return this.exec("echo release-keys");
        }
        return this.exec(cmd);
    };

    // 5. File Exists (For SU/Busybox files)
    File.exists.implementation = function () {
        var name = this.getName();
        if (name === "su" || name === "busybox") {
            return false;
        }
        return this.exists();
    };

    console.log('[+] ALL HOOKS INSTALLED - 100% GREEN TARGETED !');
});
