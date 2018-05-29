// NOTE object below must be a valid JSON
window.AssetMobileApp = $.extend(true, window.AssetMobileApp, {
    "config": {
        "layoutSet": "navbar",
        "animationSet": "default",
        "navigation": [
            {
                "title": "eam Asset",
                "onExecute": "#eamAsset",
                "icon": "eamasset"
            },
            //{
            //    "title": "eam Asset Controlled Parameter",
            //    "onExecute": "#eamAssetControlledParameter",
            //    "icon": "eamassetcontrolledparameter"
            //},
            //{
            //    "title": "eam Asset Control Param Point",
            //    "onExecute": "#eamAssetControlParamPoint",
            //    "icon": "eamassetcontrolparampoint"
            //},
            //{
            //    "title": "eam Control Param Journal Item",
            //    "onExecute": "#eamControlParamJournalItem",
            //    "icon": "eamcontrolparamjournalitem"
            //},
            {
                "title": "About",
                "onExecute": "#About",
                "icon": "info"
            }
        ]
    }
});
