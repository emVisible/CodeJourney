import markdownit from 'markdown-it'
const markdownParser = new markdownit(
  {
    html: true, // 允许解析 HTML
    linkify: true, // 自动检测 URL
    typographer: true, // 启用 typographer 处理
  }
);

export default markdownParser