AssetMobileApp.eamAsset = function(params, viewInfo) {
    "use strict";

    var shouldReload = false,
        openCreateViewAsRoot = viewInfo.layoutController.name === "split",
        isReady = $.Deferred(),
        dataSourceObservable = ko.observable(),
        dataSource;

    function handleeamAssetModification() {
        shouldReload = true;
    }

    function handleViewShowing() {
        if(!dataSourceObservable()) {
            dataSourceObservable(dataSource);
            dataSource.load().always(function() {
                isReady.resolve();
            });
        }
        else if(shouldReload) {
            refreshList();
        }
    }

    function handleViewDisposing() {
        AssetMobileApp.db.eamAsset.off("modified", handleeamAssetModification);
    }

    function refreshList() {
        shouldReload = false;
        dataSource.pageIndex(0);
        dataSource.load();
    }

    dataSource = new DevExpress.data.DataSource({
        store: AssetMobileApp.db.eamAsset,
        map: function(item) {
            return new AssetMobileApp.eamAssetViewModel(item);
        },
        sort: "Name"
    });

    AssetMobileApp.db.eamAsset.on("modified", handleeamAssetModification);

    return {
        isReady: isReady.promise(),
        dataSource: dataSourceObservable,
        refreshList: refreshList,
        viewShowing: handleViewShowing,
        viewDisposing: handleViewDisposing,
        openCreateViewAsRoot: openCreateViewAsRoot
    };   
};