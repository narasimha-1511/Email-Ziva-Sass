import { db } from "./server/db";

async function main() {
    await db.user.create({
        data: {
            emailAddress:"demo@gmail.com",
            firstName: "demo",
            lastName: "nari",
            imageUrl: ""
        }
    });
    
    console.log('done');
}

main().catch(console.error);