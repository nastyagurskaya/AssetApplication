AssetMobileApp.eamAssetDetails = function(params, viewInfo) {
    "use strict";

    var id = params.id,
        eamasset = new AssetMobileApp.eamAssetViewModel(),
        shouldReload = false,
        openCreateViewAsRoot = viewInfo.layoutController.name === "split",
        isReady = $.Deferred(),
        dataSourceObservable = ko.observable(),
        dataSource;

    var glid =String(params.id);
    function handleDelete() {
        DevExpress.ui.dialog.confirm("Are you sure you want to delete this item?", "Delete item").then(function(result) {
            if(result)
                handleConfirmDelete();
        });
    }

    function handleConfirmDelete() {        
        AssetMobileApp.db.eamAsset.remove(id).done(function() {
            if(viewInfo.canBack) {
                AssetMobileApp.app.navigate("eamAsset", { target: "back" });
            }
            else {
                AssetMobileApp.app.navigate("Blank", { target: "current" });
            }
        });
    }

    function handleViewShowing() {
        glid = String(params.id);
        if (!dataSourceObservable()) {
            dataSourceObservable(dataSource);
            dataSource.load().always(function () {
                glid = String(params.id);
            });
        }
        else if (shouldReload) {
            refreshList();
        }
        AssetMobileApp.db.eamAsset.byKey(id).done(function(data) {
            eamasset.fromJS(data);
            isReady.resolve();
        });
        
    }
    function handleeamAssetControlledParameterModification() {
        shouldReload = true;
    }

    function handleViewDisposing() {
        AssetMobileApp.db.eamAssetControlledParameter.off("modified", handleeamAssetControlledParameterModification);
    }

    function refreshList() {
        shouldReload = false;
        dataSource.pageIndex(0);
        dataSource.load();
    }

    dataSource = new DevExpress.data.DataSource({
        store: AssetMobileApp.db.eamControlParamJournalItem,
        map: function (item) {
            var it = new AssetMobileApp.eamControlParamJournalItemViewModel(item);
            /*if (it.Asset +"" == id +"")*/ return it;
             
        },
        sort: "Code"//,
        //filter: ["Asset"+"", glid.toString()]
    });

    AssetMobileApp.db.eamAssetControlledParameter.on("modified", handleeamAssetControlledParameterModification);
    
    return {
        id: id,
        eamasset: eamasset,
        handleDelete: handleDelete,        
        dataSource: dataSourceObservable,
        refreshList: refreshList,
        viewShowing: handleViewShowing,
        viewDisposing: handleViewDisposing,
        openCreateViewAsRoot: openCreateViewAsRoot,
        isReady: isReady.promise()
    };
};