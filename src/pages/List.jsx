/*
 * Created Date: 2019-10-12 1:06:51 pm
 * Author: cmax(1052520900@qq.com)
 * -----
 * Last Modified: 2019-10-15 9:06:27 am
 * Modified By: cmax(1052520900@qq.com)
 * -----
 * Copyright © 2019 mjgf
 */
import React, { Component } from "react";
import { Card, List, Form, Col, Row, Select, Button, Input } from "antd";
import { connect } from "dva";
import { PageHeaderWrapper } from "@ant-design/pro-layout";

import styles from "./list.less";

const FormItem = Form.Item;
const { Option, OptGroup } = Select;

@connect(({ list, category, loading }) => ({
  ...list,
  categoriesList: category.list,
  listLoading: loading.effects["list/getData"],
  categoriesLoading: loading.effects["category/getData"]
}))
class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {},
      page: {
        current: 1,
        pageSize: 24
      }
    };
    this.getData = this.getData.bind(this);
    // this.handleChangeCategory = this.handleChangeCategory.bind(this)
  }

  componentDidMount() {
    this.getData();
    if (!this.props.categoriesList.length) {
      this.props.dispatch({
        type: "category/getData"
      });
    }
  }

  getData() {
    this.props.dispatch({
      type: "list/getData",
      payload: { ...this.state.params, ...this.state.page }
    });
  }

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState(
      {
        params: {}
      },
      this.getData
    );
  };

  handleSearch = e => {
    if (typeof e === "object") {
      e.preventDefault();
    }
    const { form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState(
        prevState => ({
          params: fieldsValue,
          page: {
            ...prevState.page,
            current: 1
          }
        }),
        () => {
          this.getData();
        }
      );
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm
    });
  };

  goToDetail(id) {
    this.props.history.push(`/detail/${id}`);
  }

  renderForm() {
    const { form, categoriesLoading, categoriesList } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.tableListForm}>
        <Form onSubmit={this.handleSearch} layout="inline">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={{ span: 6 }} sm={24}>
              <FormItem label="名称">
                {getFieldDecorator("name")(
                  <Input placeholder="请输入" maxLength={24} />
                )}
              </FormItem>
            </Col>
            <Col md={6} sm={24}>
              <FormItem label="分类">
                {getFieldDecorator("category", { initialValue: "" })(
                  <Select
                    placeholder="请选择"
                    style={{ width: "100%" }}
                    loading={categoriesLoading}
                    onSelect={this.handleSearch}
                  >
                    <Option value="">请选择</Option>
                    {categoriesList.map(item => (
                      <OptGroup key={item._id} label={item.title}>
                        {item.children.map(subItem => (
                          <Option key={subItem._id}>{subItem.title}</Option>
                        ))}
                      </OptGroup>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={6} sm={24}>
              <span>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button
                  style={{ marginLeft: 8 }}
                  onClick={this.handleFormReset}
                >
                  重置
                </Button>
              </span>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }

  render() {
    const { list, listLoading, total } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: this.state.page.pageSize,
      pageSizeOptions: ["24", "48", "60", "120"],
      total,
      onChange: (page, pageSize) => {
        this.setState(
          {
            page: {
              current: page,
              pageSize
            }
          },
          this.getData
        );
      }
    };

    return (
      <PageHeaderWrapper content={this.renderForm()} title={false}>
        <List
          rowKey="_id"
          loading={listLoading}
          grid={{ gutter: 24, xs: 1, sm: 2, lg: 3, xl: 4, xxl: 6 }}
          dataSource={list}
          pagination={paginationProps}
          renderItem={item => (
            <List.Item key={item.id}>
              <Card
                hoverable
                cover={<img alt="" src={item.poster} />}
                onClick={() => this.goToDetail(item._id)}
              >
                <Card.Meta title={item.name} />
              </Card>
            </List.Item>
          )}
        />
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(ListPage);
