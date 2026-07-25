"use client";
import { Table, TableColumnsType, Tooltip } from "antd";
import mockData, { DataType } from "./data";

export default function Home() {
  const ColumTemplate = (props: { text: string; type: string }) => {
    const { type, text } = props;
    return (
      <div>
        <span className="z-50 relative">{text}</span>
        {(text === `${type}失败` || text === `部分${text}成功`) && (
          <Tooltip className="z-50 relative" placement="top" title={"原因..."}>
            <span className="z-50 relative">?</span>
          </Tooltip>
        )}
      </div>
    );
  };
  const columns: TableColumnsType = [
    {
      title: "单据号",
      dataIndex: "invoicesNumber",
      key: "invoicesNumber",
      align: "center",
      render: (text: string) => <ColumTemplate text={text} type="单据号" />,
    },
    {
      title: "下载状态",
      dataIndex: "downloadStatus",
      key: "downloadStatus",
      align: "center",
      render: (text: string) => <ColumTemplate text={text} type="下载" />,
    },
    {
      title: "抽取状态",
      dataIndex: "extractStatus",
      key: "extractStatus",
      align: "center",
      render: (text: string) => <ColumTemplate text={text} type="抽取" />,
    },
    {
      title: "推送状态",
      dataIndex: "pushStatus",
      key: "pushStatus",
      align: "center",
      render: (text: string) => <ColumTemplate text={text} type="推送" />,
    },
    {
      title: "下载时间",
      dataIndex: "downloadTime",
      key: "downloadTime",
      align: "center",
      render: (text: string) => <ColumTemplate text={text} type="下载时间" />,
    },
  ];

  //附件
  const expandedRowRender = (record: DataType) => {
    const { attachment } = record;
    const AttachmentWrap = (props: Record<"text", string>) => {
      const { text } = props;
      return (
        <div className="flex px-[8.5rem] py-4 hover:border-l-4">{text}</div>
      );
    };
    return (
      <div className="flex flex-col ">
        {attachment && attachment.length !== 0 ? (
          attachment.map((attachment, index) => {
            return <AttachmentWrap key={`attachment${index}`} text={attachment}></AttachmentWrap>;
          })
        ) : (
          <AttachmentWrap text={"无附件"}></AttachmentWrap>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen p-12 bg-violet-300">
      <Table
        className="overflow-hidden text-center"
        bordered={false}
        rowClassName={"text-center"}
        expandable={{
          expandedRowRender,
          expandedRowClassName: () => "",
          expandIcon: ({ expanded, onExpand, record }) => (
            <div
              className="absolute h-full left-0 top-0 w-screen cursor-pointer z-40"
              onClick={(e) => {
                onExpand(record, e);
              }}
            ></div>
          ),
        }}
        columns={columns}
        dataSource={mockData}
        pagination={false}
      ></Table>
    </div>
  );
}
