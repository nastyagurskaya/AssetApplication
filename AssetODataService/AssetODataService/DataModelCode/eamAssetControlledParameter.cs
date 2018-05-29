using System;
using DevExpress.Xpo;
using DevExpress.Data.Filtering;
using System.Collections.Generic;
using System.ComponentModel;
namespace AssetODataService.DB_TN_EAM
{

    public partial class eamAssetControlledParameter
    {
        public eamAssetControlledParameter(Session session) : base(session) { }
        public override void AfterConstruction() { base.AfterConstruction(); }
    }

}
