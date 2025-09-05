"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "To-Do", href: "/todo" },
    { name: "Completed", href: "/completed" },
    { name: "Deleted", href: "/deleted" },
  ];

  return (
    <nav style={{ padding: "8px" }}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            fontWeight: pathname === link.href ? "bold" : "normal",
            textDecoration: "none",
            marginRight: "8px",
          }}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
