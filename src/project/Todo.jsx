import { useState } from "react";

import dayjs from "dayjs";

export function Todo() {
  const [task, setTask] = useState("");
  const [todolist, setTodolist] = useState(
    !localStorage.getItem("todolist")
      ? []
      : JSON.parse(localStorage.getItem("todolist")),
  );
  function changeStatus(id) {
    // const newList = [...todolist]; // creates a shallow copy of the array meaning it creates a new array with the same elements but not the same references
    const newList = todolist.map((todo) =>
      todo.id === id ? { ...todo, status: !todo.status } : todo,
    );
    setTodolist(newList);
    localStorage.removeItem("todolist");
    localStorage.setItem("todolist", JSON.stringify(newList));
    return;
  }
  function addTask() {
    const newList = [
      ...todolist,
      {
        id: crypto.randomUUID(),
        name: task,
        status: false,
        dayAdded: dayjs().format("DD/MM/YYYY HH:mm:ss"),
      },
    ];

    setTodolist(newList);
    localStorage.removeItem("todolist");
    localStorage.setItem("todolist", JSON.stringify(newList));

    console.log(JSON.parse(localStorage.getItem("todolist")));
    setTask("");
    return;
  }
  return (
    <div>
      <p className="text-2xl font-bold text-center text-blue-500   ">Todo</p>
      {todolist.length === 0 && (
        <p className="text-2xl font-bold text-center text-blue-500   ">
          No Tasks
        </p>
      )}

      { todolist &&  todolist.map((item) => (
        <div
          key={item.id}
          className="flex items-center space-x-4 cursor-pointer "
          onClick={() => changeStatus(item.id)}>
          {(!item.status && (
            <img
              className="checkbox w-10 h-10 "
              src="unchecked.png"
              alt=""
              onClick={() => changeStatus(item.id)}
            />
          )) || (
            <img
              className="checkbox w-10 h-10 "
              src="checked.png"
              alt=""
              onClick={() => changeStatus(item.id)}
            />
          )}
          <span className=" flex-2  ">
            <span className="text-1.5xl" onClick={() => changeStatus(item.id)}>
              {item.name}
            </span>
            <span> Time : {item.dayAdded} </span>
          </span>
        </div>
      ))}

      <input
        className=" border-2 p-2 m-1 rounded-2xl "
        type="text"
        value={task}
        placeholder="Task name "
        onChange={(event) => setTask(event.target.value)}
        onKeyUp={(event) => {
          event.key === "Enter" && addTask();
        }}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
        onClick={addTask}>
        Add Task
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl cursor-pointer "
        onClick={()=> { localStorage.removeItem('todolist') ; setTodolist([]) }  }>
        Remove 
      </button>
    </div>
  );
}

/*

Q1 when crypto.random() is good and when its not 


COOL FEATURE : 
- press / and focuses on input to add task name 

FEATURES TO ADD 
- save todolist in localstorage
- add tag to each task / category 
- CRUD operation 


Actual To do features : 
Priority , Tags , schedule task 
multiple todo list 


{
      id: 1,
      name: "Learn React",
      status: false,
      dayAdded: dayjs().format("DD/MM/YYYY HH:mm:ss"),
      tag: "work",
    },
    {
      id: 2,
      name: "Learn React",
      status: false,
      dayAdded: dayjs().format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      id: 3,
      name: "Learn React",
      status: false,
      dayAdded: dayjs().format("DD/MM/YYYY HH:mm:ss"),
    },
}



NOTES : 

The issue is that when we try to parse the localStorage.getItem("todolist") 
    it's taking the literal string "[object Object]" instead of the actual 
    JSON object. This is because when we store the newList in localStorage, 
    it's being converted to a string and the objects inside it are being 
    converted to "[object Object]" instead of their actual values.

    To fix this, we should use JSON.stringify() when storing the newList and 
    JSON.parse() when retrieving it
    const storedList = localStorage.getItem("todolist");
    const parsedList = storedList ? JSON.parse(storedList) : [];



*/
