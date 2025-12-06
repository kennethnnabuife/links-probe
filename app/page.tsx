"use client";

import { FormEvent, useState } from "react";
import axios from "axios";
import { Poppins } from "next/font/google";
import { useEffect } from "react";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) =>
      setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
        background: "radial-gradient(circle at 20% 20%, #0a0f28, #05070f 70%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "20px",
        overflow: "hidden",
        position: "relative",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Keyframes */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        @keyframes slowFloat {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-25px) translateX(15px); }
          100% { transform: translateY(0px) translateX(0px); }
        }

        @keyframes cloudWave {
          0% { transform: translateX(0); opacity: 0.18; }
          50% { opacity: 0.28; }
          100% { transform: translateX(-50%); opacity: 0.18; }
        }
      `}</style>

      {/* UPDATED MOUSE-FOLLOW GLOW (Bigger + Perfectly aligned) */}
      <div
        style={{
          position: "absolute",
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,191,255,0.35) 0%, transparent 75%)",
          pointerEvents: "none",
          left: mousePosition.x - 170 + "px",
          top: mousePosition.y - 170 + "px",
          transition: "transform 0.03s linear",
          filter: "blur(18px)",
          zIndex: 1,
        }}
      />

      {/* ORIGINAL TWO PARTICLES */}
      <div
        style={{
          position: "absolute",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "rgba(0,191,255,0.6)",
          filter: "blur(3px)",
          top: "15%",
          left: "30%",
          animation: "float 6s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "rgba(0,191,255,0.35)",
          filter: "blur(4px)",
          top: "70%",
          left: "60%",
          animation: "float 8s ease-in-out infinite",
        }}
      />

      {/* FLOATING ORBS */}
      <div
        style={{
          position: "absolute",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,150,255,0.22), transparent 70%)",
          top: "18%",
          left: "5%",
          filter: "blur(30px)",
          animation: "slowFloat 12s ease-in-out infinite",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,255,255,0.18), transparent 70%)",
          top: "65%",
          left: "70%",
          filter: "blur(40px)",
          animation: "slowFloat 18s ease-in-out infinite reverse",
          zIndex: 0,
        }}
      />

      {/* LIGHT CLOUD WAVE */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "200%",
          height: "200%",
          background:
            "linear-gradient(135deg, rgba(0,200,255,0.08), transparent 70%)",
          animation: "cloudWave 22s linear infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* CONTENT */}
      <div style={{ textAlign: "center", maxWidth: "650px", zIndex: 2 }}>
        <Link
          href="https://linksprobe.com"
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
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow =
                "0 0 20px #00eaff, 0 0 40px #00aaff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow =
                "0 0 10px #00eaff, 0 0 25px #0088ff";
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
              transition: "all 0.25s ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = "2px solid #00eaff";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(0,234,255,0.5)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = "2px solid rgba(0,191,255,0.2)";
              e.currentTarget.style.boxShadow = "0 0 12px rgba(0,191,255,0.1)";
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
              transition: "all 0.25s ease",
              boxShadow: "0 0 12px rgba(0,150,255,0.5)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 18px rgba(0,200,255,0.9)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 12px rgba(0,150,255,0.5)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(0.97)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
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
              animation: "floatUp 3s ease-in-out infinite",
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
          transition: "opacity 0.3s ease",
          zIndex: 2,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
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
