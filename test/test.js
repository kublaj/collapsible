(function($) {
	/*
		======== A Handy Little QUnit Reference ========
		http://api.qunitjs.com/

		Test methods:
			module(name, {[setup][ ,teardown]})
			test(name, callback)
			expect(numberOfAssertions)
			stop(increment)
			start(decrement)
		Test assertions:
			ok(value, [message])
			equal(actual, expected, [message])
			notEqual(actual, expected, [message])
			deepEqual(actual, expected, [message])
			notDeepEqual(actual, expected, [message])
			strictEqual(actual, expected, [message])
			notStrictEqual(actual, expected, [message])
			throws(block, [expected], [message])
	*/

	module( "Default", {
		setup: function(){
			$( '#qunit-fixture' ).find( '.collapsible' ).collapsible();
		}
	});

	test( "Global Initialization", function() {
		ok( $( "html" ).is( ".enhanced" ), "Has global initialization class." );
	});

	test( "Initialization", function() {
		ok( $( "#default.collapsible" ).is( ".collapsible-enhanced" ), "Has individual initialization class." );
		ok( $( "#default .collapsible-content" ).not( ":hidden" ).length, "Content is visible by default." );
	});

	test( "Header content order", function() {
		ok( !$( "#outoforder .collapsible-content" ).is( ".collapsible-header" ), "Content can come first in child order, if classes are preset" );
		ok( !$( "#outoforder .collapsible-header" ).is( ".collapsible-content" ), "header can come second in child order, if classes are preset" );
	});

	test( "Aria", function() {
		ok( $( "#default .collapsible-header" ).is( "[tabindex='0']" ), "Tabindex added." );
		ok( $( "#default .collapsible-header" ).is( "[role=button]" ), "Role added." );
		ok( $( "#default .collapsible-header" ).is( "[aria-expanded]" ), "aria-expanded added." );
		ok( $( "#default .collapsible-header" ).is( "[aria-haspopup]" ), "aria-haspopup added." );
		ok( $( "#default .collapsible-header" ).is( "[aria-controls]" ), "aria-controls added." );
		ok( $( "#default .collapsible-content" ).is( "[id]" ), "collapsible content has an ID." );
		ok( $( "#default .collapsible-content" ).is( "[role='menu']" ), "collapsible content has menu role." );
		ok( $( "#default .collapsible-content" ).is( "[aria-hidden]" ), "aria-hidden attribute added to content." );
		equal( $( "#default .collapsible-header" ).attr( "aria-controls" ), $( "#default .collapsible-content" ).attr( "id" ), "aria-controls value matches content ID." );
	});

	test( "Click the header", function() {
		$( "#default .collapsible-header" ).trigger( "click" );
		ok( $( "#default .collapsible-content" ).is( ":hidden" ), "Content is hidden after header click." );
		ok( $( "#default .collapsible-header" ).is( "[aria-expanded='false']" ), "Header has aria-expanded=false after header click." );
		ok( $( "#default .collapsible-content" ).is( "[aria-hidden='true']" ), "Content has aria-hidden=true after header click." );


		$( "#default .collapsible-header" ).trigger( "click" );
		ok( $( "#default .collapsible-content" ).is( ":visible" ), "Content is visible after header second click." );
		ok( $( "#default .collapsible-header" ).is( "[aria-expanded='true']" ), "Header has aria-expanded=true after header second click." );
		ok( $( "#default .collapsible-content" ).is( "[aria-hidden='false']" ), "Content has aria-hidden=false after header second click." );

	});

	module( "Collapsed Initialization", {
		setup: function(){
			$( '#qunit-fixture' ).find( '.collapsible' ).collapsible();
		}
	});

	test( "Initialization", function() {
		ok( $( "#collapsed .collapsible-content" ).is( ":hidden" ), "Content is hidden by default." );
	});

	test( "Click the header", function() {
		$( "#collapsed .collapsible-header" ).trigger( "click" );
		ok( !$( "#collapsed .collapsible-content" ).is( ":hidden" ), "Content is visible after header click." );

		$( "#collapsed .collapsible-header" ).trigger( "click" );
		ok( $( "#collapsed .collapsible-content" ).is( ":hidden" ), "Content is hidden after header second click." );
	});

	module( "Accordion Plugin", {
		setup: function(){
			$( '#qunit-fixture' ).find( '.collapsible' ).removeData( 'collapsible' ).collapsible();
		}
	});

	test( "Click the header", function() {
		ok( $( "#accordion-c .collapsible-content" ).is( ":hidden" ), "Third unrelated collapsible content initial state." );

		$( "#accordion-a .collapsible-header" ).trigger( "click" );
		ok( !$( "#accordion-a .collapsible-content" ).is( ":hidden" ), "First accordion collapsible content is visible after header click." );
		ok( $( "#accordion-c .collapsible-content" ).is( ":hidden" ), "Third unrelated collapsible content is still hidden after header click." );

		$( "#accordion-b .collapsible-header" ).trigger( "click" );
		ok( !$( "#accordion-b .collapsible-content" ).is( ":hidden" ), "Second accordion collapsible content is visible after header click." );
		ok( $( "#accordion-a .collapsible-content" ).is( ":hidden" ), "First accordion collapsible content is visible after second collapsible header click." );
		ok( $( "#accordion-c .collapsible-content" ).is( ":hidden" ), "Third unrelated collapsible content is still hidden after header click." );
	});

	module( "Tabs Plugin", {
		setup: function(){
			$( '#qunit-fixture' ).find( '.tabnav' ).remove();
			$( '#qunit-fixture' ).find( '.collapsible' ).removeData( 'collapsible' ).collapsible();
		}
	});

	test( "Click the header", function() {
		ok( !$( "#tabs-a .collapsible-content" ).is( ":hidden" ), "Initial state of first tab: visible" );
		ok( $( "#tabs-b .collapsible-content" ).is( ":hidden" ), "Initial state of second tab: hidden" );

		$( "#tabs .tabnav a" ).eq( 1 ).trigger( "click" );
		ok( $( "#tabs-a .collapsible-content" ).is( ":hidden" ), "Initial state of first tab: hidden" );
		ok( !$( "#tabs-b .collapsible-content" ).is( ":hidden" ), "Initial state of second tab: visible" );
	});

	module( "Menu Plugin", {
		setup: function(){
				$( '#qunit-fixture' ).find( '.collapsible' ).collapsible();
		}
	});

	test( "Hover header", function() {
		ok( $( "#menu .collapsible-content" ).is( ":hidden" ), "Menu collapsible content initial state." );

		$( "#menu" ).trigger( "mouseenter" );
		ok( !$( "#menu .collapsible-content" ).is( ":visible" ), "Menu collapsible content visible after mouseenter." );

		$( "#menu" ).trigger( "mouseleave" );
		ok( $( "#menu .collapsible-content" ).is( ":hidden" ), "Menu collapsible content hidden after mouseleave." );
	});
}(jQuery));
