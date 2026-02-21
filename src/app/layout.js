import "./globals.css";

export const metadata = {
  title: "REZLIX | Modern Architectural Design",
  description:
    "Innovative architectural design agency creating sustainable and timeless spaces.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
