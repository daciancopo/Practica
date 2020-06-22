import React, { useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { TodoContext } from "../contexts/TodoContext";

export default function DeleteDialog(props) {
  const onHide = () => {
    props.setDeleteConfirmationIsShown(false);
  };
  const context = useContext(TodoContext);
  return (
    <Dialog onClose={onHide} fullWidth={true} maxWidth="sm" open={props.open}>
      <DialogTitle>Are you sure you want to delete?</DialogTitle>
      <DialogContent>{props.todo.name}</DialogContent>
      <DialogActions>
        <Button onClick={onHide}>Cancel</Button>
        <Button
          onClick={() => {
            context.deleteTodo({ id: props.todo.id, name: props.todo.name });
            onHide()
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteDialog.propType = {
  open: PropTypes.bool.isRequired,
  setDeleteConfirmationIsShown: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};
