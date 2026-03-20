"use client";

import { Heart, Shield, Zap, Globe, Copy, Check, Info, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function DonateClient() {
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const benefits = [
        { 
            icon: Shield, 
            title: "Security & Reliability", 
            desc: "Keeping our servers fast and your data encrypted with industry-standard protocols.",
            color: "text-brand-400",
            bg: "bg-brand-400/10"
        },
        { 
            icon: Zap, 
            title: "Advanced Features", 
            desc: "Developing AI-driven insights, PR prediction models, and elite workout generation.",
            color: "text-success",
            bg: "bg-success/10"
        },
        { 
            icon: Globe, 
            title: "Global Infrastructure", 
            desc: "Low-latency access for athletes worldwide, from London to Sydney.",
            color: "text-warning",
            bg: "bg-warning/10"
        }
    ];

    return (
        <div className="space-y-10 animate-fade-in pb-20">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-900/40 via-surface-card to-surface-card border border-brand-500/20 p-8 sm:p-12 text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-brand-500/10 blur-[120px] -z-10" />
                
                <div className="w-20 h-20 bg-brand-400/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-glow-brand-sm border border-brand-400/20">
                    <Heart className="w-10 h-10 text-brand-400 fill-brand-400/20" />
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black text-fg tracking-tighter mb-4">
                    Fuel the <span className="text-brand-400">Revolution</span>
                </h1>
                <p className="text-lg text-fg-muted max-w-2xl mx-auto leading-relaxed">
                    We're building more than an app; we're crafting an elite performance ecosystem. Your support directly funds the engineers and infrastructure behind the platform.
                </p>
            </div>

            {/* Impact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {benefits.map((b) => (
                    <div key={b.title} className="card p-6 bg-surface-card/60 backdrop-blur-sm group hover:border-brand-500/30 transition-all">
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", b.bg)}>
                            <b.icon className={cn("w-6 h-6", b.color)} />
                        </div>
                        <h3 className="text-lg font-black text-fg tracking-tight mb-2">{b.title}</h3>
                        <p className="text-sm text-fg-muted leading-relaxed">{b.desc}</p>
                    </div>
                ))}
            </div>

            {/* Transfer Details */}
            <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="card p-8 space-y-8 bg-surface-card">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h3 className="text-xl font-black text-fg tracking-tight">Direct Support</h3>
                            <p className="text-xs text-fg-muted uppercase font-bold tracking-widest">Bank Transfer Details</p>
                        </div>
                        <div className="badge-brand">SECURE</div>
                    </div>

                    <div className="space-y-4">
                        <div className="group relative">
                            <div className="p-5 bg-surface-elevated/50 rounded-2xl border border-surface-border transition-all group-hover:border-brand-500/40">
                                <p className="text-[10px] font-black text-fg-subtle uppercase tracking-widest mb-1.5">Account Holder</p>
                                <p className="text-lg font-black text-fg">Tony Olajide</p>
                                <button 
                                    onClick={() => handleCopy("Tony Olajide", "name")} 
                                    className="absolute top-4 right-4 text-brand-400 hover:text-brand-300 transition-colors"
                                >
                                    {copied === "name" ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="group relative">
                            <div className="p-5 bg-surface-elevated/50 rounded-2xl border border-surface-border transition-all group-hover:border-brand-500/40">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <p className="text-[10px] font-black text-fg-subtle uppercase tracking-widest">IBAN</p>
                                    <div className="badge-warning text-[8px] px-1 py-0">IRELAND</div>
                                </div>
                                <p className="text-lg font-black text-fg font-mono tracking-wider break-all">IE40 AIBK 9332 4457 5430 25</p>
                                <button 
                                    onClick={() => handleCopy("IE40AIBK93324457543025", "iban")} 
                                    className="absolute top-4 right-4 text-brand-400 hover:text-brand-300 transition-colors"
                                >
                                    {copied === "iban" ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-brand-400/5 rounded-2xl border border-brand-400/10 flex items-start gap-3">
                        <Info className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-fg-muted leading-relaxed italic">
                            All contributions are manually verified. If you need a tax receipt or have business inquiries, contact support.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="card p-8 bg-gradient-brand text-white shadow-low border-none relative overflow-hidden group">
                        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 blur-3xl rounded-full" />
                        <h3 className="text-2xl font-black tracking-tight mb-2">Corporate Sponsorship</h3>
                        <p className="text-white/80 text-sm leading-relaxed mb-6">
                            Looking to partner with the fastest growing athlete network? We offer custom branding and elite integration for sports equipment and luxury lifestyle brands.
                        </p>
                        <button className="btn-secondary bg-white text-brand-600 border-none hover:bg-fg/90 w-full flex items-center justify-center gap-2 h-12 text-xs font-black uppercase tracking-widest">
                            Inquire Now <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="card p-8 bg-surface-card border-brand-600/15">
                        <h4 className="font-black text-fg uppercase text-xs tracking-widest mb-4">Development Roadmap</h4>
                        <div className="space-y-4">
                            {[
                                { task: "Wearable Integration (Apple Watch/Garmin)", status: "Active" },
                                { task: "Custom Exercise Video Uploads", status: "Done" },
                                { task: "AI Performance Forecasting", status: "Planning" }
                            ].map((t) => (
                                <div key={t.task} className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-fg-muted">{t.task}</p>
                                    <span className={cn(
                                        "text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter",
                                        t.status === "Done" ? "bg-success/10 text-success" : t.status === "Active" ? "bg-brand-500/10 text-brand-400" : "bg-surface-muted text-fg-subtle"
                                    )}>
                                        {t.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
