import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names conditionally, supporting Tailwind and custom classes.
 * @param inputs - class values
 */
export function cn(...inputs: any[]) {
	return twMerge(clsx(...inputs));
}
