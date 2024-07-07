"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { supabaseClient } from "@/services/supabase/client";

const Dashboard = () => {
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
        <div>
          <div>Welcome, {session.user.email}</div>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <div>
          <h3 className="text-2xl font-bold">Please log in</h3>
          <Link href="/">Go Back</Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
