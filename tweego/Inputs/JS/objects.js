window.Unit = function (config) {
	this.name		=	'';
	this.gender		=	'';
	this.hp			=	0;
	this.strength	=	0;
	this.armor		=	0;
	this.text		=	[];
	const _prn 		= 	{
		he	:	{
			'm'		:	"he",
			'f'		:	"she",
			default	:	"they"
		},
		He	:	{
			'm'		:	"He",
			'f'		:	"She",
			default	:	"They"
		},
		his	:	{
			'm'		:	"his",
			'f'		:	"her",
			default	:	"their"
		},
		His	:	{
			'm'		:	"His",
			'f'		:	"Her",
			default	:	"Their"
		},
		him	:	{
			'm'		:	"him",
			'f'		:	"her",
			default	:	"them"
		},
		Him	:	{
			'm'		:	"Him",
			'f'		:	"Her",
			default	:	"Them"
		}
	};
	this.attack		=	function() {
		var atk;
		if (this.strength == 1) {
			atk = [0,0,0,0,0,1,1,1,1,1,1,2];
		}
		else if (this.strength == 2){
			atk = [0,0,0,1,1,1,1,1,2,2,2,2];
		}
		else if (this.strength == 3) {
			atk = [0,0,1,1,2,2,2,2,2,2,2,3];
		}
		random = Math.floor(Math.random() * atk.length);
		return atk[random];
	};
	this.hurt		=	function(damage = 1) {
		this.hp -= damage;
		if (this.hp < 0) {this.hp = 0}
		return this.hp
	};
	this.heal		=	function(amount = 1) {
		this.hp += amount;
		if (this.hp > this.maxhp) {this.hp = this.maxhp}
		return this.hp
	};
	// Clone the given config object's own properties into our own properties.
	//
	// NOTE: We use the SugarCube built-in `clone()` function to make deep
	// copies of each of the properties' values.
	Object.keys(config).forEach(function (pn) {
		this[pn] = clone(config[pn]);
	}, this);
	this.maxhp	=	this.hp;
	this.he		=	_prn.he[this.gender];
	this.He		=	_prn.He[this.gender];
	this.his	=	_prn.his[this.gender];
	this.His	=	_prn.His[this.gender];
	this.him	=	_prn.him[this.gender];
	this.Him	=	_prn.Him[this.gender];
};

window.Monster = function (config) {
	// Set up our own data properties with some defaults.
	Unit.call(this, config);
	this.hptext	=	function() {
		if (this.hp/this.maxhp > 0.6) {
			return this.text.hp[0] + "<br>"
		}
		else if ((this.hp/this.maxhp <= 0.6 ) && (this.hp/this.maxhp > 0.3 )) {
			return this.text.hp[1] + "<br>"
		}
		else if ((this.hp/this.maxhp <= 0.3 ) && (this.hp/this.maxhp > 0 )) {
			return this.text.hp[2] + "<br>"
		}
	}
	// Clone the given config object's own properties into our own properties.
	//
	// NOTE: We use the SugarCube built-in `clone()` function to make deep
	// copies of each of the properties' values.
	Object.keys(config).forEach(function (pn) {
		this[pn] = clone(config[pn]);
	}, this);
	this.maxhp	=	this.hp;
};

window.Knight = function (config) {
	// Set up our own data properties with some defaults.
	Unit.call(this, config);
	this.armor	=	[{},{},{},{},{},{}];
	
	// Implement methods
	this.fullname	=	function() {
		return this.name + " the " + this.title
	}
	this.break		=	function(target, damage = 1) {
		this.armor[target].hp -= damage;
		if (this.armor[target].hp < 0) {this.armor[target].hp = 0}
	}
	this.fix		=	function(target, amount = 1) {
		this.armor[target].hp += amount;
		if (this.armor[target].hp > this.armor[target].maxhp) {this.armor[target].hp = this.armor[target].maxhp}
	}

	// Clone the given config object's own properties into our own properties.
	//
	// NOTE: We use the SugarCube built-in `clone()` function to make deep
	// copies of each of the properties' values.
	Object.keys(config).forEach(function (pn) {
		this[pn] = clone(config[pn]);
	}, this);
	this.armor.forEach(piece => (piece.maxhp = piece.hp))
};



// Sugarcube functionality fixing
function addStorageMethods (clazz, name) {
  clazz.prototype.clone = function () {
    return new clazz(this);
  };

  clazz.prototype.toJSON = function () {
    var ownData = {};
    Object.keys(this).forEach(function (pn) {
        ownData[pn] = clone(this[pn]);
    }, this);
    return JSON.reviveWrapper('new ' + name + '($ReviveData$)', ownData);
  };
};
addStorageMethods(Unit, "Unit");
addStorageMethods(Monster, "Monster");
addStorageMethods(Knight, "Knight");