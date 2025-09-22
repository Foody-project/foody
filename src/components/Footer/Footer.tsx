import { cn } from "@/utils/utils";

import { Footer, FooterBottom } from "@/components/ui/footer";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterProps {
  copyright?: string;
  policies?: FooterLink[];
  className?: string;
}

export default function FooterSection({
  copyright = "© 2025 Corentin Deldalle. All rights reserved",
  policies = [
    { text: "Privacy Policy", href: "" },
    { text: "Terms of Service", href: "" },
  ],
  className,
}: FooterProps) {
  return (
    <footer className={cn("w-full px-4", className)}>
      <div className="max-w-container mx-auto">
        <Footer className="bg-transparent">
          <FooterBottom>
            <div>{copyright}</div>
            <div className="flex items-center gap-4">
              {policies.map((policy, index) => (
                <a key={index} href={policy.href}>
                  {policy.text}
                </a>
              ))}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
