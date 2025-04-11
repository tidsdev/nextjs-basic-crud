import Link from "next/link";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import InventoryIcon from "@mui/icons-material/Inventory";
import PersonIcon from "@mui/icons-material/Person";
const NavBar = () => {
  return (
    <nav className="flex items-center font-bold p-4 sticky top-0 bg-white shadow-md">
      <div className="flex gap-8">
        <Link
          href="/"
          className="hover:text-gray-500 transition-colors duration-100 flex items-center"
        >
          <HomeFilledIcon fontSize="medium" className="mr-2" />
          HOME
        </Link>
        <Link
          href="/shop"
          className="hover:text-gray-500 transition-colors duration-100 flex items-center"
        >
          <ShoppingBasketIcon fontSize="medium" className="mr-2" />
          SHOP
        </Link>
        <Link
          href="/shop/create"
          className="hover:text-gray-500 transition-colors duration-100 flex items-center"
        >
          <InventoryIcon fontSize="medium" className="mr-2" />
          MANAGE PRODUCT
        </Link>
      </div>
      <div className="flex-1 text-center">
        <h1 className="text-2xl font-bold text-gray-800">MY WEBSITE SHOP</h1>
      </div>
      <Link
        href="/login"
        className="ml-auto hover:text-gray-500 transition-colors duration-100 flex items-center"
      >
        <PersonIcon fontSize="medium" className="mr-2" />
        LOGIN
      </Link>
    </nav>
  );
};

export default NavBar;
