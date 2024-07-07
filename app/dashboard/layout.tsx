"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { User } from "@supabase/supabase-js";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { supabaseClient } from "@/services/supabase/client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [session, setSession] = useState<any | null>(null);

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          router.push("/account/login");
        } else {
          setSession(session);
        }
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
      <div className="flex justify-between">
        <h3 className="text-lg font-bold">Finance System</h3>
        <Sheet key={"bottom"}>
          <SheetTrigger>MENU</SheetTrigger>
          <SheetContent className="bg-white">
            <SheetHeader>
              <SheetTitle>管理メニュー</SheetTitle>
              <SheetDescription>
                Welcome to {session?.user?.email}.
              </SheetDescription>
              <div className="flex flex-col gap-4 py-4">
                <SheetClose>
                  <Button
                    className="w-full"
                    variant={"outline"}
                    onClick={() => router.push("/dashboard")}
                  >
                    ホーム
                  </Button>
                </SheetClose>
                <SheetClose>
                  <Button
                    className="w-full"
                    variant={"outline"}
                    onClick={() => router.push("/dashboard/customer")}
                  >
                    顧客管理
                  </Button>
                </SheetClose>
                <SheetClose>
                  <Button className="w-full" variant={"outline"}>
                    請求管理
                  </Button>
                </SheetClose>
                <SheetClose>
                  <Button className="w-full" variant={"outline"}>
                    見積書管理
                  </Button>
                </SheetClose>
                <SheetClose>
                  <Button className="w-full" variant={"outline"}>
                    発注書管理
                  </Button>
                </SheetClose>
                <SheetClose>
                  <Button className="w-full" variant={"outline"}>
                    発注書管理
                  </Button>
                </SheetClose>
                <SheetClose>
                  <Button className="w-full" variant={"outline"}>
                    納品管理
                  </Button>
                </SheetClose>
                <SheetClose>
                  <Button className="w-full" variant={"outline"}>
                    管理者設定
                  </Button>
                </SheetClose>
                <SheetClose>
                  <Button className="w-full" variant={"outline"}>
                    環境設定
                  </Button>
                </SheetClose>
                <SheetClose>
                  <Button
                    className="w-full"
                    variant={"outline"}
                    onClick={handleLogout}
                  >
                    ログアウト
                  </Button>
                </SheetClose>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div>{children}</div>
    </div>
  );
}
