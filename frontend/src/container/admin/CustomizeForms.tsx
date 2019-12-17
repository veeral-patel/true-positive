import { Button, Drawer } from "antd";
import React, { useState } from "react";

function CustomizeForms() {
  const [openDrawer, setOpenDrawer] = useState<"CREATE_FORM" | null>(null);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Forms</h3>
        <Button onClick={() => setOpenDrawer("CREATE_FORM")}>
          Create Form
        </Button>
      </div>
      <Drawer
        visible={openDrawer === "CREATE_FORM"}
        title={<h3>Create a form</h3>}
        width={600}
        maskClosable={false}
        keyboard={false}
        onClose={() => setOpenDrawer(null)}
      />
    </>
  );
}

export default CustomizeForms;
