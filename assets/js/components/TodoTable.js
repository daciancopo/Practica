import React, { Fragment, useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
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

  return (
    <form
      onSubmit={(event) => {
        context.createTodo(event, { name: addTodo });
      }}
    >
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
              <TextField
                value={addTodo}
                onChange={(event) => {
                  setAddTodo(event.target.value);
                }}
                label="New Task"
                fullWidth={true}
              />
            </TableCell>
            <TableCell align="right">
              <IconButton type="submit">
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
                    <TextField
                      fullWidth={true}
                      value={editTodo}
                      onChange={(event) => {
                        setEditTodo(event.target.value);
                      }}
                    />
                  ) : (
                    todo.name
                  )}
                </TableCell>
                <TableCell align="right">
                  {editIsShown === todo.id ? (
                    <Fragment>
                      <IconButton
                        onClick={() => {
                          context.updateTodo({ id: todo.id, name: editTodo });
                          setEditIsShown(false);
                        }}
                      >
                        <DoneIcon style={{color: "green"}}/>
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setEditIsShown(false);
                        }}
                      >
                        <CloseIcon style={{color: "red"}}/>
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
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </Fragment>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </form>
  );
}
