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

/**
 * @module @futoin/ext-js-msgbot-discord
 */


const Discord = require( 'discord.js' );

const DiscordFace = require( '../DiscordFace' );
const DiscordHelpers = require( '../DiscordHelpers' );
const DiscordService = require( '../DiscordService' );
const {
    SERVER_FACE_PREFIX,
} = require( '@futoin/msgbot' );

/**
 * Add Discord system to FutoIn Message Bot
 *
 * @param {AsyncSteps} asi - async steps interface
 * @param {ServiceApp} app - message bot
 * @param {object} options - additional parameters
 * @param {object} options.discord - parameters to be passed to Discord.js
 * @param {string} options.discordToken - bot token
 */
exports = module.exports = function( asi, app, options = null ) {
    DiscordHelpers.setDriver( 'discord', new DiscordHelpers() );

    options = options || {};
    const ccm = app.ccm();
    const asModel = asi.newInstance();

    const discord_opts = options.discord || {};
    discord_opts.disabledEvents = discord_opts.disabledEvents || [ 'TYPING_START' ];
    const client = new Discord.Client( discord_opts );

    client.on( 'ready', () => {
        ccm.log().info( `... Discord client is ready.` );
        const asi = asModel.newInstance();

        const common_executor = app.newExecutor();
        DiscordService.register( asi, common_executor, {
            discordClient: client,
            discordGuild: 0,
            ccm,
            asModel,
        } );
        DiscordFace.register(
            asi,
            ccm,
            `${SERVER_FACE_PREFIX}0`,
            common_executor
        );

        client.guilds.cache.each( ( _, guild_id ) => {
            const executor = app.newExecutor();

            DiscordService.register( asi, executor, {
                discordClient: client,
                discordGuild: guild_id,
                ccm,
                asModel,
            } );
            DiscordFace.register(
                asi,
                ccm,
                `${SERVER_FACE_PREFIX}${guild_id}`,
                executor
            );
            ccm.log().info( `Adding Discord guild "${guild_id}"` );
        } );

        asi.execute();
    } );
    client.once( 'error', ( e ) => {
        ccm.log().err( `Discord: ${e}` );
    } );
    ccm.once( 'close', () => {
        client.destroy();
    } );
    asi.await( client.login( options.discordToken ) );

    ccm.log().info( `Starting Discord client...` );
};

Object.freeze( exports );

