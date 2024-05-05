"use client"

import { useEffect, useState } from "react";
import { redirect } from "next/navigation"

export default function Redirect() {
    const [seconds, setseconds] = useState<number>(3)

    useEffect(() => {
        const interval = setInterval(() => {
            setseconds(seconds => seconds - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    useEffect(() => {
        if (seconds <= 0) {
            redirect("/")
        }
    }, [seconds])
  return (
    <div>
      <h1>Redirecting in {seconds}</h1>
    </div>
  );
}