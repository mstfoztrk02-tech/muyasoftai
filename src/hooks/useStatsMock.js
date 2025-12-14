import { useCallback, useEffect, useState } from "react";

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min, max, digits = 1) {
  const n = Math.random() * (max - min) + min;
  return Number(n.toFixed(digits));
}

function generateStats() {
  const total_calls = randInt(800, 12000);
  const today_calls = randInt(50, 1200);
  const active_calls = randInt(0, 120);

  const answered_calls = Math.min(total_calls, randInt(Math.floor(total_calls * 0.35), Math.floor(total_calls * 0.9)));
  const failed_calls = Math.max(0, total_calls - answered_calls);

  const total_campaigns = randInt(1, 40);
  const total_trunks = randInt(1, 30);
  const avg_duration = randInt(12, 240); // saniye

  return {
    total_calls,
    today_calls,
    active_calls,
    answered_calls,
    failed_calls,
    total_campaigns,
    total_trunks,
    avg_duration,
    // istersen ekstra alanlar:
    asr: randFloat(20, 85, 1),
    aloc: avg_duration,
  };
}

export default function useStatsMock() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState(""); // artık hata yok

  const refetch = useCallback(() => {
    setLoading(true);
    // küçük gecikme: gerçek API hissi
    setTimeout(() => {
      setStats(generateStats());
      setLoading(false);
    }, randInt(250, 650));
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { stats, loading, error, refetch };
}
