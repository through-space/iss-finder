export enum EPackageID {
	"typescript",
	"react",
	"vite",
	"tailwindcss",
	"prettier",
	"eslint",
}

export interface IPackage {
	name: string;
	version?: string;
	image?: string;
}
