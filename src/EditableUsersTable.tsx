import { useState } from "react";
import * as React from "react";
import { Form, Input, Button, Table } from "antd";
import { PlusOutlined, EditOutlined, MinusOutlined } from "@ant-design/icons";

const { Column } = Table;

export const EditableUsersTable = props => {
  const { users, add, remove } = props;
  const [editingIndex, setEditingIndex] = useState(undefined);

  return (
    <Table
      dataSource={users}
      pagination={false}
      footer={() => {
        return (
          <Form.Item>
            <Button onClick={add}>
              <PlusOutlined /> Add field
            </Button>
          </Form.Item>
        );
      }}
    >
      <Column
        dataIndex={"age"}
        title={"Age"}
        render={(value, row, index) => {
          // console.log(row);
          return (
            <Form.Item name={[index, "age"]}>
              {({ getFieldValue, getFieldsValue }) => {
                console.log(getFieldsValue());
                return (
                  <React.Fragment>
                    {editingIndex === index ? (
                      <Input
                        placeholder="age"
                        style={{ width: "30%", marginRight: 8 }}
                      />
                    ) : (
                      getFieldValue(["users", index, "age"])
                    )}
                  </React.Fragment>
                );
              }}
            </Form.Item>
          );
        }}
      />
      <Column
        dataIndex={"name"}
        title={"Name"}
        render={(value, row, index) => {
          return (
            <Form.Item name={[index, "name"]}>
              <Input
                placeholder="name"
                style={{ width: "30%", marginRight: 8 }}
              />
            </Form.Item>
          );
        }}
      />
      <Column
        title={"Action"}
        render={(value, row, index) => {
          return (
            <React.Fragment>
              <Button
                icon={<EditOutlined />}
                shape={"circle"}
                style={{ marginRight: 8 }}
              />
              <Button
                icon={<MinusOutlined />}
                shape={"circle"}
                onClick={() => remove(row.name)}
              />
            </React.Fragment>
          );
        }}
      />
    </Table>
  );
};
