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

const BigNumber = require( 'bignumber.js' );
const DISCORD_UUID_PREFIX = Buffer.from( 'FDiscord' );
const L32 = new BigNumber( '100000000', 16 );

module.exports = {
    toU64: ( snowflake ) => {
        const bin = new BigNumber( snowflake, 10 );
        const low = bin.mod( L32 );
        const high = bin.minus( low ).div( L32 );

        const long = Buffer.allocUnsafe( 8 );
        long.writeUInt32BE( high.toNumber(), 0 );
        long.writeUInt32BE( low.toNumber(), 4 );

        return Buffer.concat( [
            DISCORD_UUID_PREFIX,
            long,
        ], 16 ).toString( 'base64' ).substring( 0, 22 );
    },

    fromU64: ( u64 ) => {
        const b = Buffer.from( u64, 'base64' );
        let bin = new BigNumber( b.readUInt32BE( 8 ) ).times( L32 );
        bin = bin.plus( b.readUInt32BE( 12 ) );
        return bin.toFixed();
    },
};