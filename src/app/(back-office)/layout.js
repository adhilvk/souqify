"use client"
import React from "react";
import Sidebar from "../components/backoffice/Sidebar";
import Navbar from "../components/backoffice/Navbar";
import { useState } from "react";


export default function layout({ children }) {
  const [showSidebar,setShowSidebar]=useState(false)
  return (
    <div className="flex">
      {/* Sidebar (w-64 = 16rem) */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
      
      <div className="w-full">
        {/* Navbar (shifted right to match sidebar width) */}
        <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>

        {/* Main content (margin-left matches sidebar width) */}
        <main className="sm:ml-64 p-8 bg-slate-100 dark:bg-slate-900 text-slate-50 min-h-screen mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
