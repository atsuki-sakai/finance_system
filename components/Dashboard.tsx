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
      <div className="flex justify-between">
        <h3 className="text-lg font-bold">Finance System</h3>
        <Sheet key={"bottom"}>
          <SheetTrigger>MENU</SheetTrigger>
          <SheetContent className="bg-white">
            <SheetHeader>
              <SheetTitle>管理メニュー</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
              <div className="flex flex-col gap-4 py-4">
                <Button
                  variant={"outline"}
                  onClick={() => router.push("/dashboard/customer")}
                >
                  顧客管理
                </Button>
                <Button className="w-full" variant={"outline"}>
                  請求管理
                </Button>
                <Button className="w-full" variant={"outline"}>
                  見積書管理
                </Button>
                <Button className="w-full" variant={"outline"}>
                  発注書管理
                </Button>
                <Button className="w-full" variant={"outline"}>
                  納品管理
                </Button>
                <Button variant={"outline"}>管理者設定</Button>
                <Button variant={"outline"}>環境設定</Button>
                <Button variant={"outline"}>ログアウト</Button>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Dashboard;
