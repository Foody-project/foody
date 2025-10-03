import * as React from "react";
import Link from "next/link";
import { SlashIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function BreadcrumbWithCustomSeparator({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  return (
    <Breadcrumb className="text-gray-500 pl-3 lg:pl-0">
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={`item-${index}`}>
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink asChild>
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-black"
                  >
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="text-gray-500">
                  {item.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && (
              <BreadcrumbSeparator key={`sep-${index}`}>
                <SlashIcon className="text-gray-500" />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
