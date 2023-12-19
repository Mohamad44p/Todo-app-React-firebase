import React, { useState, useEffect } from "react";
import { IoRemoveOutline } from "react-icons/io5";
import { PiNotePencilBold } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { collection, deleteDoc, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "./firebase";
import { addDoc } from "firebase/firestore";

const style = {
  bg: `h-screen w-screen p-2 sm:p-4 `,
  container: `bg-[#2C2C2C] h-[90vh]  sm:max-w-[90%]  md:max-w-[1240px] w-full m-auto rounded-lg shadow-xl p-2 sm:p-4`,
  heading: `flex text-white gap-1 sm:gap-2 justify-center items-center text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold italic mb-4 sm:mb-8`,
  lines: `flex w-6 sm:w-20 md:w-24 lg:w-32 border-t-2 border-white `,
  inputContainer: `flex mx-auto w-full md:w-[80%] form-shadow `,
  input: `flex-grow px-2 py-1 sm:px-4 sm:py-2 bg-[#D9D9D9] text-black placeholder-gray-400 border-0 rounded-l-lg focus:ring-0 focus:outline-none`,
  button: `px-2 py-1 sm:px-4 sm:py-2 bg-[#4F4F4F] text-white rounded-r-lg hover:bg-gray-700 italic font-bold`,
};

const tasks = ["This is task1", "This is task2", "This is task3"];
export default function App() {
  const [todos, setTodos] = useState([]);
  const [newtodo, setNewTodo] = useState("");

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  });

  const addtodo = async () => {
    if (!newtodo.trim()) {
      alert("Please enter a task");
      return;
    }
    try {
      await addDoc(collection(db, "todos"), { text: newtodo });
      setNewTodo("");
      console.log("task added");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      console.log("Todo deleted successfully");
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <div className={style.heading}>
          <IoRemoveOutline size={60} /> TO-DO NOW <IoRemoveOutline size={60} />
        </div>
        <div className="flex justify-center items-center my-7">
          <div className={style.lines}></div>
          <PiNotePencilBold
            style={{ marginRight: "5px", marginLeft: "5px" }}
            color="white"
            size={31}
          />
          <div className={style.lines}></div>
        </div>
        <div className={style.inputContainer}>
          <input
            type="text"
            className={style.input}
            placeholder="Enter your task"
            value={newtodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={addtodo} className={style.button}>Add task</button>
        </div>
        <div className="border-t w-[60%] mx-auto border-white mt-[1.5rem]"></div>
        <ul className="flex justify-center items-center flex-col py-[4rem] gap-6 text-white">
          {todos.map((task) => (
            <li
              key={task.id}
              className="bg-[#222222] flex justify-between py-3 px-3 w-[60%] items-center gap-3 text-xl md:text-2xl font-['inter'] text-white"
            >
              <p className="bg-[#222222] flex justify-between w-full md:w-[60%] items-center gap-3 text-xl md:text-2xl font-['inter'] text-white">
                {task.text}
              </p>
              <RiDeleteBinLine onClick={() => deleteTodo(task.id)} size={25} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
