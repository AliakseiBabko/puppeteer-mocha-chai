'use strict';

class Header{
        constructor() {

        this.Header = '.g-top';
        this.NavigationPanel = '.b-main-navigation';
        /*  
        this.CatalogButton = this.Header.NavigationPanel.$('li:nth-of-type(1)');
        this.NewsButton = this.Header.NavigationPanel.$('li:nth-of-type(2)');
        this.AutomarketButton = this.Header.NavigationPanel.$('li:nth-of-type(3)');
        this.HousesButton = this.Header.NavigationPanel.$('li:nth-of-type(4)');
        this.ServicesButton = this.Header.NavigationPanel.$('li:nth-of-type(5)');
        this.ForumButton = this.Header.NavigationPanel.$('li:nth-of-type(6)');

        this.NewsDropdownItems = this.Header.NavigationPanel.NewsButton.$$('.b-main-navigation__dropdown-title-link');
        this.AutomarketDropdownItems = this.Header.NavigationPanel.AutomarketButton.$$('.mega-sub-menu .mega-menu-link');
        this.HousesItems = this.Header.NavigationPanel.HousesButton.$$('.mega-sub-menu .mega-menu-link');
        */
        this.searchField = 'input[name="query"]';
        };
}

module.exports = Header;