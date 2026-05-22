import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

type Props = {
  labelLight: string;
  labelDark: string;
};

export function ThemeToggle({ labelLight, labelDark }: Props) {
  const { theme, toggle } = useTheme();
  const Icon = theme === "dark" ? Sun : Moon;
  const label = theme === "dark" ? labelLight : labelDark;
  return (
    <button type="button" onClick={toggle} aria-label={label} className="theme-toggle">
      <Icon size={16} strokeWidth={1.75} />
    </button>
  );
}
