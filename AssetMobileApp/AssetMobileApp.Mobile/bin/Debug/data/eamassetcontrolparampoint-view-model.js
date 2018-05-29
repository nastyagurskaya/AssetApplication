(function() {
    AssetMobileApp.eamAssetControlParamPointViewModel = function(data) {
            this.Oid = ko.observable();
            this.AsString = ko.observable();
            this.Code = ko.observable();
            this.Name = ko.observable();
            this.AssetControlledParameter = ko.observable();
            this.Asset = ko.observable();
            this.ControlPoint = ko.observable();
            this.Value = ko.observable();
            if(data)
                this.fromJS(data);
    };

    $.extend(AssetMobileApp.eamAssetControlParamPointViewModel.prototype, {
        toJS: function() {
            return {
                Oid: this.Oid(),
                AsString: this.AsString(),
                Code: this.Code(),
                Name: this.Name(),
                AssetControlledParameter: this.AssetControlledParameter(),
                Asset: this.Asset(),
                ControlPoint: this.ControlPoint(),
                Value: String(this.Value() || 0),
            };
        },

        fromJS: function(data) {
            if(data) {
                this.Oid(data.Oid);
                this.AsString(data.AsString);
                this.Code(data.Code);
                this.Name(data.Name);
                this.AssetControlledParameter(data.AssetControlledParameter);
                this.Asset(data.Asset);
                this.ControlPoint(data.ControlPoint);
                this.Value(Number(data.Value));
            }
        },

        clear: function() {
            this.Oid(undefined);
            this.AsString(undefined);
            this.Code(undefined);
            this.Name(undefined);
            this.AssetControlledParameter(undefined);
            this.Asset(undefined);
            this.ControlPoint(undefined);
            this.Value(undefined);
        }
    });
})();