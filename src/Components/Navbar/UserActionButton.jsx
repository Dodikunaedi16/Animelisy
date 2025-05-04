import Link from "next/link";
import { autUserSession } from "@/libs/auth-libs";

const UserActionButton = async () => {
  const user = await autUserSession();
  const actionLabel = user ? "Sign Out" : "Sign In";
  const actionURL = user ? "/api/auth/signout" : "/api/auth/signin";

  return (
    <div className="flex justify-center gap-4 mt-4">
      {user && (
        <Link
          href="/users/dashboard"
          className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 px-8 rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 transition-all"
        >
          Dashboard
        </Link>
      )}
      <Link
        href={actionURL}
        className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 px-8 rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 transition-all"
      >
        {actionLabel}
      </Link>
    </div>
  );
};

export default UserActionButton;
