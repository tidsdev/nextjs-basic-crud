import Footer from "./components/uis/footer";
import NavBar from "./components/uis/navBar";
import "./globals.css";
import ConditionalBanner from "./components/uis/conditionalBanner";
import { Card } from "@mui/material";

export const metadata = {
  title: "Next.js CRUD App",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathName = usePathname();

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-200">
        <NavBar></NavBar>
        <ConditionalBanner />
        <Card className="flex-grow bg-white shadow-md  mx-4 my-4 p-4">
          <div className="flex-grow container mx-auto p-4">{children}</div>
        </Card>
        <Footer></Footer>
      </body>
    </html>
  );
}
