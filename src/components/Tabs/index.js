import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";

export function TabPanel(props) {
  const { value, index, content } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {content}
    </div>
  );
}

export default function BaseTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { tabLabel, tabPanel = [] } = props;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ marginBottom: "12px" }}>
        <Tabs value={value} onChange={handleChange}>
          {tabLabel.map((item, key) => {
            return <Tab label={item} key={key.toString()} />;
          })}
        </Tabs>
      </Box>
      {tabPanel.map((item, key) => {
        const isValidElement = React.isValidElement(item.content);
        let Component;
        if (isValidElement) {
          Component = item.content;
        } else {
          let Comp = item.content;
          Component = <Comp />;
        }

        return (
          <TabPanel
            value={value}
            key={key.toString()}
            index={key}
            content={Component}
          />
        );
      })}
    </Box>
  );
}
