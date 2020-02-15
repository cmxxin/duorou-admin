import React, { Component } from "react";
import { Card, Alert, Table, message } from "antd";
import { connect } from "dva";
import { PageHeaderWrapper } from "@ant-design/pro-layout";

const columns = target => [
  { title: "ID", dataIndex: "id", key: "_id" },
  { title: "名称", dataIndex: "title", key: "title" },
  { title: "链接", dataIndex: "href", key: "href" },
  {
    title: "总量",
    dataIndex: "count",
    key: "count",
    align: "right",
    render: (text, record) => {
      if (record.children) {
        let total = 0;
        record.children.forEach(item => {
          total += item.items.length;
        });
        return (
          <span style={{ fontWeight: "700", color: "#f86c41", fontSize: 14 }}>
            {total}
          </span>
        );
      }
      return <span stylee={{ fontSize: 12 }}>{record.items.length}</span>;
    }
  },
  {
    title: "操作",
    key: "action",
    render: (text, record) =>
      record.children && record.children.length ? null : (
        <a onClick={() => target.getCategoryData(record)}>同步数据</a>
      )
  }
];

@connect(({ category, loading }) => ({
  list: category.list,
  loading: loading.effects["category/getData"],
  detailLoading: loading.effects["category/getDetail"]
}))
class Welcome extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "category/getData"
    });
  }

  getCategoryData = async data => {
    if (!data.children && !this.props.detailLoading) {
      const hide = message.loading("正在同步数据..", 0);
      try {
        await this.props.dispatch({
          type: "category/getDetail",
          payload: data
        });
        await this.props.dispatch({
          type: "category/getData"
        });
        hide();
        message.success("获取数据成功");
      } catch (error) {
        hide();
        message.error("获取数据失败");
      }
    }
  };

  render() {
    const { list, loading } = this.props;

    return (
      <PageHeaderWrapper>
        <Card>
          <Alert
            message="欢迎使用"
            type="success"
            showIcon
            banner
            style={{ margin: -12, marginBottom: 24 }}
          />
          <Table
            rowKey={record => record.id}
            columns={columns(this)}
            dataSource={list}
            expandRowByClick
            loading={loading}
            pagination={false}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Welcome;
