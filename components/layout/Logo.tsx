import { FuentivoLogo } from "@/components/branding/FuentivoLogo";

type LogoProps = {
  label: string;
};

export function Logo({ label }: LogoProps) {
  return <FuentivoLogo label={label} variant="full" format="svg" size="md" priority />;
}
