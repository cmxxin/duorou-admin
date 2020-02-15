import { Alert, Checkbox, Icon } from "antd";
import { FormattedMessage, formatMessage } from "umi-plugin-react/locale";
import React, { Component } from "react";
import Link from "umi/link";
import { connect } from "dva";
import LoginComponents from "./components/Login";
import styles from "./style.less";

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

@connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects["login/login"]
}))
class Login extends Component {
  loginForm = undefined;

  state = {
    tabType: "account",
    autoLogin: true,
    type: "login"
  };

  componentDidMount() {
    this.props.dispatch({
      type: "user/saveCurrentUser",
      payload: {}
    });
  }

  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch } = this.props;
      if (this.state.type === "register") {
        dispatch({
          type: "login/register",
          payload: { ...values }
        });
      } else {
        dispatch({
          type: "login/login",
          payload: { ...values }
        });
      }
    }
  };

  onTabChange = type => {
    this.setState({
      type
    });
  };

  switchType = () => {
    this.setState(prevState => ({
      type: prevState.type === "login" ? "register" : "login"
    }));
  };

  renderMessage = ({ content, type = "error" }) => (
    <Alert
      style={{
        marginBottom: 24
      }}
      message={content}
      type={type}
      showIcon
    />
  );

  render() {
    const { userLogin, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    const { tabType, autoLogin, type } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={tabType}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={form => {
            this.loginForm = form;
          }}
        >
          {status === "error" &&
            !submitting &&
            this.renderMessage({
              content: formatMessage({
                id:
                  loginType === "account"
                    ? "user-login.login.message-invalid-credentials"
                    : "user-register.register.message-username-or-password-empty"
              })
            })}
          {status === "warn" &&
            loginType === "register" &&
            !submitting &&
            this.renderMessage({
              content: formatMessage({
                id: "user-register.register.message-username-aleready-exists"
              })
            })}
          {status === "ok" &&
            loginType === "register" &&
            !submitting &&
            this.renderMessage({
              content: "注册成功，请登录",
              type: "success"
            })}
          <UserName
            name="username"
            placeholder={`${formatMessage({
              id: "user-login.login.userName"
            })}:`}
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: "user-login.userName.required"
                })
              }
            ]}
          />
          <Password
            name="password"
            placeholder={`${formatMessage({
              id: "user-login.login.password"
            })}:`}
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: "user-login.password.required"
                })
              }
            ]}
            onPressEnter={e => {
              e.preventDefault();

              if (this.loginForm) {
                this.loginForm.validateFields(this.handleSubmit);
              }
            }}
          />
          {/* <Tab
            key="mobile"
            tab={formatMessage({
              id: 'user-login.login.tab-login-mobile',
            })}
          >
            {status === 'error' &&
              loginType === 'mobile' &&
              !submitting &&
              this.renderMessage(
                formatMessage({
                  id: 'user-login.login.message-invalid-verification-code',
                }),
              )}
            <Mobile
              name="mobile"
              placeholder={formatMessage({
                id: 'user-login.phone-number.placeholder',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'user-login.phone-number.required',
                  }),
                },
                {
                  pattern: /^1\d{10}$/,
                  message: formatMessage({
                    id: 'user-login.phone-number.wrong-format',
                  }),
                },
              ]}
            />
            <Captcha
              name="captcha"
              placeholder={formatMessage({
                id: 'user-login.verification-code.placeholder',
              })}
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText={formatMessage({
                id: 'user-login.form.get-captcha',
              })}
              getCaptchaSecondText={formatMessage({
                id: 'user-login.captcha.second',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'user-login.verification-code.required',
                  }),
                },
              ]}
            />
          </Tab> */}
          <div>
            {/* <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="user-login.login.remember-me" />
            </Checkbox> */}
            {/* <a
              style={{
                float: 'right',
              }}
              href=""
            >
              <FormattedMessage id="user-login.login.forgot-password" />
            </a> */}
          </div>
          <Submit loading={submitting}>
            <FormattedMessage
              id={
                type === "login"
                  ? "user-login.login.login"
                  : "user-register.register.register"
              }
            />
          </Submit>
          <div className={styles.other}>
            {/* <FormattedMessage id="user-login.login.sign-in-with" />
            <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
            <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
            <Icon type="weibo-circle" className={styles.icon} theme="outlined" /> */}
            <a className={styles.register} onClick={this.switchType}>
              <FormattedMessage
                id={
                  type === "login"
                    ? "user-login.login.signup"
                    : "user-login.register.sign-in"
                }
              />
            </a>
          </div>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
