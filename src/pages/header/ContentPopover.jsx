import { Button } from "antd";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ContentPopover = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="popover">
      <div className="avatar-user avatar-big">
        {user.avatar_url ? (
          <img src={user.avatar_url} alt="user.name" />
        ) : (
          <span>{user.name.split("").splice(0, 1)[0].toUpperCase()}</span>
        )}
      </div>
      <span className="name-user" style={{ marginTop: "10px" }}>
        {user.role.name}
      </span>

      <div
        className="role-user"
        style={{ backgroundColor: user.role.meta.color }}
      >
        {user.role.name}
      </div>
      <div className="list-btn">
        <Button className="btn btn-file">Hồ sơ</Button>
        <Button className="btn btn-logout" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </div>
    </div>
  );
};

export default ContentPopover;
