import * as React from "react";
import { PageHeader, Button, Divider } from "antd";
import { EditableTableForm } from "./EditableTableForm";
import { GithubOutlined } from "@ant-design/icons";
import GitHubButton from "react-github-btn";

export const App = () => {
  return (
    <div className="App">
      <PageHeader
        title="Ant Design Table Form Example"
        extra={[
          <GitHubButton
            href="https://github.com/gges5110/ant-design-table-form"
            data-size="large"
            data-show-count={true}
            aria-label="Star gges5110/ant-design-table-form on GitHub"
          >
            Star
          </GitHubButton>,
          <Button
            type="primary"
            icon={<GithubOutlined />}
            href={"https://github.com/gges5110/ant-design-table-form"}
            style={{ paddingTop: 0 }}
          >
            Project Source
          </Button>
        ]}
      >
        <Divider style={{ marginTop: 0 }} />
        <EditableTableForm />
      </PageHeader>
    </div>
  );
};
