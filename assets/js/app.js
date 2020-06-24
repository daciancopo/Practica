import React, { Component } from "react";
import ReactDOM from "react-dom";
import TodoContextProvider from "./contexts/TodoContext";
import TodoTable from "./components/TodoTable";
import AppSnackbar from "./components/AppSnackbar";
import DefaultThemeProvider from "./components/themes/DefaultThemeProvider";

class App extends Component {
  render() {
    return (
      <TodoContextProvider>
          <TodoTable />
          <AppSnackbar />
      </TodoContextProvider>
    );
  }
}

ReactDOM.render(
  <DefaultThemeProvider>
    <App />
  </DefaultThemeProvider>,
  document.getElementById("root")
);
