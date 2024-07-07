"use client";

import React, { useEffect, useState } from "react";

import { supabaseClient } from "@/services/supabase/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

enum PreviewType {
  preview = "顧客一覧",
  search = "顧客検索",
  register = "顧客登録",
}

const CustomerPage = () => {
  const [editType, setEditType] = useState<PreviewType>(PreviewType.preview);

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [customers, setCustomers] = useState<any[]>([]);

  const fetchCustomers = async () => {
    const { data, error } = await supabaseClient.from("customers").select("*");
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setCustomers(data);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleRegister = async () => {
    const { error } = await supabaseClient
      .from("customers") // テーブル名を指定
      .insert([{ name: customerName, email, phone, address }]);

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted successfully");
      setCustomerName("");
      setEmail("");
      setPhone("");
      setAddress("");
      fetchCustomers();
    }
  };

  console.log(customers);

  return (
    <div>
      <h3 className="text-xl font-bold mt-3">顧客管理</h3>
      <Select onValueChange={(value) => setEditType(value as PreviewType)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={PreviewType.preview} />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value={PreviewType.preview}>
            {PreviewType.preview}
          </SelectItem>
          <SelectItem value={PreviewType.search}>
            {PreviewType.search}
          </SelectItem>
          <SelectItem value={PreviewType.register}>
            {PreviewType.register}
          </SelectItem>
        </SelectContent>
      </Select>
      <div className="p-3">
        {editType === PreviewType.preview && (
          <div>
            <h3>顧客一覧</h3>
            <ul>
              {customers.map((customer) => (
                <li key={customer.id}>
                  {customer.email} - {customer.phone} - {customer.address}
                </li>
              ))}
            </ul>
          </div>
        )}
        {editType === PreviewType.search && <div>顧客検索</div>}
        {editType === PreviewType.register && (
          <div>
            <h3>顧客登録</h3>
            <div className="flex flex-col gap-3">
              <Input
                placeholder="顧客名"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <Input
                placeholder="メールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="電話番号"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input
                placeholder="住所"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <Button onClick={handleRegister}>顧客登録</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerPage;
