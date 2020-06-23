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
  Typography,
} from "@material-ui/core";

export default function TodoTable() {
  const context = useContext(TodoContext);
  const [addTodoName, setAddTodoName] = useState("");
  const [addTodoDescription, setAddTodoDescription] = useState("");
  const [editIsShown, setEditIsShown] = useState(false);
  const [editTodoName, setEditTodoName] = useState("");
  const [editTodoDescription, setEditTodoDescription] = useState("");
  const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(
    false
  );
  const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

  const onCreateSubmit = (event) => {
    event.preventDefault();
    context.createTodo(event, {
      name: addTodoName,
      description: addTodoDescription,
    });
    setAddTodoName("");
    setAddTodoDescription("");
  };

  const onUpdateSubmit = (todoId, event) => {
    event.preventDefault();
    context.updateTodo({
      id: todoId,
      name: editTodoName,
      description: editTodoDescription,
    });
    setEditIsShown(false);
  };

  return (
    <Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <form onSubmit={onCreateSubmit}>
                <TextField
                  required
                  type="text"
                  value={addTodoName}
                  onChange={(event) => {
                    setAddTodoName(event.target.value);
                  }}
                  label="New Task"
                  fullWidth
                />
              </form>
            </TableCell>
            <TableCell>
              <form>
                <TextField
                  required
                  type="text"
                  value={addTodoDescription}
                  onChange={(event) => {
                    setAddTodoDescription(event.target.value);
                  }}
                  label="Task Description"
                  fullWidth
                  multiline
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
                        fullWidth
                        autoFocus
                        value={editTodoName}
                        onChange={(event) => {
                          setEditTodoName(event.target.value);
                        }}
                      />
                    </form>
                  ) : (
                  <Typography>{todo.name}</Typography>
                  )}
                </TableCell>
                <TableCell>
                  {editIsShown === todo.id ? (
                    <form onSubmit={onUpdateSubmit.bind(this, todo.id)}>
                      <TextField
                        type="text"
                        multiline
                        fullWidth
                        autoFocus
                        value={editTodoDescription}
                        onChange={(event) => {
                          setEditTodoDescription(event.target.value);
                        }}
                      />
                    </form>
                  ) : (
                    <Typography style={{whiteSpace: 'pre-wrap'}}>{todo.description}</Typography>
                  )}
                </TableCell>
                <TableCell align="right">
                  {editIsShown === todo.id ? (
                    <Fragment>
                      <IconButton onClick={onUpdateSubmit.bind(this, todo.id)}>
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
                          setEditTodoName(todo.name);
                          setEditTodoDescription(todo.description);
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
