AssetMobileApp.eamAssetControlledParameter = function(params, viewInfo) {
    "use strict";

    var shouldReload = false,
        openCreateViewAsRoot = viewInfo.layoutController.name === "split",
        isReady = $.Deferred(),
        dataSourceObservable = ko.observable(),
        dataSource;

    function handleeamAssetControlledParameterModification() {
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
        AssetMobileApp.db.eamAssetControlledParameter.off("modified", handleeamAssetControlledParameterModification);
    }

    function refreshList() {
        shouldReload = false;
        dataSource.pageIndex(0);
        dataSource.load();
    }

    dataSource = new DevExpress.data.DataSource({
        store: AssetMobileApp.db.eamAssetControlledParameter,
        map: function(item) {
            return new AssetMobileApp.eamAssetControlledParameterViewModel(item);
        }
    });

    AssetMobileApp.db.eamAssetControlledParameter.on("modified", handleeamAssetControlledParameterModification);

    return {
        isReady: isReady.promise(),
        dataSource: dataSourceObservable,
        refreshList: refreshList,
        viewShowing: handleViewShowing,
        viewDisposing: handleViewDisposing,
        openCreateViewAsRoot: openCreateViewAsRoot
    };   
};