import NavBar from "./components/NavBar";
import "./globals.css";

export const metadata = {
  title: "Next.js CRUD App",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar></NavBar>
        {children}
      </body>
    </html>
  );
}
