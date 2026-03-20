import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { DonateClient } from "./DonateClient";

export const metadata = { title: "Support the Mission" };

export default async function DonatePage() {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");
    return (
        <>
            <TopBar title="Support" subtitle="Fueling elite development" />
            <div className="p-6 max-w-4xl mx-auto">
                <DonateClient />
            </div>
        </>
    );
}
