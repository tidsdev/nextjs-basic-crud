import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="flex gap-8 justify-center items-center font-bold p-4">
      <Link href="/">
        Home
      </Link>
      <Link href="/shop">
        Shop
      </Link>
    </nav>
  );
};

export default NavBar;
