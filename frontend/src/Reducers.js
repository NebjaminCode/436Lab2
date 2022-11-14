function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return action.username;
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE_TODO":
      const newTodo = {
        title: action.title,
        description: action.description,
        author: action.author,
        id: action.id,
        dateCreated: action.dateCreated,
        complete: action.complete,
        dateCompleted: action.dateCompleted,
      };
      return [newTodo, ...state];
    // below should change complete field and set the dateCompeted field
    case "TOGGLE_TODO":
      // iterating through list of todos to find todo with id that matches passed in id
      const toggleTodo = state.map((item) => {
        if (item.id === action.id) {
          const toggled = {
            ...item,
            complete: !item.complete,
            dateCompleted: Date(),
          };
          return toggled;
        }
        return item;
      });
      return toggleTodo;
    // below should delete a todo with a specific uuid
    // currently deletes ALL completed todos
    // fixed by moving complete check to inside each Todo
    case "FETCH_TODOS":
      return action.todos;
    case "DELETE_TODOS":
      return state.filter((item) => item.id !== action.id);
    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todos: todoReducer(state.todos, action),
  };
}
