'use strict';

require( 'should' );

describe( 'charCaseChecker class', function () {

	describe( 'properties of charCaseChecker', function () {
		var caseChecker;

		before( function ( done ) {
			caseChecker = require( '../../' );
			done();
		} );

		it( 'should have correct properties', function () {
			caseChecker.should.have.property( 'run' );
			caseChecker.should.have.property( 'iterateArr' );
			caseChecker.should.have.property( 'evaluate' );
		} );
	} );

	describe( 'single string input with camel case pattern - success', function () {
		var caseChecker;
		var result;
		var input = 'thisIsACamelCaseInPut';

		var options = {
			'pattern' : 'CAMEL_CASE'
		};

		before( function ( done ) {
			caseChecker = require( '../../' );
			caseChecker.run( input, options )
				.then( function ( res ) {
					result = res;
				} );
			done();
		} );

		it( 'should return an object', function () {
			( typeof result ).should.equal( 'object' );
		} );

		it( 'should return 3 properties', function () {
			( Object.keys( result ) ).length.should.equal( 3 );
		} );

		it( 'should return correct properties', function () {
			result.should.have.property( 'name' );
			result.should.have.property( 'result' );
			result.should.have.property( 'status' );
		} );

		it( 'should return success values in properties', function () {
			result.result.should.equal( true );
			result.status.should.equal( 'PASSED' );
		} );
	} );

	describe( 'single string input with camel case pattern - fail', function () {
		var caseChecker;
		var result;
		var input = 'Thisisnotacamelcaseinput';

		var options = {
			'pattern' : 'CAMEL_CASE'
		};

		before( function ( done ) {
			caseChecker = require( '../../' );
			caseChecker.run( input, options )
				.then( function ( res ) {
					result = res;
				} );
			done();
		} );

		it( 'should return an object', function () {
			( typeof result ).should.equal( 'object' );
		} );

		it( 'should return 3 properties', function () {
			( Object.keys( result ) ).length.should.equal( 3 );
		} );

		it( 'should return correct properties', function () {
			result.should.have.property( 'name' );
			result.should.have.property( 'result' );
			result.should.have.property( 'status' );
		} );

		it( 'should return success values in properties', function () {
			result.result.should.equal( false );
			result.status.should.equal( 'FAILED' );
		} );
	} );

	describe( 'array of string input with lower case pattern - success and fail', function () {
		var caseChecker;
		var result;
		var input = [ 'Thisisnotacamelcaseinput', '2123131asdasdasd', 'thisisalowercase', 'this_is_snake' ];

		var options = {
			'pattern' : 'lowercase'
		};

		before( function ( done ) {
			caseChecker = require( '../../' );
			caseChecker.run( input, options )
				.then( function ( res ) {
					result = res;
				} );
			done();
		} );

		it( 'should return an array', function () {
			( Array.isArray( result ) ).should.equal( true );
		} );

		it( 'should return first index as failed', function () {
			result[ 0 ].result.should.equal( false );
			result[ 0 ].status.should.equal( 'FAILED' );
		} );

		it( 'should return second index as failed', function () {
			result[ 1 ].result.should.equal( false );
			result[ 1 ].status.should.equal( 'FAILED' );
		} );

		it( 'should return third index as a success', function () {
			result[ 2 ].result.should.equal( true );
			result[ 2 ].status.should.equal( 'PASSED' );
		} );

		it( 'should return third index as failed', function () {
			result[ 3 ].result.should.equal( false );
			result[ 3 ].status.should.equal( 'FAILED' );
		} );

		it( 'should return correct properties', function () {
			result[ 0 ].should.have.property( 'name' );
			result[ 0 ].should.have.property( 'result' );
			result[ 0 ].should.have.property( 'status' );
		} );

	} );

	describe( 'array of string input with custom case pattern - success and fail', function () {
		var caseChecker;
		var result;
		var input = [ 'Thisisnotacamelcaseinput', '2123131asdasdasd', 'thisisalowercase', 'this_is_snake' ];

		var options = {
			'pattern' : '[0-9][a-z]+$'
		};

		before( function ( done ) {
			caseChecker = require( '../../' );
			caseChecker.run( input, options )
				.then( function ( res ) {
					result = res;
				} );
			done();
		} );

		it( 'should return an array', function () {
			( Array.isArray( result ) ).should.equal( true );
		} );

		it( 'should return first index as failed', function () {
			result[ 0 ].result.should.equal( false );
			result[ 0 ].status.should.equal( 'FAILED' );
		} );

		it( 'should return second index as a success', function () {
			result[ 1 ].result.should.equal( true );
			result[ 1 ].status.should.equal( 'PASSED' );
		} );

		it( 'should return third index as failed', function () {
			result[ 2 ].result.should.equal( false );
			result[ 2 ].status.should.equal( 'FAILED' );
		} );

		it( 'should return third index as failed', function () {
			result[ 3 ].result.should.equal( false );
			result[ 3 ].status.should.equal( 'FAILED' );
		} );

		it( 'should return correct properties', function () {
			result[ 0 ].should.have.property( 'name' );
			result[ 0 ].should.have.property( 'result' );
			result[ 0 ].should.have.property( 'status' );
		} );

	} );

	describe( 'invalid input', function () {
		var caseChecker;
		var input = {};
		var error;

		var options = {
			'pattern' : '[0-9][a-z]+$'
		};

		before( function ( done ) {
			caseChecker = require( '../../lib' );
			caseChecker.run( input, options )
				.then()
				.catch( function ( err ) {
					error = err;
				} );
			done();
		} );

		it( 'should return an error', function () {
			error.message.should.equal( 'Not a valid input' );
		} );

	} );

} );
