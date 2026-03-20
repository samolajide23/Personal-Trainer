import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, ctx: RouteContext<"/api/logs/[id]">) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await ctx.params;

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const body = await req.json();
    const { status } = body;

    if (!["IN_PROGRESS", "COMPLETED"].includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await prisma.workoutLog.update({
        where: { id, userId: user.id },
        data: { status }
    });

    return NextResponse.json(updated);
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/logs/[id]">) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await ctx.params;

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    await prisma.workoutLog.delete({
        where: { id, userId: user.id }
    });

    return NextResponse.json({ success: true });
}
