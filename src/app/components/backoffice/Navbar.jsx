"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlignJustify,
  Bell,
  LayoutDashboard,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ThemeSwitcherBtn from "../ThemeSwitcherBtn";

export default function Navbar({ setShowSidebar, showSidebar }) {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Client-only: simulate fetching notification count
    setNotificationCount(20);
  }, []);

  return (
    <div className="flex items-center justify-between bg-white dark:bg-slate-800 text-slate-50 h-20 pl-8 pr-8 py-8 fixed top-0 left-0 sm:left-64 right-0 z-50 sm:pr-[20rem]">
      <Link href="/dashboard" className="sm:hidden">
        Limi
      </Link>

      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="text-lime-700 dark:text-lime-500"
      >
        <AlignJustify />
      </button>

      <div className="flex space-x-3">
        <ThemeSwitcherBtn />

        {/* Notification Bell */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg"
            >
              <Bell className="text-green-600" />
              <span className="sr-only">Notifications</span>
              {notificationCount > 0 && (
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full -top-0 end-6 dark:border-gray-900">
                  {notificationCount}
                </div>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="py-2 px-4 pr-8">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {[1, 2, 3].map((_, i) => (
              <React.Fragment key={i}>
                <DropdownMenuItem>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-2">
                      <Image
                        src="/profile.jpg"
                        alt="User profile"
                        width={200}
                        height={200}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex flex-col space-y-1">
                        <p>Yellow corn stock out</p>
                        <div className="flex items-center space-x-2">
                          <p className="px-3 py-0.5 bg-red-700 text-white rounded-full text-sm">
                            Stock Out
                          </p>
                          <p className="mr-3">Dec 12 2021 - 12:40PM</p>
                        </div>
                      </div>
                    </div>
                    <button>
                      <X />
                    </button>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <Image
                src="/profile.jpg"
                alt="User profile"
                width={200}
                height={200}
                className="w-8 h-8 rounded-full"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="py-2 px-4 pr-8">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button className="flex items-center space-x-2">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button className="flex items-center space-x-2">
                <Settings className="mr-2 h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button className="flex items-center space-x-2">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
