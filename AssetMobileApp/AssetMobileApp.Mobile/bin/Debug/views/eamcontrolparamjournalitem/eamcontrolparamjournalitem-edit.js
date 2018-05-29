AssetMobileApp.eamControlParamJournalItemEdit = function(params, viewInfo) {
    "use strict";

    var id = params.id,
        isNew = (id === undefined),
        isSplitLayout = viewInfo.layoutController.name === "split",
        eamcontrolparamjournalitem = new AssetMobileApp.eamControlParamJournalItemViewModel(),
        isReady = $.Deferred();

    function load() {
        return AssetMobileApp.db.eamControlParamJournalItem.byKey(id).done(function(data) {
            eamcontrolparamjournalitem.fromJS(data);
        });
    }

    function update() {
        AssetMobileApp.db.eamControlParamJournalItem.update(id, eamcontrolparamjournalitem.toJS()).done(function() {
            AssetMobileApp.app.back();
        });
    }

    function insert() {
        AssetMobileApp.db.eamControlParamJournalItem.insert(eamcontrolparamjournalitem.toJS()).done(function(values, newId) {
            AssetMobileApp.app.navigate({ view: "eamControlParamJournalItemDetails", id: newId }, { target: "current" });
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
            eamcontrolparamjournalitem.clear();
            isReady.resolve();
        }
    }

    return {
        eamcontrolparamjournalitem: eamcontrolparamjournalitem,
        handleSave: handleSave,
        handleCancel: handleCancel,
        viewShowing: handleViewShowing,
        isReady: isReady.promise()
    };
};