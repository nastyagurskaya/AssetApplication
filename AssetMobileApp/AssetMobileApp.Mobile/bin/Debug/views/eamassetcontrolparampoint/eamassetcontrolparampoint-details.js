AssetMobileApp.eamAssetControlParamPointDetails = function(params, viewInfo) {
    "use strict";

    var id = params.id,
        eamassetcontrolparampoint = new AssetMobileApp.eamAssetControlParamPointViewModel(),
        isReady = $.Deferred();

    function handleDelete() {
        DevExpress.ui.dialog.confirm("Are you sure you want to delete this item?", "Delete item").then(function(result) {
            if(result)
                handleConfirmDelete();
        });
    }

    function handleConfirmDelete() {        
        AssetMobileApp.db.eamAssetControlParamPoint.remove(id).done(function() {
            if(viewInfo.canBack) {
                AssetMobileApp.app.navigate("eamAssetControlParamPoint", { target: "back" });
            }
            else {
                AssetMobileApp.app.navigate("Blank", { target: "current" });
            }
        });
    }

    function handleViewShowing() {
        AssetMobileApp.db.eamAssetControlParamPoint.byKey(id).done(function(data) {
            eamassetcontrolparampoint.fromJS(data);
            isReady.resolve();
        });
    }

    return {
        id: id,
        eamassetcontrolparampoint: eamassetcontrolparampoint,
        handleDelete: handleDelete,        
        viewShowing: handleViewShowing,
        isReady: isReady.promise()
    };
};