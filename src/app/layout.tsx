import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | FitCoach Pro",
    default: "FitCoach Pro — Premium Fitness Coaching Platform",
  },
  description:
    "Transform your body with personalised coaching, AI-driven workout plans, and real-time progress tracking.",
  keywords: ["fitness", "coaching", "workout", "gym", "personal trainer"],
  openGraph: {
    siteName: "FitCoach Pro",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: "#6366f1",
              colorBackground: "#0d0f16",
              colorText: "#f5f7ff",
              colorTextSecondary: "#a9b1c7",
              colorInputBackground: "#171b26",
              colorInputText: "#f5f7ff",
              colorNeutral: "#2a3246",
              colorDanger: "#f87171",
              colorSuccess: "#34d399",
              borderRadius: "0.75rem",
              fontFamily: "Inter, sans-serif",
            },
            elements: {
              card: "shadow-modal bg-surface-card/95 border border-surface-border backdrop-blur-md",
              headerTitle: "text-fg text-2xl font-bold tracking-tight",
              headerSubtitle: "text-fg-muted",
              socialButtonsBlockButton:
                "bg-surface-muted border border-surface-border text-fg hover:bg-surface-elevated hover:border-brand-700/50 transition-colors",
              socialButtonsBlockButtonText: "text-fg font-medium",
              formFieldLabel: "text-fg text-xs font-semibold tracking-wide",
              formFieldInput:
                "bg-surface-muted border border-surface-border text-fg placeholder:text-fg-subtle focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40",
              formFieldHintText: "text-fg-muted",
              formFieldErrorText: "text-danger",
              footerActionText: "text-fg-muted",
              footerActionLink: "text-brand-300 hover:text-brand-200 font-medium",
              identityPreviewText: "text-fg",
              identityPreviewEditButtonIcon: "text-fg-muted hover:text-fg",
              dividerLine: "bg-surface-border",
              dividerText: "text-fg-subtle",
              otpCodeFieldInput:
                "bg-surface-muted border border-surface-border text-fg focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40",
              alertText: "text-fg",
              formButtonPrimary:
                "bg-gradient-brand text-white hover:opacity-95 shadow-[0_0_20px_rgba(99,102,241,0.25)]",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
