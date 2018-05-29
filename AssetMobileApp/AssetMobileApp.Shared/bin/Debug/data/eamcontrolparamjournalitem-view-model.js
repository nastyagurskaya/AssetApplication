(function() {
    AssetMobileApp.eamControlParamJournalItemViewModel = function(data) {
            this.Oid = ko.observable();
            this.AsString = ko.observable();
            this.Code = ko.observable();
            this.Name = ko.observable();
            this.Asset = ko.observable();
            this.AssetControlledParameterPoint = ko.observable();
            this.Value = ko.observable();
            this.Date = ko.observable();
            if(data)
                this.fromJS(data);
    };
    $.extend(AssetMobileApp.eamControlParamJournalItemViewModel.prototype, {
        toJS: function() {
            return {
                Oid: this.Oid(),
                AsString: this.AsString(),
                Code: this.Code(),
                Name: this.Name(),
                Asset: this.Asset(),
                AssetControlledParameterPoint: this.AssetControlledParameterPoint(),
                Value: String(this.Value() || 0),
                Date: this.Date(),
            };
        },

        fromJS: function(data) {
            if(data) {
                this.Oid(data.Oid);
                this.AsString(data.AsString);
                this.Code(data.Code);
                this.Name(data.Name);
                this.Asset(data.Asset);
                this.AssetControlledParameterPoint(data.AssetControlledParameterPoint);
                this.Value(Number(data.Value));
                this.Date(data.Date);
            }
        },

        clear: function() {
            this.Oid(undefined);
            this.AsString(undefined);
            this.Code(undefined);
            this.Name(undefined);
            this.Asset(undefined);
            this.AssetControlledParameterPoint(undefined);
            this.Value(undefined);
            this.Date(undefined);
        }
    });
})();