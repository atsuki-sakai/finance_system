"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { User } from "@supabase/supabase-js";

interface Props {
  user?: User;
}

const Dashboard = ({ user }: Props) => {
  const router = useRouter();
  const [loginUser, setLoginUser] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setLoginUser(user);
    } else {
      router.push("/");
    }
  }, []);

  return (
    <div>
      <h3>受発注システム</h3>
      <p>{loginUser?.email}</p>
    </div>
  );
};

export default Dashboard;
