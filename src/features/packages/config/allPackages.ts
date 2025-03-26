import { EPackageID, IPackage } from "../types";
import tsLogo from "@assets/package-logos/TypeScript.svg";
import reactLogo from "@assets/package-logos/react.svg";
import viteLogo from "@assets/package-logos/vite.svg";
import tailwindLogo from "@assets/package-logos/tailwindcss.svg";
import prettierLogo from "@assets/package-logos/prettier.svg";
import eslintLogo from "@assets/package-logos/ESLint.svg";

export const allPackages: Record<EPackageID, IPackage> = {
	[EPackageID.typescript]: {
		name: "Typescript",
		image: tsLogo,
	},
	[EPackageID.react]: {
		name: "React",
		image: reactLogo,
	},
	[EPackageID.vite]: {
		name: "Vite",
		image: viteLogo,
	},
	[EPackageID.tailwindcss]: {
		name: "TailwindCSS",
		image: tailwindLogo,
	},
	[EPackageID.prettier]: {
		name: "Prettier",
		image: prettierLogo,
	},
	[EPackageID.eslint]: {
		name: "eslint",
		image: eslintLogo,
	},
};
