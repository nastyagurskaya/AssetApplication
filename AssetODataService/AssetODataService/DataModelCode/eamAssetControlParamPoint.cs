using System;
using DevExpress.Xpo;
using DevExpress.Data.Filtering;
using System.Collections.Generic;
using System.ComponentModel;
namespace AssetODataService.DB_TN_EAM
{

    public partial class eamAssetControlParamPoint
    {
        public eamAssetControlParamPoint(Session session) : base(session) { }
        public override void AfterConstruction() { base.AfterConstruction(); }
    }

}
