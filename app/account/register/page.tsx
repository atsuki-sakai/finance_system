"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/services/supabase/client";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-5">Register</h1>
      <div className="flex flex-col gap-5 max-w-sm mx-auto">
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          className="w-full bg-blue-500 hover:bg-blue-600"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </div>
      <Link
        href="/"
        className="mt-5 block text-center text-gray-500 hover:text-gray-700"
      >
        Go Back
      </Link>
    </div>
  );
};

export default Register;
