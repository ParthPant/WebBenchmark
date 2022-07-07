import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr"

export default ({ mode }) => {
    return defineConfig({
        base: '/Profile',
        build: {
            outDir: 'build',
            target: 'esnext'
        },
        plugins: [
            react(),
            svgr()
        ]
    })
}