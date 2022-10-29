import esbuild from "esbuild";

esbuild.build({
  entryPoints: ["src/index.ts"],
  outdir: "dist",
  format: "esm",
  platform: "node",
});
