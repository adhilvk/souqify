"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

import {
  Boxes,
  Building2,
  CircleDollarSign,
  LayoutList,
  LayoutGrid,
  ScanSearch,
  Slack,
  Users2,
  Truck,
  MonitorPlay,
  Warehouse,
  UserSquare2,
  User,
  ExternalLink,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { usePathname } from "next/navigation";

export default function Sidebar({ showSidebar, setShowSidebar }) {
  const pathname = usePathname();

  const sidebarLinks = [
    { title: "Customers", icon: Users2, href: "/dashboard/customers" },
    { title: "Markets", icon: Warehouse, href: "/dashboard/markets" },
    { title: "Farmers", icon: UserSquare2, href: "/dashboard/farmers" },
    { title: "Orders", icon: Truck, href: "/dashboard/orders" },
    { title: "Our Staff", icon: User, href: "/dashboard/staff" },
    { title: "Limi Community", icon: Building2, href: "/dashboard/community" },
    { title: "Wallet", icon: CircleDollarSign, href: "/dashboard/community" },
    { title: "Settings", icon: LayoutGrid, href: "/dashboard/settings" },
    { title: "Online Store", icon: ExternalLink, href: "/" },
  ];

  const catalogueLinks = [
    { title: "Products", icon: Boxes, href: "/dashboard/products" },
    { title: "Categories", icon: LayoutList, href: "/dashboard/categories" },
    { title: "Coupons", icon: ScanSearch, href: "/dashboard/coupons" },
    { title: "Store Banners", icon: MonitorPlay, href: "/dashboard/banners" },
  ];

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div
      className={
        showSidebar
          ? "bg-white text-slate-800 dark:text-slate-50 dark:bg-slate-800 sm:block mt-20 sm:mt-0 w-64 h-screen fixed left-0 top-0 z-40 space-y-6 overflow-y-scroll"
          : "bg-white text-slate-800 dark:text-slate-50 dark:bg-slate-800 mt-20 sm:mt-0 hidden sm:block w-64 h-screen fixed left-0 top-0 z-40 space-y-6 overflow-y-scroll"
      }
    >
      {/* Logo */}
      <Link
        onClick={() => setShowSidebar(false)}
        className="mb-6 block text-xl font-bold px-6 py-4"
        href="/dashboard"
      >
        <Image
          src="/logo-dark.jpg"
          alt="Logo"
          width={70}
          height={70}
          className="rounded-full"
        />
      </Link>

      <div className="space-y-3 flex flex-col">
        {/* Dashboard */}
        <Link
          onClick={() => setShowSidebar(false)}
          href="/dashboard"
          className={
            pathname === "/dashboard"
              ? "flex items-center space-x-3 px-6 py-2 border-l-8 border-lime-500 text-lime-500"
              : "flex items-center space-x-3 px-6 py-2"
          }
        >
          <LayoutGrid />
          <span> Dashboard</span>
        </Link>

        {/* Catalogue */}
        <Collapsible className="px-6 py-2">
          <CollapsibleTrigger
            onClick={() => setOpenMenu(!openMenu)}
            className={`flex items-center justify-between w-full py-2 ${
              catalogueLinks.some((item) => pathname.startsWith(item.href))
                ? "text-lime-500"
                : ""
            }`}
          >
            <div className="flex items-center space-x-3">
              <Slack />
              <span>Catalogue</span>
            </div>
            {openMenu ? <ChevronDown /> : <ChevronRight />}
          </CollapsibleTrigger>

          {/* Dropdown Menu */}
          <CollapsibleContent className="ml-6 mt-1 flex flex-col space-y-1">
            {catalogueLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  onClick={() => setShowSidebar(false)}
                  key={i}
                  href={item.href}
                  className={
                    pathname === item.href
                      ? "flex items-center space-x-3 px-3 py-2 text-sm rounded-md bg-lime-50 text-lime-600 dark:bg-lime-900 dark:text-lime-300"
                      : "flex items-center space-x-3 px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-700"
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </CollapsibleContent>
        </Collapsible>

        {/* Sidebar Links */}
        {sidebarLinks.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              onClick={() => setShowSidebar(false)}
              key={i}
              href={item.href}
              className={
                item.href == pathname
                  ? "flex items-center space-x-3 px-6 py-2 border-l-8 border-lime-500 text-lime-500"
                  : "flex items-center space-x-3 px-6 py-2"
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}

        {/* Logout */}
        <div className="px-6 py-2">
          <button className="bg-lime-600 rounded-md flex items-center space-x-3 px-6 py-3 text-white hover:bg-lime-700 transition">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
