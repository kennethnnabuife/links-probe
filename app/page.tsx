"use client";

import { FormEvent, useState, MouseEvent } from "react";
import axios from "axios";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleScan = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setResult("");
    try {
      const res = await axios.post<{ message: string }>("/api/scan", { url });
      setResult(res.data.message);
    } catch (err) {
      setResult("Error: Unable to scan this link.");
    } finally {
      setLoading(false);
    }
  };

  const handleMouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
    (e.target as HTMLButtonElement).style.backgroundColor = "#0099cc";
  };

  const handleMouseLeave = (e: MouseEvent<HTMLButtonElement>) => {
    (e.target as HTMLButtonElement).style.backgroundColor = "#00bfff";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #070b19 0%, #10142c 60%, #090c1b 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "20px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {/* Hero Section */}
      <div style={{ textAlign: "center", maxWidth: "600px" }}>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#00bfff",
          }}
        >
          🔍 Links<span style={{ color: "white" }}>Probe</span>
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#cfcfcf",
            marginBottom: "40px",
          }}
        >
          Instantly check if a link is safe, suspicious, or dangerous — powered
          by intelligent threat analysis.
        </p>

        <form
          onSubmit={handleScan}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Enter a URL (e.g. https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "12px 15px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              fontSize: "1rem",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#00bfff",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "12px 25px",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {loading ? "Scanning..." : "Scan Link"}
          </button>
        </form>

        {result && (
          <div
            style={{
              marginTop: "30px",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 0 10px rgba(0,191,255,0.2)",
            }}
          >
            <p
              style={{
                fontSize: "1.1rem",
                fontWeight: "bold",
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

      <footer
        style={{
          marginTop: "70px",
          textAlign: "center",
          color: "#8b8b8b",
          fontSize: "0.9rem",
        }}
      >
        <p>
          © {new Date().getFullYear()} LinksProbe — built with ❤️ by{" "}
          <a
            href="https://github.com/kennethnnabuife"
            style={{ color: "#00bfff", textDecoration: "none" }}
            target="_blank"
            rel="noreferrer"
          >
            Kenneth Nnabuife
          </a>
        </p>
        <p style={{ marginTop: "5px" }}>
          Open Source on{" "}
          <a
            href="https://github.com/kennethnnabuife/links-probe"
            style={{ color: "#00bfff", textDecoration: "none" }}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
