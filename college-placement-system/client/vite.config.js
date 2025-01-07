import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [reactRefresh()],
  define: {
    "process.env": process.env,
  },
});
