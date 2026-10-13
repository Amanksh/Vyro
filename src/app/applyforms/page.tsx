import type { Metadata } from "next";
import { CreatorApplicationPage } from "@/components/sites/swayhouse/creator-application-page";

export const metadata: Metadata = {
  title: "Apply as a Creator | Vyro influence",
  description: "Apply to work with Vyro influence on creator collaborations and brand campaigns.",
};

export default function Route() {
  return <CreatorApplicationPage />;
}
