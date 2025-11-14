import { auth, signOut, signIn } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { BadgePlus, LogOut } from "lucide-react";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="bg-white font-work-sans text-black p-4">
      <nav className="container mx-auto flex justify-between">
        <div className="text-lg font-bold ">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={144} height={30} />
          </Link>
        </div>
        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link className="flex items-center" href="/startup/create">
                <span className="max-sm:hidden mr-2">Create Startup</span>
                <BadgePlus className="size-6 text-blue-500" />
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button className="cursor-pointer flex items-center" type="submit">
                  <span className="max-sm:hidden mr-2">Logout</span>
                  <LogOut className="size-6 text-red-500" />
                </button>
              </form>

              <Link className="flex items-center" href={`/user/${session?.id}`}>
                <span className="max-sm:hidden mr-2">{session?.user?.name}</span>
                <Avatar className="size-10">
                  <AvatarImage src={session.user.image} alt={session.user.name} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button className="cursor-pointer" type="submit">
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
