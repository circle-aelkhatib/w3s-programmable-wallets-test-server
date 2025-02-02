/* Copyright (c) 2023, Circle Technologies, LLC. All rights reserved.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
*/

import { NextResponse } from 'next/server'
import { v4 } from "uuid";
import { headers } from "next/headers";

export async function GET(request, params) {
    const requestHeaders = new Headers(request.headers);
    const userTokenFromHeader = requestHeaders.get('x-user-token');
    const { walletId } = params.params

    try {
        console.log("Getting balances...")
        // Get wallet balances
        const res = await fetch(process.env.CIRCLE_BASE_URL + '/wallets/' + walletId + '/balances?includeAll=True', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.CIRCLE_API_KEY}`,
                'Content-Type': 'application/json',
                'X-User-Token': userTokenFromHeader,
            },
        });

        const data = await res.json();

        console.log(data)

        //console.log(data['response']['data']['tokenBalances']);
        return NextResponse.json(data['response']['data']['tokenBalances']);
    } catch (e) {
        console.log(e);
        return NextResponse.json(e, { status: 500 });
    }

}