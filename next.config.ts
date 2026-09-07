import type { NextConfig } from "next";

// 部署到 GitHub Pages 子路径（https://<user>.github.io/xieyi/）。
// basePath 必须 === 仓库名（含大小写）。本地开发留空；CI 通过 NEXT_PUBLIC_BASE_PATH 注入。
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // 静态导出：`next build` 把整站预渲染为静态 HTML 到 out/，无需 Node 服务器。
  output: "export",
  // 子路径部署：所有资源/路由自动加此前缀。
  basePath,
  // GitHub Pages 直接访问 /xxx 会 404，加尾斜杠指向 /xxx/index.html。
  trailingSlash: true,
  // 允许从非 localhost 来源访问 dev server（如远程/端口转发 192.168.204.1），
  // 否则 Next.js 16 会拦截跨源开发资源，页面只剩裸 HTML（线框、切不了主题、画布不挂载）。
  allowedDevOrigins: ["192.168.204.1", "localhost", "127.0.0.1"],
};

export default nextConfig;
