"use client";
import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from 'next/navigation';

function NavList() {
  const pathname = usePathname();

  const links = [
    { href: '/', text: 'Home' },
    { href: '/shop', text: 'Shop' },
    { href: '/tech-reviews', text: 'Tech Reviews' },
    { href: '/tech-support', text: 'Tech Support' },
    { href: '/community-forums', text: 'Community Forums' },
  ];

  const isPathActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname && pathname.startsWith(path);
  };

  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      {links.map((link) => (
        <Typography
          key={link.href}
          as={Link}
          href={link.href}
          variant="small"
          color="blue-gray"
          className={`font-medium ${isPathActive(link.href) ? 'navbar-path-selected' : ''}`}
        >
          <ListItem className="flex items-center gap-2 py-2 pr-4">{link.text}</ListItem>
        </Typography>
      ))}
    </List>
  );
}

export default function NavbarWithMegaMenu() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          <img src="./logo.svg" alt="logo" className="h-16 w-16" />
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}