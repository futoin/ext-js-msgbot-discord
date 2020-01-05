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

const Long = require( 'long' );

const DISCORD_UUID_PREFIX = Buffer.from( 'FDiscord' );

module.exports = {
    toU64: ( long ) => {
        if ( !( long instanceof Long ) ) {
            long = Long.fromString( long.toString(), true, 10 );
        }

        return Buffer.concat( [
            DISCORD_UUID_PREFIX,
            Buffer.from( long.toBytesBE() ),
        ], 16 ).toString( 'base64' ).substring( 0, 22 );
    },

    fromU64: ( u64 ) => {
        const b = Buffer.from( u64, 'base64' );
        return ( new Long( b.readUInt32BE( 12 ), b.readUInt32BE( 8 ), true ) ).toString( 10 );
    },
};