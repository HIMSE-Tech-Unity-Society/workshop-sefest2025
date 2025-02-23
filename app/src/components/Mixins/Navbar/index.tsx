import {
    FC,
    useState,
    useEffect,
    forwardRef,
    ComponentPropsWithoutRef,
    ElementRef,
} from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Home, LogOut } from "lucide-react";

import { Categories } from "@/interfaces/categories";
import { useAuth } from "@/hooks/useAuth";
import { useCategories } from "@/hooks/useCategories";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import styles from "./Navbar.module.css";

const Navbar: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { user, logout } = useAuth();
    const { categories, isLoading } = useCategories();
    const location = useLocation();
    const navigate = useNavigate();

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
        const isHomePage = location.pathname === "/" && path === "/";

        if (isHomePage) {
            return true;
        }

        return location.pathname !== "/" && path !== "/" && location.pathname.includes(path);
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

                            <NavigationMenu className="hidden lg:block">
                                <NavigationMenuList>
                                    <NavigationMenuItem className="py-2">
                                        <NavigationMenuLink asChild>
                                            <Link to="/" className={cn(
                                                isMenuActive("/") ? "text-white font-semibold" : "text-white font-normal dark:text-zinc-50",
                                                "mx-4 lg:mx-2 text-base hover:text-gray-200 transition duration-300 ease-linear"
                                            )}>
                                                Home
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="text-base font-normal text-white hover:text-gray-200 bg-none hover:bg-none">Categories</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] grid-cols-2">
                                                <ListItem href="/" title="All Products" className="col-span-2">
                                                    View all products available in our store.
                                                </ListItem>
                                                {isLoading ? (
                                                    Array(4).fill(null).map((_) => (
                                                        <div key={_} className="flex gap-2">
                                                            <Skeleton className="rounded-full w-7 h-7" />
                                                            <div className="space-y-2">
                                                                <Skeleton className="h-3 w-[150px]" />
                                                                <Skeleton className="h-3 w-[100px]" />
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : categories?.map((a: Categories) => (
                                                    <ListItem key={a.category_id} href={`/category/${a.slug}`} title={a.name} className="col-span-1" imgSrc={import.meta.env.VITE_PUBLIC_API_PUBLIC_ASSET_URL + a.icon} />
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem className="py-2">
                                        <NavigationMenuLink asChild>
                                            <Link to="/about" className={cn(
                                                isMenuActive("/about") ? "text-white font-semibold" : "text-white font-normal dark:text-zinc-50",
                                                "mx-4 lg:mx-2 text-base hover:text-gray-200 transition duration-300 ease-linear"
                                            )}>
                                                About
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
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
                                            {user ? (
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
                                                        <DropdownMenuItem onClick={() => navigate('/creator')}>
                                                            <Home />
                                                            <span>Dashboard</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => logout()}>
                                                            <LogOut />
                                                            <span>Log out</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            ) : (
                                                <>
                                                    <NavigationMenuItem className="py-2">
                                                        <NavigationMenuLink asChild>
                                                            <Link to="/auth/login" className={cn(
                                                                isMenuActive("/auth/login") ? "text-white font-semibold" : "text-white font-normal dark:text-zinc-50",
                                                                "mx-4 lg:mx-2 text-base hover:text-gray-200 transition duration-300 ease-linear"
                                                            )}>
                                                                Log In
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    </NavigationMenuItem>

                                                    <NavigationMenuItem className="py-2">
                                                        <Link to="/auth/register" className="mx-4 lg:mx-2">
                                                            <Button className="bg-[#730fc3] hover:bg-[#5f0d8d] transition duration-150 ease-linear">
                                                                Sign Up
                                                            </Button>
                                                        </Link>
                                                    </NavigationMenuItem>
                                                </>
                                            )}
                                        </NavigationMenuList>
                                    </NavigationMenu>

                                    {/* Mobile View */}
                                    <NavigationMenu className="lg:hidden">
                                        <NavigationMenuList className="flex flex-col items-start">
                                            <NavigationMenuItem className="py-2">
                                                <NavigationMenuLink asChild>
                                                    <Link to="/" className={cn(
                                                        isMenuActive("/") ? "text-[#730fc3]" : "text-black dark:text-zinc-50",
                                                        "mx-4 lg:mx-2 font-normal text-base hover:text-[#730fc3] transition duration-300 ease-linear"
                                                    )}>
                                                        Home
                                                    </Link>
                                                </NavigationMenuLink>
                                            </NavigationMenuItem>

                                            <NavigationMenuItem className="py-2">
                                                <NavigationMenuTrigger className="px-3 text-base font-normal transition duration-300 ease-linear lg:mx-2 hover:text-[#730fc3]">Categories</NavigationMenuTrigger>
                                                <NavigationMenuContent className="min-w-[250px]">
                                                    <ul className="grid gap-3 p-3 md:w-[400px] lg:w-[500px] grid-cols-1 max-w-[250px]">
                                                        <ListItem href="/" title="All Products" className="col-span-1">
                                                            View all products available in our store.
                                                        </ListItem>
                                                        {isLoading ? (
                                                            Array(4).fill(null).map((_) => (
                                                                <div key={_} className="flex gap-2">
                                                                    <Skeleton className="rounded-full w-7 h-7" />
                                                                    <div className="space-y-2">
                                                                        <Skeleton className="h-3 w-[150px]" />
                                                                        <Skeleton className="h-3 w-[100px]" />
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : categories?.map((a: Categories) => (
                                                            <ListItem key={a.category_id} href={`/category/${a.slug}`} title={a.name} className="col-span-1" imgSrc={`http://localhost:8000/${a.icon}`} />
                                                        ))}
                                                    </ul>
                                                </NavigationMenuContent>
                                            </NavigationMenuItem>

                                            <NavigationMenuItem className="py-2">
                                                <NavigationMenuLink asChild>
                                                    <Link to="/about" className={cn(
                                                        isMenuActive("/about") ? "text-[#730fc3]" : "text-black dark:text-zinc-50",
                                                        "mx-4 lg:mx-2 font-normal text-base hover:text-[#730fc3] transition duration-300 ease-linear"
                                                    )}>
                                                        About
                                                    </Link>
                                                </NavigationMenuLink>
                                            </NavigationMenuItem>

                                            {user ? (
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
                                                        <DropdownMenuItem onClick={() => navigate('/creator')}>
                                                            <Home />
                                                            <span>Dashboard</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => logout()}>
                                                            <LogOut />
                                                            <span>Log out</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            ) : (
                                                <>
                                                    <NavigationMenuItem className="py-2">
                                                        <NavigationMenuLink asChild>
                                                            <Link to="/auth/login" className={cn(
                                                                isMenuActive("/auth/login") ? "text-[#730fc3]" : "text-black dark:text-zinc-50",
                                                                "mx-4 lg:mx-2 font-normal text-base hover:text-[#730fc3] transition duration-300 ease-linear"
                                                            )}>
                                                                Log In
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    </NavigationMenuItem>

                                                    <NavigationMenuItem className="py-2">
                                                        <Link to="/auth/register" className="mx-4 lg:mx-2">
                                                            <Button className="bg-[#730fc3] hover:bg-[#5f0d8d] transition duration-150 ease-linear">
                                                                Sign Up
                                                            </Button>
                                                        </Link>
                                                    </NavigationMenuItem>
                                                </>
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

export default Navbar;

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
