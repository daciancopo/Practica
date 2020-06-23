import React, { Fragment, useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import DeleteDialog from "./DeleteDialog";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TextField,
} from "@material-ui/core";

export default function TodoTable() {
  const context = useContext(TodoContext);
  const [addTodo, setAddTodo] = useState("");
  const [editIsShown, setEditIsShown] = useState(false);
  const [editTodo, setEditTodo] = useState("");
  const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(
    false
  );
  const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

  const onCreateSubmit = (event) => {
    event.preventDefault();
    context.createTodo(event, { name: addTodo });
    setAddTodo("");
  };

  const onUpdateSubmit = (todoId, event) => {
    event.preventDefault();
    context.updateTodo({ id: todoId, name: editTodo });
    setEditIsShown(false);
  };

  return (
    <Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <form onSubmit={onCreateSubmit}>
                <TextField
                  type="text"
                  value={addTodo}
                  onChange={(event) => {
                    setAddTodo(event.target.value);
                  }}
                  label="New Task"
                  fullWidth={true}
                />
              </form>
            </TableCell>
            <TableCell align="right">
              <IconButton onClick={onCreateSubmit}>
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          {context.todos
            .slice()
            .reverse()
            .map((todo, index) => (
              <TableRow key={"todo" + index}>
                <TableCell>
                  {editIsShown === todo.id ? (
                    <form onSubmit={onUpdateSubmit.bind(this, todo.id)}>
                      <TextField
                        type="text"
                        fullWidth={true}
                        autoFocus={true}
                        value={editTodo}
                        onChange={(event) => {
                          setEditTodo(event.target.value);
                        }}
                      />
                    </form>
                  ) : (
                    todo.name
                  )}
                </TableCell>
                <TableCell align="right">
                  {editIsShown === todo.id ? (
                    <Fragment>
                      <IconButton
                        onClick={onUpdateSubmit.bind(this, todo.id)}
                      >
                        <DoneIcon style={{ color: "green" }} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setEditIsShown(false);
                        }}
                      >
                        <CloseIcon style={{ color: "red" }} />
                      </IconButton>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <IconButton
                        onClick={() => {
                          setEditIsShown(todo.id);
                          setEditTodo(todo.name);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setDeleteConfirmationIsShown(true);
                          setTodoToBeDeleted(todo);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Fragment>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {deleteConfirmationIsShown && (
        <DeleteDialog
          todo={todoToBeDeleted}
          setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
          open={deleteConfirmationIsShown}
        />
      )}
    </Fragment>
  );
}
