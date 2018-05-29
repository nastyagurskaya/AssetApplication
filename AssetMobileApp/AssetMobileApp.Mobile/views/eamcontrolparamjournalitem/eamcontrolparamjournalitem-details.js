AssetMobileApp.eamControlParamJournalItemDetails = function(params, viewInfo) {
    "use strict";

    var id = params.id,
        eamcontrolparamjournalitem = new AssetMobileApp.eamControlParamJournalItemViewModel(),
        isReady = $.Deferred(),
        shouldReload = false,
        openCreateViewAsRoot = viewInfo.layoutController.name === "split",
        dataSourceObservable = ko.observable(),
        dataSource;

    function handleDelete() {
        DevExpress.ui.dialog.confirm("Are you sure you want to delete this item?", "Delete item").then(function(result) {
            if(result)
                handleConfirmDelete();
        });
    }

    function handleConfirmDelete() {        
        AssetMobileApp.db.eamControlParamJournalItem.remove(id).done(function() {
            if(viewInfo.canBack) {
                AssetMobileApp.app.navigate("eamControlParamJournalItem", { target: "back" });
            }
            else {
                AssetMobileApp.app.navigate("Blank", { target: "current" });
            }
        });
    }

    function handleViewShowing() {
        AssetMobileApp.db.eamControlParamJournalItem.byKey(id).done(function(data) {
            eamcontrolparamjournalitem.fromJS(data);
            isReady.resolve();
        });
        if (!dataSourceObservable()) {
            dataSourceObservable(dataSource);
            dataSource.load().always(function () {
                isReady.resolve();
            });
        }
        else if (shouldReload) {
            refreshList();
        }
    }

    function handleeamAssetControlParamPointModification() {
        shouldReload = true;
    }

   

    function handleViewDisposing() {
        AssetMobileApp.db.eamAssetControlParamPoint.off("modified", handleeamAssetControlParamPointModification);
    }

    function refreshList() {
        shouldReload = false;
        dataSource.pageIndex(0);
        dataSource.load();
    }

    dataSource = new DevExpress.data.DataSource({
        store: AssetMobileApp.db.eamAssetControlParamPoint,
        map: function (item) {
            return new AssetMobileApp.eamAssetControlParamPointViewModel(item);
        }
    });



    return {
        id: id,
        eamcontrolparamjournalitem: eamcontrolparamjournalitem,
        handleDelete: handleDelete,        
        viewShowing: handleViewShowing,
        isReady: isReady.promise(),
        dataSource: dataSourceObservable,
        refreshList: refreshList,
        viewDisposing: handleViewDisposing,
        openCreateViewAsRoot: openCreateViewAsRoot
    };
};