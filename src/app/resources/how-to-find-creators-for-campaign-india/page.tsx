import type { Metadata } from "next";
import { HtmlPage } from "@/components/sites/swayhouse/html-page";
import { page } from "@/components/sites/swayhouse/generated/resources__how-to-find-creators-for-campaign-india";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Route() {
  return <HtmlPage html={page.html} chrome={page.chrome} />;
}
