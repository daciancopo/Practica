import React, { useContext, Fragment } from "react";
import { Snackbar, SnackbarContent, Button } from "@material-ui/core";
import { TodoContext } from "../contexts/TodoContext";

function checkLevel(level) {
  switch (level) {
    case "success":
      return "green";

    case "error":
      return "red";

    default:
      return "orage";
  }
}

export default function AppSnackbar() {
  const context = useContext(TodoContext);
  return (
    <div>
      <Snackbar
        autoHideDuration={100}
        open={context.message.text !== undefined}
      >
        {context.message.text && (
          <SnackbarContent
            style={{ backgroundColor: checkLevel(context.message.level) }}
            message={context.message.text}
            action={[
              <Button
                onClick={() => {
                  context.setMessage({});
                }}
                key="dismiss"
                color="inherit"
              >
                dismiss
              </Button>,
            ]}
          />
        )}
      </Snackbar>
    </div>
  );
}
