import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const serverEntry = path.join(root, "dist/server/index.js");
const clientDir = path.join(root, "dist/client");

const mod = await import(serverEntry);
const handler = mod.default;

const routes = ["/"];

for (const route of routes) {
  const req = new Request("http://localhost" + route);
  const res = await handler.fetch(req, {}, {});
  const html = await res.text();
  const filePath =
    route === "/"
      ? path.join(clientDir, "index.html")
      : path.join(clientDir, route.replace(/^\//, ""), "index.html");
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, html);
  console.log(`prerendered ${route} -> ${path.relative(root, filePath)} (${res.status}, ${html.length} bytes)`);
}
