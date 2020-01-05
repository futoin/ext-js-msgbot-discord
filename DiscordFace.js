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

const ServerFace = require( '@futoin/msgbot/ServerFace' );

/**
 * Discord FTN22 Server Face implementation
 */
class DiscordFace extends ServerFace {
    /**
     * C-tor
     * @param {object} options - common options
     * @param {object} options.discordClient - Discord client instance
     */
    constructor( options ) {
        super( options );
        this._client = options.discordClient;
    }

    /**
     * Get native message system interface implementation
     * @returns {object} native implementation
     */
    systemIface() {
        return this._client || super.systemIface();
    }
}

module.exports = DiscordFace;
