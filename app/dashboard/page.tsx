"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabaseClient } from "@/services/supabase/client";
import Dashboard from "@/components/Dashboard";

const DashboardPage = () => {
  const router = useRouter();
  const [session, setSession] = useState<any | null>(null);

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    router.push("/account/login");
  };
  return (
    <div>
      {session ? (
        <Dashboard user={session.user} />
      ) : (
        <div>
          <p className="text-center">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
