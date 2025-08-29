import React from "react";
import Link from "next/link";
import PageHeader from "@/app/components/backoffice/PageHeader";
import TableActions from "@/app/components/backoffice/TableActions";

export default function Coupons() {
  return (
    <div>
      {/* header */}
      <PageHeader
        heading="Coupons"
        href="/dashboard/coupons/new"
        linkTitle="Add Coupon"
      />
      {/* table actions */}
<TableActions/>
<div className="py-8">
  <h2>Table</h2>
</div>
</div>
);
}
