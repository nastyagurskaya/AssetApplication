AssetMobileApp.eamAssetControlParamPointEdit = function(params, viewInfo) {
    "use strict";

    var id = params.id,
        isNew = (id === undefined),
        isSplitLayout = viewInfo.layoutController.name === "split",
        eamassetcontrolparampoint = new AssetMobileApp.eamAssetControlParamPointViewModel(),
        isReady = $.Deferred();

    function load() {
        return AssetMobileApp.db.eamAssetControlParamPoint.byKey(id).done(function(data) {
            eamassetcontrolparampoint.fromJS(data);
        });
    }

    function update() {
        AssetMobileApp.db.eamAssetControlParamPoint.update(id, eamassetcontrolparampoint.toJS()).done(function() {
            AssetMobileApp.app.back();
        });
    }

    function insert() {
        AssetMobileApp.db.eamAssetControlParamPoint.insert(eamassetcontrolparampoint.toJS()).done(function(values, newId) {
            AssetMobileApp.app.navigate({ view: "eamAssetControlParamPointDetails", id: newId }, { target: "current" });
        });
    }

    function handleSave() {
        if(isNew)
            insert();
        else
            update();
    }

    function handleCancel() {
        if(!isNew) {
            AssetMobileApp.app.back();
        }
        else {
            if(isSplitLayout) {
                AssetMobileApp.app.navigate("Blank", { target: "current" });
            }
            else {
                AssetMobileApp.app.back();
            }
        }
    }

    function handleViewShowing() {
        if(!isNew)
            load().done(function() {
                isReady.resolve();
            });
        else {
            eamassetcontrolparampoint.clear();
            isReady.resolve();
        }
    }

    return {
        eamassetcontrolparampoint: eamassetcontrolparampoint,
        handleSave: handleSave,
        handleCancel: handleCancel,
        viewShowing: handleViewShowing,
        isReady: isReady.promise()
    };
};