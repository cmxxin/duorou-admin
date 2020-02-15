import React, { useEffect, useState } from "react";
import { connect } from "dva";
import { Redirect } from "umi";
import { stringify } from "querystring";
import PageLoading from "@/components/PageLoading";

const SecurityLayout = props => {
  const { dispatch, children, loading, currentUser } = props;
  const [isReady, setReady] = useState(false);
  const isLogin = localStorage.token && !!currentUser && !!currentUser._id;
  const queryString = stringify({
    redirect: window.location.href
  });

  useEffect(() => {
    if (dispatch) {
      setReady(true);
      dispatch({
        type: "user/fetchCurrent"
      });
    }
  }, []);

  if ((!isLogin && loading == true) || !isReady) {
    return <PageLoading />;
  }

  if (!isLogin && isReady && !loading) {
    return <Redirect to={`/user/login?${queryString}`}></Redirect>;
  }

  return children;
};

// export default SecurityLayout;
export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.effects["user/fetchCurrent"]
}))(SecurityLayout);
