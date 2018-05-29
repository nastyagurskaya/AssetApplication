(function() {
    AssetMobileApp.eamAssetControlledParameterViewModel = function(data) {
            this.Oid = ko.observable();
            this.AsString = ko.observable();
            this.Code = ko.observable();
            this.Name = ko.observable();
            this.Asset = ko.observable();
            this.ControlledParameter = ko.observable();
            this.Value = ko.observable();
            if(data)
                this.fromJS(data);
    };

    $.extend(AssetMobileApp.eamAssetControlledParameterViewModel.prototype, {
        toJS: function() {
            return {
                Oid: this.Oid(),
                AsString: this.AsString(),
                Code: this.Code(),
                Name: this.Name(),
                Asset: this.Asset(),
                ControlledParameter: this.ControlledParameter(),
                Value: String(this.Value() || 0),
            };
        },

        fromJS: function(data) {
            if(data) {
                this.Oid(data.Oid);
                this.AsString(data.AsString);
                this.Code(data.Code);
                this.Name(data.Name);
                this.Asset(data.Asset);
                this.ControlledParameter(data.ControlledParameter);
                this.Value(Number(data.Value));
            }
        },

        clear: function() {
            this.Oid(undefined);
            this.AsString(undefined);
            this.Code(undefined);
            this.Name(undefined);
            this.Asset(undefined);
            this.ControlledParameter(undefined);
            this.Value(undefined);
        }
    });
})();