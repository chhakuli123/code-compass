import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  const navItems = [
    { name: 'Projects', href: '#projects' },
    { name: 'Features', href: '#features' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="bg-white/3 fixed left-0 right-0 top-0 z-50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center text-2xl font-semibold text-white"
          >
            🧭 CodeCompass
          </Link>
          <div className="hidden space-x-4 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-md rounded-md px-3 py-2 font-medium tracking-wide text-gray-200 hover:text-green-300"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
