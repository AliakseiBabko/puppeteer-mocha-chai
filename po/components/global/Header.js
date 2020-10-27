'use strict';

class Header{
        constructor() {
        this.NavigationPanel = '.b-main-navigation';
        this.NavigationPanel_CatalogButton = '.b-main-navigation > li:nth-of-type(1)';
        this.NavigationPanel_NewsButton = '.b-main-navigation > li:nth-of-type(2)';
        this.NavigationPanel_AutomarketButton = '.b-main-navigation > li:nth-of-type(3)';
        this.NavigationPanel_HousesButton = '.b-main-navigation > li:nth-of-type(4)';
        this.NavigationPanel_ServicesButton = '.b-main-navigation > li:nth-of-type(5)';
        this.NavigationPanel_ForumButton = '.b-main-navigation > li:nth-of-type(6)';

        this.searchField = 'input[name="query"]';
        };
}

module.exports = Header;