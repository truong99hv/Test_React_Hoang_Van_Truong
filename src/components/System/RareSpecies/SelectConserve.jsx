import { Select } from "antd";
import React from "react";

const SelectConserve = (props) => {
  const { dataConserve, nameConserve, handleConserve } = props;
  const { Option } = Select;
  return (
    <>
      <label className="lable-name">{nameConserve}</label>
      <Select
        allowClear
        placeholder={nameConserve}
        size="large"
        onChange={handleConserve}
      >
        {dataConserve.map((item, index) => (
          <Option key={`${nameConserve}-${index}`} value={item.id}>
            {item.ma_danh_muc} - {item.ten}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default SelectConserve;
