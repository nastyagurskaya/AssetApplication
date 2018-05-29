$(function() {
    var startupView = "eamAsset";

    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    // DevExpress.devices.current({ platform: "generic" });

    if(DevExpress.devices.real().platform === "win") {
        $("body").css("background-color", "#000");
    }

    var isDeviceReady = false,
        isViewShown = false;

    function hideSplashScreen() {
        if(isDeviceReady && isViewShown) {
            navigator.splashscreen.hide();
        }
    }

	if(document.addEventListener) {
		document.addEventListener("deviceready", function () {
			isDeviceReady = true;
			hideSplashScreen();
			document.addEventListener("backbutton", function () {
				DevExpress.processHardwareBackButton();
			}, false);
		}, false);
	}

    function onViewShown() {
        isViewShown = true;
        hideSplashScreen();
        AssetMobileApp.app.off("viewShown", onViewShown);
    }

    function onNavigatingBack(e) {
        if(e.isHardwareButton && !AssetMobileApp.app.canBack()) {
            e.cancel = true;
            exitApp();
        }
    }

    function exitApp() {
        switch (DevExpress.devices.real().platform) {
            case "android":
                navigator.app.exitApp();
                break;
            case "win":
                MSApp.terminateApp('');
                break;
        }
    }

    var layoutSet = DevExpress.framework.html.layoutSets[AssetMobileApp.config.layoutSet],
        navigation = AssetMobileApp.config.navigation;


    AssetMobileApp.app = new DevExpress.framework.html.HtmlApplication({
        namespace: AssetMobileApp,
        layoutSet: layoutSet,
        animationSet: DevExpress.framework.html.animationSets[AssetMobileApp.config.animationSet],
        navigation: navigation,
        commandMapping: AssetMobileApp.config.commandMapping,
        navigateToRootViewMode: "keepHistory",
        useViewTitleAsBackText: true
    });

    $(window).on("unload", function() {
        AssetMobileApp.app.saveState();
    });

    AssetMobileApp.app.router.register(":view/:id", { view: startupView, id: undefined });
    AssetMobileApp.app.on("viewShown", onViewShown);
    AssetMobileApp.app.on("navigatingBack", onNavigatingBack);
    AssetMobileApp.app.navigate();
});