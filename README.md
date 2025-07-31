# Context Studio

一个用于构建和管理 AI 系统消息的工具，允许用户通过拖放或粘贴来上传多种类型的文件和文本，自动提取内容、生成标题和摘要，并计算 token 数量。

## 功能

- **多格式文件支持**：支持上传 `.txt`, `.md`, `.pdf`, `.doc`, `.docx`, `.ppt`, `.pptx`, `.xls`, `.xlsx`, 图片（`.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.webp`, `.tiff`）, 音频（`.mp3`, `.wav`, `.ogg`, `.m4a`, `.flac`）, 网页（`.html`, `.htm`）, 以及 `.csv`, `.json`, `.xml`, `.zip`, `.epub` 等文件。
- **文本粘贴**：支持直接粘贴文本内容。
- **内容提取**：通过后端服务将上传的文件（如 PDF、图片、音频等）转换为 Markdown 格式的纯文本。
- **智能分析**：利用 AI 模型为提取的文本内容生成简洁的标题和摘要。
- **Token 计算**：使用 `tiktoken` 库精确计算文本内容的 token 数量（基于 `cl100k_base` 编码）。
- **可视化统计**：在页面顶部以迷你地图（MiniMap）的形式直观展示每个来源的 token 数量占比。
- **一键复制**：将所有处理完成的文档内容，以 `<document title="...">...</document>` 的格式，一键复制到剪贴板。
- **响应式设计**：采用 UnoCSS 和 SvelteKit 构建，界面简洁美观，适配不同屏幕尺寸。

## 技术栈

- **前端框架**：[Svelte](https://svelte.dev/) (v5)
- **样式与原子化 CSS**：[UnoCSS](https://unocss.dev/) (v66.3.3)
- **代码格式化与检查**：`prettier`, `eslint`
- **构建与部署**：使用 `bun` 作为包管理器和构建工具，通过 GitHub Actions 自动部署到 GitHub Pages。
