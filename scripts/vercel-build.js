import { execSync } from "node:child_process";

console.log(`Running build in "${process.env.VERCEL_ENV}" environment`);

execSync("prisma generate", { stdio: "inherit" });
execSync("prisma migrate deploy", { stdio: "inherit" });

execSync("next build", { stdio: "inherit" });
