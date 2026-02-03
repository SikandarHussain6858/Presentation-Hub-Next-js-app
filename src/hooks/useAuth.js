"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        const checkAuth = async () => {
            // First check NextAuth session
            if (status === "authenticated" && session?.user) {
                setUser({
                    uid: session.user.id || session.user.email,
                    email: session.user.email,
                    name: session.user.name
                });
                setLoading(false);
                return;
            }

            // Then check our custom session
            if (status === "unauthenticated" || !session) {
                try {
                    const res = await fetch('/api/auth/check');
                    const data = await res.json();

                    if (data.isAuthenticated) {
                        setUser(data.user);
                    } else {
                        setUser(null);
                    }
                } catch (err) {
                    console.error("Auth check failed", err);
                    setUser(null);
                }
            }

            setLoading(false);
        };

        if (status !== "loading") {
            checkAuth();
        }
    }, [session, status]);

    const logout = async () => {
        try {
            // Clear custom session
            await fetch('/api/auth/check', { method: 'POST' }); // Call POST to logout

            // Clear NextAuth session if active
            if (status === "authenticated") {
                await signOut({ redirect: false });
            }

            setUser(null);
            router.push("/login");
            router.refresh(); // Refresh to clear server cached routes if any
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    return { user, loading, logout, isAuthenticated: !!user };
}
