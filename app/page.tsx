"use client";

import {
  FormEvent,
  useEffect,
  useState,
  MouseEvent as ReactMouseEvent,
} from "react";
import { Poppins } from "next/font/google";
import styles from "./page.module.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
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
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: cleanedUrl }),
      });

      const data = await res.json();
      setResult(data.message);
    } catch {
      setResult("Error: Unable to scan this link.");
    } finally {
      setLoading(false);
    }
  };

  const handleMouseEnter = (e: ReactMouseEvent<HTMLButtonElement>) => {
    (e.target as HTMLButtonElement).style.backgroundColor = "#0099cc";
  };

  const handleMouseLeave = (e: ReactMouseEvent<HTMLButtonElement>) => {
    (e.target as HTMLButtonElement).style.backgroundColor = "#00bfff";
  };

  return (
    <div className={`${styles.container} ${poppins.className}`}>
      <div
        className={styles.glow}
        style={{
          transform: `translate(${mousePosition.x - 100}px, ${
            mousePosition.y - 100
          }px)`,
        }}
      />

      <div className={styles.content}>
        <div
          className={styles.logoLink}
          onClick={() => window.location.reload()}
          role="button"
          aria-label="Reload homepage"
        >
          <h1 className={styles.title}>
            🔍 Links<span className={styles.titleAccent}>Probe</span>
          </h1>
        </div>

        <p className={styles.subtitle}>
          Instantly check if a link is safe, suspicious, or dangerous, powered
          by intelligent threat analysis.
        </p>

        <form className={styles.form} onSubmit={handleScan}>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter a URL (e.g. https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className={styles.button}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {loading ? "Scanning..." : "Scan Link"}
          </button>
        </form>

        {result && (
          <div className={styles.result}>
            <p
              className={`${styles.resultText} ${
                result.includes("Safe")
                  ? styles.safe
                  : result.includes("Dangerous")
                  ? styles.danger
                  : styles.warning
              }`}
            >
              {result}
            </p>
          </div>
        )}
      </div>

      <footer className={styles.footer}>
        <p>
          © {new Date().getFullYear()} LinksProbe, built with ❤️ by{" "}
          <a
            href="https://github.com/kennethnnabuife"
            target="_blank"
            rel="noreferrer"
          >
            Kenneth Nnabuife
          </a>
        </p>
        <p className={styles.footerLinkRow}>
          Open Source on{" "}
          <a
            href="https://github.com/kennethnnabuife/links-probe"
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
