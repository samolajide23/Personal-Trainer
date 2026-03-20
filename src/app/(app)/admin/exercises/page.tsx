import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TopBar } from "@/components/layout/TopBar";
import { AdminExercisesClient } from "./AdminExercisesClient";

export const metadata = { title: "Admin - Exercises" };

export default async function AdminExercisesPage() {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user || user.role !== "SUPER_ADMIN") redirect("/dashboard");

    const exercises = await prisma.globalExercise.findMany({
        orderBy: { name: "asc" }
    });

    return (
        <>
            <TopBar title="Global Exercises" subtitle="Manage video tutorials and new exercises" />
            <AdminExercisesClient initialExercises={exercises} />
        </>
    );
}
