import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import Heading from "@/app/components/backoffice/PageHeader";


export default function page() {
  return (
    <div>
      {/* header */}
      <PageHeader heading="" href="/dashboard/categories/new"/>
      {/* table */}
      <h2>Categories</h2>
    </div>
  );
}
