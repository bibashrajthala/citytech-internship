import { TreeSelect } from "antd";
import React, { useState } from "react";
const treeData = [
  {
    title: "Node1",
    value: "Node1",
    children: [
      {
        title: "Child Node1",
        value: "Child Node1",
      },
      {
        title: "Child Node2",
        value: "Child Node2",
      },
    ],
  },
  {
    title: "Node2",
    value: "Node2",
  },
];

const TreeSelectCountry = () => {
  const [value, setValue] = useState(undefined);

  const onChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <>
      <TreeSelect
        showSearch
        style={{
          width: "50%",
        }}
        value={value}
        dropdownStyle={{
          maxHeight: 400,
          overflow: "auto",
        }}
        treeData={treeData}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={onChange}
      />
    </>
  );
};

export default TreeSelectCountry;
