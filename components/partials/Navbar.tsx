import Logo from "@/components/partials/Logo";
import ThemeSwitcher from "@/components/partials/ThemeSwitcher";
import { SignedIn, UserButton } from "@clerk/nextjs";

function Navbar() {
  return (
    <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
      <Logo />
      <div className="flex gap-4 items-center">
        <ThemeSwitcher />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navbar;
