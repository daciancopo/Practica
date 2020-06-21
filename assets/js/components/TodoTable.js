import React, {useContext, useState} from 'react';
import { TodoContext } from '../contexts/TodoContext';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField } from '@material-ui/core';

export default function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');

    return (
        <form onSubmit={(event) => {context.createTodo(event, { name: addTodo })}}>
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
                            <TextField value={addTodo} onChange={(event) => {setAddTodo(event.target.value)}} label="New Task" fullWidth={true}/>
                        </TableCell>
                        <TableCell align="right">
                            <IconButton type="submit">
                                <AddIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    {context.todos.slice().reverse().map((todo, index) => (
                        <TableRow key={'todo' + index}>
                            <TableCell>{todo.name}</TableCell>
                            <TableCell align="right">
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                                <IconButton>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </form>
    )
}