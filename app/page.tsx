"use client";

import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

  function normalizeUrl(input: string): string {
    if (!input) return "";
    let u = input.trim();
    if (!/^[a-zA-Z]+:\/\//.test(u)) u = "https://" + u;
    try {
      const parsed = new URL(u);
      return parsed.origin + parsed.pathname + parsed.search;
    } catch {
      return input.trim();
    }
  }

  const handleScan = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) return;

    const cleanedUrl = normalizeUrl(url);

    setLoading(true);
    setResult("");

    try {
      const res = await axios.post<{ message: string }>(BACKEND_URL, {
        url: cleanedUrl,
      });
      setResult(res.data.message);
    } catch (err) {
      console.error("Scan error:", err);
      setResult("Error: Unable to scan this link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={poppins.className}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "20px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* CLEAN BACKGROUND VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          zIndex: 1,
        }}
      />

      {/* MAIN CONTENT */}
      <div style={{ textAlign: "center", maxWidth: "650px", zIndex: 2 }}>
        <Link
          href="/"
          aria-label="Go to homepage"
          style={{ textDecoration: "none" }}
        >
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "800",
              letterSpacing: "1px",
              marginBottom: "10px",
              color: "#00eaff",
              cursor: "pointer",
              transition: "all 0.3s ease",
              textShadow: "0 0 10px #00eaff, 0 0 25px #0088ff",
            }}
          >
            🔍 Links<span style={{ color: "white" }}>Probe</span>
          </h1>
        </Link>

        <p
          style={{
            fontSize: "1.15rem",
            color: "#c5cce7",
            marginBottom: "40px",
            opacity: 0.9,
          }}
        >
          Instantly check if any link is safe, suspicious, or dangerous with
          advanced threat analysis.
        </p>

        <form
          onSubmit={handleScan}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Enter a URL (https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "420px",
              padding: "14px 18px",
              borderRadius: "14px",
              border: "2px solid rgba(0,191,255,0.2)",
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(10px)",
              color: "white",
              outline: "none",
              fontSize: "1.05rem",
              boxShadow: "0 0 12px rgba(0,191,255,0.1)",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, #00bfff, #0088ff)",
              color: "white",
              border: "none",
              borderRadius: "14px",
              padding: "14px 35px",
              fontWeight: "700",
              fontSize: "1.05rem",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 0 12px rgba(0,150,255,0.5)",
            }}
          >
            {loading ? "Scanning..." : "Scan Link"}
          </button>
        </form>

        {result && (
          <div
            style={{
              marginTop: "35px",
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
              padding: "25px",
              borderRadius: "16px",
              border: "1px solid rgba(0,191,255,0.25)",
              boxShadow:
                "0 0 20px rgba(0,191,255,0.2), inset 0 0 20px rgba(0,191,255,0.15)",
            }}
          >
            <p
              style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                color: result.includes("Safe")
                  ? "#4ade80"
                  : result.includes("Dangerous")
                  ? "#f87171"
                  : "#facc15",
              }}
            >
              {result}
            </p>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer
        style={{
          marginTop: "60px",
          textAlign: "center",
          color: "#9ba0b8",
          fontSize: "0.9rem",
          opacity: 0.85,
          zIndex: 2,
        }}
      >
        <p>
          © {new Date().getFullYear()} LinksProbe, built by{" "}
          <a
            href="https://github.com/kennethnnabuife"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#00eaff", textDecoration: "none" }}
          >
            Kenneth Nnabuife
          </a>
        </p>
        <p style={{ marginTop: "5px" }}>
          View Source on{" "}
          <a
            href="https://github.com/kennethnnabuife/links-probe"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#00eaff", textDecoration: "none" }}
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
