import React, { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";

const STORAGE_KEY = "muya_crm_access_ok";

// İstersen bunu sonra env'e alırız, şimdilik sabit:
const ACCESS_CODE = "MUYA-2025";

export default function AccessGate({ children }) {
  const [ready, setReady] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const ok = localStorage.getItem(STORAGE_KEY) === "true";
      if (ok) setReady(true);
    } catch (e) {}
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (code.trim() !== ACCESS_CODE) {
      setError("Erişim kodu hatalı.");
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch (e) {}

    setReady(true);
  };

  if (ready) return children;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgb(20,20,20)] via-[rgb(15,15,25)] to-[rgb(10,10,15)] p-4">
      <Card className="w-full max-w-md bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-white">M</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-white text-center">CRM Erişim Kodu</CardTitle>
          <CardDescription className="text-center text-[rgb(161,161,170)]">
            CRM paneline giriş için size verilen kodu girin
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}

            <Input
              placeholder="Erişim kodu"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
              autoFocus
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold"
            >
              Devam Et
            </Button>

            <div className="text-center text-xs text-[rgb(161,161,170)]">
              Kod tarayıcıda saklanır; aynı cihazda tekrar sormaz.
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
