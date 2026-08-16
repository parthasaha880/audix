/**
 * Passenger / cPanel Node.js App startup file.
 * Do not use `next start` as the Application startup file.
 *
 * cPanel Application Manager:
 *   Application URL:     https://audix.kormo.bd/
 *   Application mode:    Production
 *   Application startup: server.js
 *
 * Live: upload `.env.production` next to this file.
 * Do NOT upload `.env.local` to the live server (it overrides production).
 * Run `npm run build` on the server (or upload a built `.next`) before starting.
 */
const fs = require("fs");
const path = require("path");
const { loadEnvConfig } = require("@next/env");
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

// cPanel Production mode should set this; default to production for Passenger
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "production";
}

const dev = process.env.NODE_ENV !== "production";
loadEnvConfig(__dirname, dev);

// On live, force .env.production to win over any accidental .env.local
if (!dev) {
  const prodPath = path.join(__dirname, ".env.production");
  if (fs.existsSync(prodPath)) {
    const content = fs.readFileSync(prodPath, "utf8");
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  }
}

const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port: Number(port) });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    if (typeof PhusionPassenger !== "undefined") {
      PhusionPassenger.configure({ autoInstall: false });
      createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      }).listen("passenger");
      return;
    }

    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start Next.js server:", err);
    process.exit(1);
  });
