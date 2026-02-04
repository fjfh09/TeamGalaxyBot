import { glob } from "glob";
import path from "path";

export async function loadFiles(dirName) {
    // Generate absolute path
    const absolutePath = path.join(process.cwd(), dirName);
    const pattern = `${absolutePath.replace(/\\/g, "/")}/**/*.{js,ts}`;
    
    // glob v10+ returns a Promise, and we need windowsPathsNoEscape: true maybe? 
    // Defaults are usually fine for simple globs.
    const Files = await glob(pattern, { windowsPathsNoEscape: true });
    
    // In ESM we don't need to delete cache like in CommonJS 
    // because we are not doing hot-reloading in the same way.
    // If needed, we would need to append a query param to the import URL.
    
    return Files;
}