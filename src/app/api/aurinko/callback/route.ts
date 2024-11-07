// /api/aurkino/callback

import { exchangeCodeForAccessToken, getAccountDetails } from "@/lib/aurinko";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions"
import axios from "axios";

export const GET = async (req : NextRequest) => {
    
    const { userId } = await auth();

    if(!userId) 
        return NextResponse.json(
         { message : "Unauthorized" },
         { status : 401 }
        );

    const params = req.nextUrl.searchParams;

    const status = params.get('status');

    if(status != 'success')
        return NextResponse.json(
            {message : "Failed to Link Account"},
            {status : 400}
        )

    //get the code to exchange for the auth token
    
    const code = params.get('code');
    if(!code) 
        return NextResponse.json(
            {message: "No code was provided"},
            {status: 400}
        )
    
    const token = await exchangeCodeForAccessToken(code);
    if(!token) 
        return NextResponse.json(
            {message: "Error while getting token"},
            {status : 400}
        );

    const accountDeatils = await getAccountDetails(token?.accessToken);
    if(!accountDeatils)
        return NextResponse.json(
            {message : "error While fetching the account details"},
            {status: 400}
        )

    await db.account.upsert({
        where:{
            id: token.accountId.toString()
        },
        update:{
            accessToken: token.accessToken
        },
        create:{
            id: token.accountId.toString(),
            userId: userId,
            emailAddress: accountDeatils.email,
            name: accountDeatils.name,
            accessToken: token.accessToken
        }
    });

    //hitting a trigger to intial sync endpoint 
    // and allow to run when this function gets finished also
    waitUntil( 
        axios.post(`${process.env.NEXT_PUBLIC_URL}/api/aurinko/initial-sync`, {
            accountId: token.accountId.toString(),
            userId: userId,
        }).then((res) => {
            console.log("Intial Sync Tiggered", res.data)
        }).catch((error) => {
            console.error("Failed to Trigger inital sync ", error)
        })
    );



    return NextResponse.redirect(new URL('/mail' , req.url))
}