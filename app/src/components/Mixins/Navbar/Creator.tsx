import {
  FC,
  useState,
  useEffect,
  forwardRef,
  ComponentPropsWithoutRef,
  ElementRef,
} from "react";
import { Link, useLocation } from "react-router";
import { LogOut } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import styles from "./Navbar.module.css";

const NavbarCreator: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { user, logout } = useAuth();
  const location = useLocation();

  // Hamburger menu handler
  const hamburgerHandler = () => {
    const hamburger = document.querySelector("#hamburger");
    const navMenu = document.querySelector("#navMenu");

    setIsOpen(!isOpen);

    if (isOpen) {
      hamburger?.classList.remove(styles.hamburgerActive);
      navMenu?.classList.add("hidden");
    } else {
      hamburger?.classList.add(styles.hamburgerActive);
      navMenu?.classList.remove("hidden");
    }
  };

  // isMenuActive handler
  const isMenuActive = (path: string) => {
    const isHomePage = location.pathname === "/creator" && path === "/creator";

    if (isHomePage) {
      return true;
    }

    return location.pathname !== "/creator" && path !== "/creator" && location.pathname.includes(path);
  };

  // Navbar fixed position if scrolling and Fetching Data
  useEffect(() => {
    window.onscroll = () => {
      const header = document.querySelector("header");
      const fixNav = header?.offsetTop ?? 0;

      if (window.pageYOffset > fixNav) {
        header?.classList.add(styles.navbarFixed);
      } else {
        header?.classList.remove(styles.navbarFixed);
      }
    };
  }, []);

  return (
    <header className="absolute top-0 left-0 z-10 flex items-center w-full bg-transparent">
      <div className="container mx-auto">
        <div className="mx-auto max-w-screen-2xl">
          <div className="relative flex items-center justify-between">
            <div className="flex items-center px-4">
              <div className="px-0 lg:px-4">
                <Link to="/" aria-label="logo" className="inline-flex items-center gap-2 py-6 text-xl font-bold font-primary lg:text-2xl">
                  <img src="/assets/svg/logo.svg" alt="Brand Logo" className="object-cover object-center w-full h-8" />
                </Link>
              </div>
            </div>

            <div className="flex items-center px-4">
              <button id="hamburger" name="hamburger" type="button" className="absolute block right-4 lg:hidden" onClick={hamburgerHandler}>
                <span className={`${styles.hamburgerLine} origin-top-left transition duration-300 ease-linear`}></span>
                <span className={`${styles.hamburgerLine} transition duration-300 ease-linear`}></span>
                <span className={`${styles.hamburgerLine} origin-bottom-left transition duration-300 ease-linear`}></span>
              </button>

              <nav id="navMenu" className="hidden absolute py-5 bg-white shadow-lg rounded-lg max-w-[250px] w-full right-4 top-full lg:block lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none">
                <ul className="block lg:flex">
                  {/* Desktop View */}
                  <NavigationMenu className="hidden lg:block">
                    <NavigationMenuList>
                      <NavigationMenuItem className="py-2">
                        <NavigationMenuLink asChild>
                          <Link to="/creator" className={cn(
                            isMenuActive("/creator") ? "text-white font-semibold" : "text-white font-normal dark:text-zinc-50",
                            "mx-4 lg:mx-2 text-base hover:text-gray-200 transition duration-300 ease-linear"
                          )}>
                            Dashboard
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>

                      <NavigationMenuItem className="py-2">
                        <NavigationMenuLink asChild>
                          <Link to="/creator/my-products" className={cn(
                            isMenuActive("/creator/my-products") ? "text-white font-semibold" : "text-white font-normal dark:text-zinc-50",
                            "mx-4 lg:mx-2 text-base hover:text-gray-200 transition duration-300 ease-linear"
                          )}>
                            My Products
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>

                      <NavigationMenuItem className="py-2">
                        <NavigationMenuLink asChild>
                          <Link to="/creator/orders" className={cn(
                            isMenuActive("/creator/orders") ? "text-white font-semibold" : "text-white font-normal dark:text-zinc-50",
                            "mx-4 lg:mx-2 text-base hover:text-gray-200 transition duration-300 ease-linear"
                          )}>
                            Orders
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>

                      <NavigationMenuItem className="py-2">
                        <NavigationMenuLink asChild>
                          <Link to="/creator/my-transactions" className={cn(
                            isMenuActive("/creator/my-transactions") ? "text-white font-semibold" : "text-white font-normal dark:text-zinc-50",
                            "mx-4 lg:mx-2 text-base hover:text-gray-200 transition duration-300 ease-linear"
                          )}>
                            My Transactions
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>

                      {user && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button className="px-3 py-6 bg-transparent hover:bg-transparent">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={`${import.meta.env.VITE_PUBLIC_API_STORAGE_URL}/${user?.avatar}`} alt={user?.name} />
                                <AvatarFallback className="text-black">{user?.name.charAt(1).toLocaleUpperCase()}</AvatarFallback>
                              </Avatar>
                              {user?.name}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-auto bg-[#d5e7f7] z-50" align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-400" />
                            <DropdownMenuItem onClick={() => logout()}>
                              <LogOut />
                              <span>Log out</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </NavigationMenuList>
                  </NavigationMenu>

                  {/* Mobile View */}
                  <NavigationMenu className="lg:hidden">
                    <NavigationMenuList className="flex flex-col items-start">
                      <NavigationMenuItem className="py-2">
                        <NavigationMenuLink asChild>
                          <Link to="/creator" className={cn(
                            isMenuActive("/creator") ? "text-[#730fc3] font-semibold" : "text-black font-normal",
                            "mx-4 lg:mx-2 text-base hover:text-[#730fc3] transition duration-300 ease-linear"
                          )}>
                            Dashboard
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>

                      <NavigationMenuItem className="py-2">
                        <NavigationMenuLink asChild>
                          <Link to="/creator/my-products" className={cn(
                            isMenuActive("/creator/my-products") ? "text-[#730fc3] font-semibold" : "text-black font-normal",
                            "mx-4 lg:mx-2 text-base hover:text-[#730fc3] transition duration-300 ease-linear"
                          )}>
                            My Products
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>

                      <NavigationMenuItem className="py-2">
                        <NavigationMenuLink asChild>
                          <Link to="/creator/orders" className={cn(
                            isMenuActive("/creator/orders") ? "text-[#730fc3] font-semibold" : "text-black font-normal",
                            "mx-4 lg:mx-2 text-base hover:text-[#730fc3] transition duration-300 ease-linear"
                          )}>
                            Orders
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>

                      <NavigationMenuItem className="py-2">
                        <NavigationMenuLink asChild>
                          <Link to="/creator/my-transactions" className={cn(
                            isMenuActive("/creator/my-transactions") ? "text-[#730fc3] font-semibold" : "text-black font-normal",
                            "mx-4 lg:mx-2 text-base hover:text-[#730fc3] transition duration-300 ease-linear"
                          )}>
                            My Transactions
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>

                      {user && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button className="px-3 py-6 bg-transparent hover:bg-transparent">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={`${import.meta.env.VITE_PUBLIC_API_STORAGE_URL}/${user?.avatar}`} alt={user?.name} />
                                <AvatarFallback className="text-black">{user?.name.charAt(1).toLocaleUpperCase()}</AvatarFallback>
                              </Avatar>
                              <span className="text-black">{user?.name}</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-auto bg-[#d5e7f7] z-50" align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-400" />
                            <DropdownMenuItem onClick={() => logout()}>
                              <LogOut />
                              <span>Log out</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </NavigationMenuList>
                  </NavigationMenu>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarCreator;

interface ListItemProps extends ComponentPropsWithoutRef<"a"> {
  imgSrc?: string;
  title: string;
}

const ListItem = forwardRef<ElementRef<"a">, ListItemProps>(({ className, title, children, imgSrc, ...props }, ref) => {
  return (
    <li className={className}>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            imgSrc ? "flex items-start gap-2" : "block",
            "select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          )}
          {...props}
        >
          {imgSrc && <img src={imgSrc} alt={title} className="w-7 h-7" loading="lazy" />}
          <div className="flex flex-col">
            <h2 className="text-sm font-medium leading-none">{title}</h2>
            <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">{children}</p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
