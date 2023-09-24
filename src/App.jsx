import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditValue(todos[index].text);
  };

  const saveEdit = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = editValue;
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditValue("");
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow-lg">
        <h1 className="text-2xl mb-4">Kamu mau produktif apa hari ini?</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="flex-grow p-2 mr-2 border border-gray-400 rounded"
            placeholder="masukan kegiatan produktifmu disini"
          />
          <button
            onClick={addTodo}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Tambah
          </button>
        </div>
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(index)}
                  className="mr-2"
                />
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-grow p-2 border border-gray-400 rounded"
                    />
                    <button
                      onClick={() => saveEdit(index)}
                      className="p-2 bg-green-500 text-white rounded"
                    >
                      Simpan
                    </button>
                  </>
                ) : (
                  <span className={todo.completed ? "line-through" : ""}>
                    {todo.text}
                  </span>
                )}
              </div>
              {editIndex !== index && (
                <div className="flex">
                  <button
                    onClick={() => startEdit(index)}
                    className="bg-yellow-500 text-white p-1 rounded w-16"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(index)}
                    className="bg-red-500 text-white p-1 rounded ml-1 w-16"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <footer className="fixed bottom-0 w-full bg-white text-center p-3 text-gray-600">
        &copy; 2023 Afadz Company &#128512;
      </footer>
    </>
  );
};

export default TodoList;
