(function() {
    AssetMobileApp.eamControlledParameterViewModel = function(data) {
            this.Oid = ko.observable();
            this.AsString = ko.observable();
            this.Code = ko.observable();
            this.Name = ko.observable();
            if(data)
                this.fromJS(data);
    };

    $.extend(AssetMobileApp.eamControlledParameterViewModel.prototype, {
        toJS: function() {
            return {
                Oid: this.Oid(),
                AsString: this.AsString(),
                Code: this.Code(),
                Name: this.Name(),
            };
        },

        fromJS: function(data) {
            if(data) {
                this.Oid(data.Oid);
                this.AsString(data.AsString);
                this.Code(data.Code);
                this.Name(data.Name);
            }
        },

        clear: function() {
            this.Oid(undefined);
            this.AsString(undefined);
            this.Code(undefined);
            this.Name(undefined);
        }
    });
})();