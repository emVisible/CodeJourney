"use client";

import { GetServerSideProps } from "next";
import DOMPurify from "dompurify";

import {
  Card,
  CardContent,
  Avatar,
  Box,
  Chip,
  Typography,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import prisma from "@/prisma/prisma";
import { MCP_Repo, MCP_RepoDetail } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { VisitIcon, OverviewIcon } from "./icons";
import markdownParser from "./markdownParser";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ mt: "40px" }}>{children}</Box>}
    </div>
  );
};
const RepoCardDetail = () => {
  const searchParams = useSearchParams();
  const repo = searchParams.get("repo")!;
  const [tabValue, setTabValue] = useState(0);
  const mockMd =
    '# Markdown 测试文档\n\n这是一个简单的 **Markdown** 测试文档，展示了不同类型的内容。\n\n## 标题 2\n\n### 标题 3\n\n#### 标题 4\n\n##### 标题 5\n\n###### 标题 6\n\n## 列表\n\n### 无序列表\n\n- 项目 1\n- 项目 2\n  - 子项目 2.1\n  - 子项目 2.2\n- 项目 3\n\n### 有序列表\n\n1. 第一项\n2. 第二项\n3. 第三项\n\n## 链接\n\n[Google](https://www.google.com)\n\n## 图片\n\n![Markdown 图标](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)\n\n## 强调\n\n**加粗文本**\n\n*斜体文本*\n\n**_加粗斜体文本_**\n\n## 引用\n\n> 这是一个引用。\n\n## 代码\n\n### 行内代码\n这是一个 `console.log()` 示例。\n\n### 代码块\n```javascript\nfunction helloWorld() {\n  console.log("Hello, world!");\n}\n```\n\n## 表格\n\n| 姓名  | 年龄 | 职业   |\n| ----- | ---- | ------ |\n| 张三  | 28   | 程序员 |\n| 李四  | 34   | 设计师 |\n| 王五  | 22   | 学生   |\n\n## 分隔线\n\n---\n\n## 任务列表\n\n- [x] 完成任务 1\n- [ ] 完成任务 2\n- [ ] 完成任务 3';
  const detailData = {
    repo: "adhikasp/mcp-client-cli",
    desc: "A simple CLI to run LLM prompt and implement MCP client.",
    tags: "mcp,llm,langchain,model-context-protocol",
    star: 251,
    lang: "Python",
    update: "2025-03-04",
  };

  // const [detailData, setDetailData] = useState<MCP_Repo>();
  // const fetchData = async () => {
  //   const response = await fetch("/api/detail", {
  //     method: "POST",
  //     body: JSON.stringify({ repo }),
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   if (response.ok) {
  //     const res = await response.json();
  //     setDetailData(res);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  // if (!repo) return <Typography>Repo not found.</Typography>;
  // if (!detailData) return <Typography>Loading...</Typography>;
  // if (!detailData) return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "35px",
      }}
    >
      <Card
        sx={{
          width: "100%",
          height: "144px",
          borderRadius: 2,
          boxShadow: "0",
          background: "#f8f8f8",
          padding: 0,
        }}
      >
        <CardContent sx={{ pb: 1, height: "100%", p: 0 }}>
          <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
            className="w-full h-full"
          >
            <Box display="flex" alignItems="center">
              <Avatar
                sx={{
                  width: "100px",
                  height: "100px",
                  boxShadow: 2,
                  marginRight: "40px",
                }}
                variant="rounded"
                src={`https://github.com/${
                  detailData.repo.split("/")[0]
                }.png?size=100`}
              />
              <Box ml={2}>
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  lineHeight={"50px"}
                  sx={{
                    fontFamily: "PingFang SC, sans-serif",
                    color: "#666666",
                    fontSize: 42,
                  }}
                >
                  {detailData.repo.split("/")[1]}
                </Typography>
                <Typography
                  fontSize={12}
                  color="text.secondary"
                  sx={{
                    width: 650,
                    fontFamily: "PingFang SC",
                    fontSize: "16px",
                    lineHeight: "22px",
                  }}
                >
                  by{" "}
                  {detailData.desc ?? "There's no description in this project."}
                </Typography>
                <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
                  {detailData.tags
                    ? detailData.tags
                        .split(",")
                        .map((tag, index) => (
                          <Chip
                            key={index}
                            label={`# ${tag === "null" ? "mcp" : tag}`}
                            variant="outlined"
                            size="small"
                          />
                        ))
                    : ["mcp"].map((tag, index) => (
                        <Chip
                          key={index}
                          label={`# ${tag === "null" ? "mcp" : tag}`}
                          variant="outlined"
                          size="small"
                        />
                      ))}
                </Box>
              </Box>
            </Box>
            <Box
              ml={2}
              height={"100%"}
              display="flex"
              flexDirection={"column"}
              justifyContent={"space-around"}
            >
              <Box display="flex" alignItems="center" justifyContent={"end"}>
                <img
                  src="/github.svg"
                  alt="stars"
                  width={20}
                  className="mr-1"
                />
                <Typography fontSize={10}>{detailData.star}</Typography>
              </Box>
              <Button
                sx={{
                  textTransform: "none",
                }}
                variant="outlined"
                color="inherit"
                endIcon={<VisitIcon />}
                onClick={() => {
                  window.open(`https://github.com/${detailData.repo}`);
                }}
              >
                Visit Server
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Box
        sx={{
          padding: 0,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={(event, value) => {
            setTabValue(value);
          }}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{
              fontFamily: "Pingfang SC",
              fontSize: 16,
              textTransform: "none",
            }}
            label="Overview"
            icon={<OverviewIcon />}
            iconPosition="start"
          />
        </Tabs>
        <CustomTabPanel value={tabValue} index={0}>
          {
            <div
              className="markdown-body bg-none w-[1140px] px-16 py-10 min-h-[920px]"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(markdownParser.render(mockMd)),
              }}
            />
          }
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default RepoCardDetail;
