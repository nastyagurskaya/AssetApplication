// NOTE object below must be a valid JSON
window.AssetMobileApp = $.extend(true, window.AssetMobileApp, {
    "config": {
        "endpoints": {
            "db": {
                "local": "http://localhost:60084/AssetODataService.svc/",
                "production": "http://localhost:60084/AssetODataService.svc/"
            }
        },
        "services": {
            "db": {
                "entities": {
                    "eamAsset": { 
                        "key": "Oid", 
                        "keyType": "Guid" 
                    },
                    "eamAssetControlledParameter": { 
                        "key": "Oid", 
                        "keyType": "Guid" 
                    },
                    "eamAssetControlParamPoint": { 
                        "key": "Oid", 
                        "keyType": "Guid" 
                    },
                    "eamControlledParameter": { 
                        "key": "Oid", 
                        "keyType": "Guid" 
                    },
                    "eamControlParamJournalItem": { 
                        "key": "Oid", 
                        "keyType": "Guid" 
                    },
                    "eamControlPoint": { 
                        "key": "Oid", 
                        "keyType": "Guid" 
                    }
                }
            }
        }
    }
});
