import * as React from "react";
import { PageHeader, Button, Divider } from "antd";
import { EditableTableForm } from "./EditableTableForm";
import { GithubOutlined } from "@ant-design/icons";

export const App = () => {
  return (
    <div className="App" style={{ padding: 24 }}>
      <PageHeader
        title="Ant Design Table Form Example"
        extra={[
          <React.Fragment>
            <iframe
              title={"github-stars"}
              src="https://ghbtns.com/github-btn.html?user=gges5110&repo=ant-design-table-form&type=star&count=true&size=large"
              scrolling="0"
              frameBorder="0"
              width="120px"
              height="30px"
            />
          </React.Fragment>,
          <Button
            type="primary"
            icon={<GithubOutlined />}
            href={"https://github.com/gges5110/ant-design-table-form"}
          >
            Project Source
          </Button>
        ]}
      >
        <Divider />
        <EditableTableForm />
      </PageHeader>
    </div>
  );
};
