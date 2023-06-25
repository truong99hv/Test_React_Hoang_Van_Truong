import React, { memo, useContext } from "react";
import { Button, Popover } from "antd";
import { Link } from "react-router-dom";
import ContentPopover from "./ContentPopover";
import { AuthContext } from "../../context/AuthContext";

import "./css/header.css";

const Header = memo(() => {
  const { user } = useContext(AuthContext);

  return (
    <div className="header">
      <div className="left-header">
        <Link to="/" className="link-logo">
          <img src="http://wlp.howizbiz.com/static/img/logo.png" alt="logo" />
        </Link>
        <div className="title-header">
          HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU TIÊN
          BẢO VỆ
        </div>
      </div>

      <div className="right-header">
        <Popover
          placement="bottom"
          content={<ContentPopover />}
          trigger="click"
        >
          <Button className="btn btn-user">
            <div className="avatar-user">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt="user.name" />
              ) : (
                <span>{user.name.split("").splice(0, 1)[0].toUpperCase()}</span>
              )}
            </div>
            <span className="name-user">{user.name}</span>
          </Button>
        </Popover>
      </div>
    </div>
  );
});

export default memo(Header);
