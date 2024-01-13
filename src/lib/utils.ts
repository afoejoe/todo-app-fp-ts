import { EFilter } from "@/types/enums";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const applyVariant = (filter: EFilter, currentFilter: EFilter) => {
  return filter === currentFilter ? "default" : "outline";
};
