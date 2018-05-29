AssetMobileApp.eamAssetControlledParameterDetails = function(params, viewInfo) {
    "use strict";

    var id = params.id,
        eamassetcontrolledparameter = new AssetMobileApp.eamAssetControlledParameterViewModel(),
        isReady = $.Deferred();

    function handleDelete() {
        DevExpress.ui.dialog.confirm("Are you sure you want to delete this item?", "Delete item").then(function(result) {
            if(result)
                handleConfirmDelete();
        });
    }

    function handleConfirmDelete() {        
        AssetMobileApp.db.eamAssetControlledParameter.remove(id).done(function() {
            if(viewInfo.canBack) {
                AssetMobileApp.app.navigate("eamAssetControlledParameter", { target: "back" });
            }
            else {
                AssetMobileApp.app.navigate("Blank", { target: "current" });
            }
        });
    }

    function handleViewShowing() {
        AssetMobileApp.db.eamAssetControlledParameter.byKey(id).done(function(data) {
            eamassetcontrolledparameter.fromJS(data);
            isReady.resolve();
        });
    }

    return {
        id: id,
        eamassetcontrolledparameter: eamassetcontrolledparameter,
        handleDelete: handleDelete,        
        viewShowing: handleViewShowing,
        isReady: isReady.promise()
    };
};