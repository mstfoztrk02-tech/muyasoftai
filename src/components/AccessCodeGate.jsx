import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

const ACCESS_CODE = "MUYA-2025"; // burayı değiştirirsiniz
const STORAGE_KEY = "muya_crm_access";

export default function AccessCodeGate({ children }) {
  const [allowed, setAllowed] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const ok = localStorage.getItem(STORAGE_KEY);
    if (ok === "true") setAllowed(true);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    setError("");

    if (code.trim() !== ACCESS_CODE) {
      setError("Erişim kodu hatalı");
      return;
    }

    localStorage.setItem(STORAGE_KEY, "true");
    setAllowed(true);
  };

  if (allowed) return children;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black">
      <Card className="w-full max-w-md bg-[rgb(26,28,30)] border border-white/10">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
              M
            </div>
          </div>
          <CardTitle className="text-center text-white">CRM Erişim Kodu</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Devam etmek için erişim kodunu girin
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 p-2 rounded">
                {error}
              </div>
            )}

            <Input
              placeholder="Erişim kodu"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
              autoFocus
            />

            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              Devam Et
            </Button>

            <div className="text-xs text-center text-gray-500">
              Kod bu tarayıcıda saklanır.
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
