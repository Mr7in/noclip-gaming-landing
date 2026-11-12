/** Writes the demo QR codes as static SVGs in public/qr/. Run after a demo URL changes. */
import QRCode from "qrcode";
import { mkdirSync, writeFileSync } from "node:fs";

const codes = { fullcourt: "https://fullcourt-demo.noclipgaming.space/" };
mkdirSync("public/qr", { recursive: true });
for (const [name, url] of Object.entries(codes)) {
  const svg = await QRCode.toString(url, {
    type: "svg",
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#07080c", light: "#f7f3ea" },
  });
  writeFileSync(`public/qr/${name}.svg`, svg);
  console.log(`public/qr/${name}.svg`);
}
