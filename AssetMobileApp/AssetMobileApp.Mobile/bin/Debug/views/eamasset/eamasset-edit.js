AssetMobileApp.eamAssetEdit = function(params, viewInfo) {
    "use strict";

    var id = params.id,
        isNew = (id === undefined),
        isSplitLayout = viewInfo.layoutController.name === "split",
        eamasset = new AssetMobileApp.eamAssetViewModel(),
        isReady = $.Deferred();

    function load() {
        return AssetMobileApp.db.eamAsset.byKey(id).done(function(data) {
            eamasset.fromJS(data);
        });
    }

    function update() {
        AssetMobileApp.db.eamAsset.update(id, eamasset.toJS()).done(function() {
            AssetMobileApp.app.back();
        });
    }

    function insert() {
        AssetMobileApp.db.eamAsset.insert(eamasset.toJS()).done(function(values, newId) {
            AssetMobileApp.app.navigate({ view: "eamAssetDetails", id: newId }, { target: "current" });
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
            eamasset.clear();
            isReady.resolve();
        }
    }

    return {
        eamasset: eamasset,
        handleSave: handleSave,
        handleCancel: handleCancel,
        viewShowing: handleViewShowing,
        isReady: isReady.promise()
    };
};