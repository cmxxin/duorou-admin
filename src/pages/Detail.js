/*
 * Created Date: 2019-10-14 5:24:06 pm
 * Author: cmax(1052520900@qq.com)
 * -----
 * Last Modified: 2019-10-14 6:30:57 pm
 * Modified By: cmax(1052520900@qq.com)
 * -----
 * Copyright © 2019 mjgf
 */
import React, { Component } from "react";
import { Card, List, Form, Col, Row, Select, Button, Input, Alert } from "antd";
import { connect } from "dva";
import { PageHeaderWrapper } from "@ant-design/pro-layout";

import styles from "./detail.less";

@connect(({ detail, loading }) => ({
  detail: detail.data,
  loading: loading.effects["detail/getData"]
}))
class ListPage extends Component {
  componentDidMount() {
    this.init();
  }

  init() {
    this.props.dispatch({
      type: "detail/getData",
      payload: {
        id: this.props.match.params.id
      }
    });
  }

  render() {
    const { detail = {}, loading } = this.props;
    const { desc = "", category = {} } = detail;

    return (
      <PageHeaderWrapper
        title={
          <span>
            {detail.name}
            <em
              style={{
                fontSize: 18,
                fontWeight: 400,
                fontStyle: "normal",
                marginLeft: 20
              }}
            >
              ({category.title})
            </em>
          </span>
        }
      >
        <Card loading={loading}>
          <div
            dangerouslySetInnerHTML={{ __html: desc }}
            className={styles.content}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(ListPage);
