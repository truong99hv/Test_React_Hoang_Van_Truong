import { Select } from "antd";
import React from "react";

const SelectClassify = (props) => {
  const {
    dataClassify,
    nameClassify,
    handleFilterClassify,
    handleClear,
    valueUpdate,
  } = props;
  const { Option } = Select;
  return (
    <>
      <label className="lable-name">
        {nameClassify} <span className="obligatory">*</span>
      </label>
      <Select
        allowClear
        placeholder={nameClassify}
        size="large"
        onChange={handleFilterClassify}
        onClear={handleClear}
        value={valueUpdate}
      >
        {dataClassify.map((item, index) => (
          <Option
            key={`${nameClassify}-${index}`}
            value={item.uuid ? item.uuid : item.id}
          >
            {item.ten && item.ten !== null ? (
              <div>
                {item.ten_khoa_hoc} - {item.ten}
              </div>
            ) : (
              <div>{item.ten_khoa_hoc}</div>
            )}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default SelectClassify;
