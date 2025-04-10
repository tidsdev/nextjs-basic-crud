import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="flex gap-8 justify-center items-center font-bold p-4 sticky top-0 bg-white shadow-md">
      <Link href="/">
        Home
      </Link>
      <Link href="/shop">
        Shop
      </Link>
      <Link href="/shop/create">
        Manage Product
      </Link>
      <Link href="/shop">
        About
      </Link>
    </nav>
  );
};

export default NavBar;
