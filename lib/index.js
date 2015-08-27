'use strict';

var Promise = require( 'bluebird' );
var pattern = require( './resources/patterns' );

function CharCaseChecker () {}

CharCaseChecker.prototype.run = function ( strArr, config ) {
	var self  = this;
	var error = new Error( 'Not a valid input' );
	var result;
	this.config = config;
	return new Promise( function ( resolve, reject ) {
		if ( Array.isArray( strArr ) ) {
			result = self.iterateArr( strArr );
			resolve( result );
		} else if ( ( typeof strArr ) === 'string' ) {
			result = self.evaluate( strArr );
			resolve( result );
		} else {
			reject( error );
		}
	} );
};

CharCaseChecker.prototype.iterateArr = function ( strArr ) {
	var self = this;
	var resultArr = [];

	strArr.forEach( function ( data ) {
		resultArr.push( self.evaluate( data ) );
	} );
	return resultArr;
};

CharCaseChecker.prototype.evaluate = function ( str ) {
	var testObj  = {};
	var regex;
	testObj.name   = str;
	if ( !pattern[ this.config.pattern ] ) {
		regex = new RegExp( this.config.pattern );
	} else {
		regex = pattern[ this.config.pattern ];
	}

	testObj.result = regex.test( str );

	if ( testObj.result ) {
		testObj.status = 'PASSED';
	} else {
		testObj.status = 'FAILED';
	}

	return testObj;
};

module.exports = new CharCaseChecker();
