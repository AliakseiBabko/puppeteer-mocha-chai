'use strict';

const BasePage = require("./BasePage");

class CatalogPageTV extends BasePage{
	constructor (){
        super();
        
        this.Main = '.g-middle';        
        this.Main_Header = '.schema-header';
        this.Main_Header_ProductGroup = '.schema-header__title';
        this.Main_Header_CatalogButton = 'input[name="ko_unique_1"]';
        this.Main_Header_AnnouncementsButton = 'input[name="ko_unique_2"]';

        this.Main_ItemsGrid = '.js-schema-results.schema-grid__center-column';
        this.Main_ItemsGrid_FirstElement_A = 'div#schema-products > div:nth-of-type(1) > .schema-product > .schema-product__part_1 > .schema-product__image > a';
        this.Main_ItemsGrid_FirstElement_IMG = 'div#schema-products > div:nth-of-type(1) > .schema-product > .schema-product__part_1 > .schema-product__image > a > img';
        
        this.Main_LeftPanel = '.schema-grid__left-column';
        this.Main_LeftPanel_MinPrice = 'div:nth-of-type(1) > .schema-filter-control__item.schema-filter__number-input.schema-filter__number-input_price';
        this.Main_LeftPanel_MaxPrice = 'div:nth-of-type(2) > .schema-filter-control__item.schema-filter__number-input.schema-filter__number-input_price';

        this.Iframe = '.modal-iframe';
        this.Iframe_SearchField = '.search__input';
	};
}

module.exports = CatalogPageTV;