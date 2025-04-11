import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="flex gap-8 justify-center items-center font-bold p-4 sticky top-0 bg-white shadow-md">
      <Link href="/" className="hover:text-gray-500 transition-colors duration-100">
        Home
      </Link>
      <Link href="/shop" className="hover:text-gray-500 transition-colors duration-100">
        Shop
      </Link>
      <Link href="/shop/create" className="hover:text-gray-500 transition-colors duration-100">
        Manage Product
      </Link>
      <Link href="/login" className="hover:text-gray-500 transition-colors duration-100">
        Login
      </Link>
    </nav>
  );
};

export default NavBar;
