import { dirname } from "path";

// Get the directory of the main module

let rootDir = "";

if (process.argv[1]) {
  rootDir = dirname(process.argv[1]);
}
export const mainModuleDir = rootDir;
