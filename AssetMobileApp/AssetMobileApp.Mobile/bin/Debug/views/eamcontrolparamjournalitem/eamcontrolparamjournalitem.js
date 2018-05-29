AssetMobileApp.eamControlParamJournalItem = function(params, viewInfo) {
    "use strict";

    var shouldReload = false,
        openCreateViewAsRoot = viewInfo.layoutController.name === "split",
        isReady = $.Deferred(),
        dataSourceObservable = ko.observable(),
        dataSource;

    function handleeamControlParamJournalItemModification() {
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
        AssetMobileApp.db.eamControlParamJournalItem.off("modified", handleeamControlParamJournalItemModification);
    }

    function refreshList() {
        shouldReload = false;
        dataSource.pageIndex(0);
        dataSource.load();
    }

    dataSource = new DevExpress.data.DataSource({
        store: AssetMobileApp.db.eamControlParamJournalItem,
        map: function(item) {
            return new AssetMobileApp.eamControlParamJournalItemViewModel(item);
        }
    });

    AssetMobileApp.db.eamControlParamJournalItem.on("modified", handleeamControlParamJournalItemModification);

    return {
        isReady: isReady.promise(),
        dataSource: dataSourceObservable,
        refreshList: refreshList,
        viewShowing: handleViewShowing,
        viewDisposing: handleViewDisposing,
        openCreateViewAsRoot: openCreateViewAsRoot
    };   
};