import { PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

async function main() {
    const plans = await prisma.plan.findMany({ where: { shareCode: null } });
    for (const p of plans) {
        await prisma.plan.update({
            where: { id: p.id },
            data: { shareCode: randomBytes(4).toString("hex").toUpperCase() }
        });
    }
    console.log(`Backfilled ${plans.length} plans.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
