'use strict';

const CatalogPageTV = require('./pages/CatalogPageTV');

class World {
	constructor (){
		this.CatalogPageTV = new CatalogPageTV();		
	}
}

module.exports = new World();