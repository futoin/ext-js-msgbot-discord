'use strict';

const expect = require( 'chai' ).expect;

const $as_test = require( 'futoin-asyncsteps/testcase' );
const AdvancedCCM = require( 'futoin-invoker/AdvancedCCM' );
const Executor = require( 'futoin-executor/Executor' );
const SpecTools = require( 'futoin-invoker/SpecTools' );

SpecTools.on( 'error', ( ...args ) => console.log( args ) );

const {
    ROUTER_FACE,
    PUSH_FACE,
    SERVER_FACE_PREFIX,
} = require( '@futoin/msgbot' );

const ServiceApp = require( '@futoin/msgbot/ServiceApp' );
const ReactHandlerFace = require( '@futoin/msgbot/ReactHandlerFace' );
const ReactHandlerService = require( '@futoin/msgbot/ReactHandlerService' );

const main = require( '../lib/main' );
const { toU64, fromU64 } = require( '../lib/snowflake' );
const discordToken = process.env.discordToken;

class TestApp extends ServiceApp {
    _register_servers( asi, options ) {
        main( asi, this, options );
    }
}

describe( 'Snowflake U64', function() {
    it( 'should toU64()', $as_test( function( asi ) {
        expect( toU64( 123 ) ).equal( 'RkRpc2NvcmQAAAAAAAAAew' );
        expect( toU64( 234 ) ).equal( 'RkRpc2NvcmQAAAAAAAAA6g' );
        expect( toU64( '1311768465171234567' ) ).equal( 'RkRpc2NvcmQSNFZ4Ehc/Bw' );
    } ) );
    it( 'should fromU64()', $as_test( function( asi ) {
        expect( fromU64( 'RkRpc2NvcmQAAAAAAAAAew' ).toString() ).equal( '123' );
        expect( fromU64( 'RkRpc2NvcmQAAAAAAAAA6g' ).toString() ).equal( '234' );
        expect( fromU64( 'RkRpc2NvcmQSNFZ4Ehc/Bw' ).toString() ).equal( '1311768465171234567' );
    } ) );
} );

describe( 'Registration Test', function() {
    if ( !discordToken ) {
        console.log( "Please setup discordToken" );
        return;
    }

    it( `Create ServiceApp`, $as_test( function( asi ) {
        this.timeout( 10e3 );
        const app = new TestApp( asi, {
            discordToken,
        } );
        asi.add( asi => {
            asi.waitExternal();
            app.close( () => asi.success() );
        } );
    } ) );

    it( `Wait message`, $as_test( function( asi ) {
        this.timeout( 60e3 );
        const app = new TestApp( asi, {
            discordToken,
            logLevel: 'debug',
        } );

        asi.add( asi => {
            class MockHandler extends ReactHandlerService {
                constructor( ...opts ) {
                    super( ...opts );
                    this._done = false;
                    this._onDone = function() {
                        this._done = true;
                    };
                }
                onMessage( asi, req ) {
                    console.dir( req.params() );
                    this._onDone();
                    req.result().rsp = 'My response!';
                }
            }

            const exec = app.newExecutor();
            const hand = asi.state.hand = MockHandler.register( asi, exec );
            ReactHandlerFace.register( asi, app.ccm(), 'test', exec );

            asi.add( asi => {
                app.ccm().iface( ROUTER_FACE ).registerHandler(
                    asi,
                    'test',
                    [ '//test' ],
                    [],
                    false
                );
            } );
        } );
        asi.add( asi => {
            asi.waitExternal();

            const { hand } = asi.state;

            if ( hand._done ) {
                app.close( () => asi.success() );
            } else {
                console.dir( 'Please emit //test Discord message' );
                hand._onDone = function() {
                    if ( !this._done ) {
                        this._done = true;
                        setTimeout( () => {
                            app.close( () => asi.success() );
                        }, 3e3 );
                    }
                };
            }
        } );
    } ) );
} );

