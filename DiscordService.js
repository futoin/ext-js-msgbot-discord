'use strict';

/**
 * @file
 *
 * Copyright 2019-2020 FutoIn Project (https://futoin.org)
 * Copyright 2019-2020 Andrey Galkin <andrey@futoin.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const ServerService = require( '@futoin/msgbot/ServerService' );
const DiscordFace = require( './DiscordFace' );
const { toU64, fromU64 } = require( './lib/snowflake' );

const {
    ROUTER_FACE,
    SERVER_FACE_PREFIX,
} = require( '@futoin/msgbot' );

// Well, that's a hacky mapping by fact.
//const LIST_MAX = 100;

/**
 * Discord Server Service
 */
class DiscordService extends ServerService {
    static get IFACE_IMPL() {
        return DiscordFace;
    }

    /**
     * C-tor
     * @param {object} options - common options
     * @param {object} options.discordClient - Discord client instance
     * @param {AsyncSteps} options.asModel - AsyncSteps model to create threads
     * @param {AdvancedCCM} options.ccm - CCM
     */
    constructor( options ) {
        super( options );
        const { asModel, ccm } = options;
        const client = this._client = options.discordClient;
        const guild_id = this._guild_id = options.discordGuild || 0;
        this._guild_u64 = toU64( guild_id );

        // Primary server
        if ( guild_id === 0 ) {
            this._guild = null;

            client.on( 'message', ( m ) => {
                const asi = asModel.newInstance();
                asi.add(
                    ( asi ) => {
                        ccm.iface( ROUTER_FACE ).onMessage( asi, {
                            server:  `${SERVER_FACE_PREFIX}${m.guild ? m.guild.id : 0}`,
                            channel: m.channel ? toU64( m.channel ) : null,
                            payload: m.content,
                            private: !m.guild,
                            sender:  toU64( m.author.id ),
                            ts:      new Date( m.createdTimestamp ).toISOString(),
                            ext_id:  m.id,
                        } );
                    },
                    ( asi, err ) => {
                        try {
                            ccm.log().error( `DiscordService: message handling failure ${err}:${asi.state.error_info}` );
                            ccm.log().debug( `DiscordService: ${asi.state.last_exception}` );
                        } catch ( e ) {
                            console.error( e );
                            console.log( `DiscordService: message handling failure ${err}:${asi.state.error_info}` );
                            console.log( `DiscordService: ${asi.state.last_exception}` );
                        }
                    }
                );
                asi.execute();
            } );

            // TODO: various event handling
        } else {
            this._guild = this._client.guilds.get( guild_id );
        }
    }

    pushMessage( asi, req ) {
        const { msg } = req.params();
        const chan = this._client.channels.get( fromU64( msg.channel ) );

        asi.await( chan.send( msg.payload, { split: true } ) );
        asi.add( ( asi ) => req.result( true ) );
    }

    getFlavour( asi, req ) {
        req.result( 'discord' );
    }

/*
    listMembers( asi, _ ) {
        asi.error( NotImplemented );
    }

    isMember( asi, _ ) {
        asi.error( NotImplemented );
    }

    kick( asi, _ ) {
        asi.error( NotImplemented );
    }

    listBanned( asi, _ ) {
        asi.error( NotImplemented );
    }

    isBanned( asi, _ ) {
        asi.error( NotImplemented );
    }

    ban( asi, _ ) {
        asi.error( NotImplemented );
    }

    unBan( asi, _ ) {
        asi.error( NotImplemented );
    }
*/
}

module.exports = DiscordService;
