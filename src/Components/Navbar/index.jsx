import Link from "next/link";
import InputSearch from "./inputSearch";
import UserActionButton from "./UserActionButton";

const Navbar = () => {
  return (
    <header className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 shadow-lg">
      <div className="flex md:flex-row flex-col justify-between md:items-center p-6 gap-4 max-w-7xl mx-auto">
        <Link href="/" className="font-bold text-white text-3xl hover:text-amber-300 transition-all">
          ANIMEKU
        </Link>
        <div className="flex gap-4 items-center mt-2 md:mt-0">
          <InputSearch />
          <UserActionButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
