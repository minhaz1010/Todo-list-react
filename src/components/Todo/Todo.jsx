import React, { useEffect, useRef, useState } from "react";

const Todo = () => {
  const [sentence, setSentence] = useState("");
  const [list, setList] = useState([]);
  const valueFromInput = useRef();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("list"));
    if (data) {
      setList(data);
    }
  }, []);
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      setSentence(valueFromInput.current.value);
      handleAdd();
    }
  };

  const handleAdd = () => {
    const updatedList = [...list, sentence];
    setList(updatedList);
    localStorage.setItem("list", JSON.stringify(updatedList));
    setSentence("");
  };

  const handleDelete = (index) => {
    const updatedList = list.filter((_, idx) => idx !== index);
    setList(updatedList);
    localStorage.setItem("list", JSON.stringify(updatedList));
  };

  const renderList = () => {
    if (list.length > 0) {
      return list.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-gray-200 rounded-md p-3 my-2"
        >
          <p className="text-lg">{item}</p>
          <button
            className="text-sm bg-red-500 px-3 py-1 text-white rounded-md"
            onClick={() => handleDelete(index)}
          >
            Delete
          </button>
        </div>
      ));
    } else {
      return <p className="text-center text-gray-500">No items in the list.</p>;
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white shadow-2xl  rounded-xl ">
      <h1 className="text-3xl mb-4 text-center text-indigo-600">Todo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          ref={valueFromInput}
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          className="w-full rounded-md py-2 px-3 border border-gray-300 focus:outline-none"
          placeholder="Add a new task"
          onKeyUp={handleEnter}
        />
        <button
          onClick={handleAdd}
          className="ml-2 px-4 py-2 rounded-md bg-indigo-600 text-white"
        >
          Add
        </button>
      </div>
      <div className="mt-4">{renderList()}</div>
    </div>
  );
};

export default Todo;
