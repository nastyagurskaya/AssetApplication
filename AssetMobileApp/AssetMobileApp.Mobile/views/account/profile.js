Application4.Profile = function(params) {
    "use strict";

    var username = ko.observable('');

    var credentials = Application4.authentication.getCredentials();
    if(credentials)
        username(credentials.username);

    function hideProfileNavigationItem() {
        var profileItem = $.grep(Application4.app.navigation, function(e) { return e.option().id == 'Profile' })[0];
        profileItem.option("visible", false);
    }

    function logout() {
        Application4.authentication.logout();
        Application4.app.navigate('', { root: true });
        Application4.app.viewCache.clear();
        hideProfileNavigationItem();
    }

    var viewModel = {
        username: username,
        logoutClick: logout
    };

    return viewModel;
};