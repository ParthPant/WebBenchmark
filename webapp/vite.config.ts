import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr"

export default ({ mode }) => {
    return defineConfig({
        base: './',
        build: {
            outDir: 'build',
            target: 'esnext'
        },
        plugins: [
            react(),
            svgr()
        ],
        server: {
            host: true,
            port: 3000 
        }
    })
}
