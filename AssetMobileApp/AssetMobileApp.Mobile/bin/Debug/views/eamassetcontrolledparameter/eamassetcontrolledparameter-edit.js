AssetMobileApp.eamAssetControlledParameterEdit = function(params, viewInfo) {
    "use strict";

    var id = params.id,
        isNew = (id === undefined),
        isSplitLayout = viewInfo.layoutController.name === "split",
        eamassetcontrolledparameter = new AssetMobileApp.eamAssetControlledParameterViewModel(),
        isReady = $.Deferred();

    function load() {
        return AssetMobileApp.db.eamAssetControlledParameter.byKey(id).done(function(data) {
            eamassetcontrolledparameter.fromJS(data);
        });
    }

    function update() {
        AssetMobileApp.db.eamAssetControlledParameter.update(id, eamassetcontrolledparameter.toJS()).done(function() {
            AssetMobileApp.app.back();
        });
    }

    function insert() {
        AssetMobileApp.db.eamAssetControlledParameter.insert(eamassetcontrolledparameter.toJS()).done(function(values, newId) {
            AssetMobileApp.app.navigate({ view: "eamAssetControlledParameterDetails", id: newId }, { target: "current" });
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
            eamassetcontrolledparameter.clear();
            isReady.resolve();
        }
    }

    return {
        eamassetcontrolledparameter: eamassetcontrolledparameter,
        handleSave: handleSave,
        handleCancel: handleCancel,
        viewShowing: handleViewShowing,
        isReady: isReady.promise()
    };
};