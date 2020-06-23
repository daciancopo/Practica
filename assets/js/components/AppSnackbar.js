import React, { useContext, Fragment } from "react";
import { Snackbar, SnackbarContent, Button } from "@material-ui/core";
import { TodoContext } from "../contexts/TodoContext";

function checkLevel(level) {
  switch (level) {
    case "success":
      return "green";

    case "error":
      return "red";

    case "warning":
      return "orange";

    default:
      return "white";
  }
}

export default function AppSnackbar() {
  const context = useContext(TodoContext);
  const handleClose = () => {
    context.setMessage({});
  };
  return (
    <div>
      <Snackbar
        onClose={handleClose}
        autoHideDuration={6000}
        open={context.message.text !== undefined}
      >
        {context.message.text && (
          <SnackbarContent
            style={{
              backgroundColor: checkLevel(context.message.level),
              whiteSpace: "pre",
            }}
            message={context.message.text}
            action={[
              <Button onClick={handleClose} key="dismiss" color="inherit">
                dismiss
              </Button>,
            ]}
          />
        )}
      </Snackbar>
    </div>
  );
}
