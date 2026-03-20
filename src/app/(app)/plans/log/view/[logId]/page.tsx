import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TopBar } from "@/components/layout/TopBar";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ChevronLeft, Dumbbell, Clock } from "lucide-react";

export default async function LogViewPage({ params }: { params: { logId: string } }) {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const log = await prisma.workoutLog.findUnique({
        where: { id: params.logId },
        include: {
            workout: true,
            sets: {
                include: { exercise: true },
                orderBy: [{ exercise: { order: 'asc' } }, { setNumber: 'asc' }],
            }
        }
    });

    if (!log) notFound();

    // Group sets by exercise
    const exercisesMap = new Map();
    log.sets.forEach(set => {
        if (!exercisesMap.has(set.exercise.id)) {
            exercisesMap.set(set.exercise.id, {
                name: set.exercise.name,
                muscleGroup: set.exercise.muscleGroup,
                sets: []
            });
        }
        exercisesMap.get(set.exercise.id).sets.push(set);
    });
    const groupedExercises = Array.from(exercisesMap.values());

    return (
        <div className="bg-surface min-h-screen pb-20">
            <TopBar title="Session Log" subtitle={formatDate(log.loggedAt)} />
            <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6 animate-fade-in">
                <Link href="/dashboard" className="btn-ghost btn-sm text-fg-subtle mb-2 inline-flex">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Dashboard
                </Link>

                <div className="card p-6 bg-surface-card border-brand-500/20 shadow-glow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-black text-fg">{log.workout.name}</h2>
                            <p className="text-sm text-fg-muted mt-1">Successfully Completed Session</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center border border-success/20">
                            <Clock className="w-6 h-6 text-success" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {groupedExercises.map((ex, idx) => (
                        <div key={idx} className="card p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-surface-muted border border-surface-border">
                                    <Dumbbell className="w-4 h-4 text-brand-400" />
                                </div>
                                <h3 className="font-bold text-fg tracking-tight">{ex.name}</h3>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="grid grid-cols-4 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-fg-subtle border-b border-surface-border mb-2">
                                    <span className="col-span-1">Set</span>
                                    <span className="col-span-1 text-center">Reps</span>
                                    <span className="col-span-1 text-center">Weight</span>
                                    <span className="col-span-1 text-right">RPE</span>
                                </div>
                                {ex.sets.map((set: any) => (
                                    <div key={set.id} className="grid grid-cols-4 px-2 py-2 text-sm items-center rounded-xl bg-surface-muted/30">
                                        <span className="col-span-1 font-bold text-fg-muted">{set.setNumber}</span>
                                        <span className="col-span-1 font-black text-center text-fg">{set.reps || "-"}</span>
                                        <span className="col-span-1 font-black text-center text-brand-400">{set.weightKg ? `${set.weightKg}kg` : "-"}</span>
                                        <span className="col-span-1 font-bold text-right text-warning">{set.rpe || "-"}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
