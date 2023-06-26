import { Select } from "antd";
import React from "react";

const Selectyear = (props) => {
  const { nameLabel, valueYear, valueUpdate } = props;
  const { Option } = Select;
  const years = [];
  for (let i = new Date().getFullYear(); i >= 1990; i--) {
    years.push(i);
  }
  return (
    <>
      <label className="lable-name">{nameLabel}</label>
      <Select
        size="large"
        allowClear
        placeholder={nameLabel}
        onChange={valueYear}
        value={valueUpdate}
      >
        {years.map((item, index) => (
          <Option key={`year-${index}`} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default Selectyear;
