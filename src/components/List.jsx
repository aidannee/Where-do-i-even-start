import { useState } from "react";

function List({ substeps, streamingFinished, setStreamingFinished }) {
  console.log(substeps);
  const [list, setList] = useState(substeps);
  const [textValue, setTextValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [addingNewItem, setAddingNewItem] = useState(false);

  function deleteItem(i) {
    console.log("deleting item " + i);
    const filteredItems = list.filter((item, j) => j !== i);
    setList(filteredItems);
  }

  function addItem() {
    if (selectedIndex > -1) {
      setSelectedIndex(-1);
    } else {
      const newState = [...list];
      newState.push(textValue);
      setList(newState);
      setTextValue("");
      console.log(newState);
    }
  }

  function handleEdit(newValue) {
    if (selectedIndex > -1) {
      const newState = [...list];
      newState[selectedIndex] = newValue;
      setList(newState);
    } else {
      setTextValue(newValue);
    }
  }

  function addNewItem() {
    setAddingNewItem(!addingNewItem);
  }
  function doubleFunction() {
    addItem();
    addNewItem();
  }
  return (
    <div className="flex flex-col">
      <div>
        <div id="list">
          <ul>
            {list.map((item, i) => (
              <div className="itemStyle p-2">
                {i === selectedIndex ? (
                  <div className="flex items-center">
                    <textarea
                      className="  w-full bg-transparent border-none border-0"
                      type="text"
                      value={item}
                      onChange={(e) => handleEdit(e.target.value)}
                    />
                    <button
                      className={`${streamingFinished ? "" : " opacity-0"}`}
                      onClick={() => setSelectedIndex(-1)}
                    >
                      <i className="fa-solid fa-check"></i>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <li
                      key={i}
                      className={` w-full m-2${
                        i === selectedIndex ? "hidden" : ""
                      }`}
                    >
                      {item}
                    </li>
                    <div className="flex flex-col">
                      {" "}
                      <button
                        className={`${streamingFinished ? "" : " opacity-0"}`}
                        onClick={(e) => {
                          setSelectedIndex(i);
                        }}
                      >
                        <i className="iconStyle fa-regular fa-pen-to-square"></i>
                      </button>
                      <button
                        className={`${streamingFinished ? "" : " opacity-0"}`}
                        onClick={(e) => deleteItem(i)}
                      >
                        {" "}
                        <i className="iconStyle fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </ul>

          <div className="flex flex-col items-center">
            {" "}
            {!streamingFinished ? (
              ""
            ) : addingNewItem ? (
              <div className="flex w-full" id="inputArea">
                <textarea
                  className="itemStyle  w-full p-2 m-2 bg-transparent border-none border-0"
                  type="text"
                  value={textValue}
                  onChange={(e) => handleEdit(e.target.value)}
                />
                <button onClick={doubleFunction} type="submit">
                  <i className=" iconStyle fa-solid fa-plus"></i>
                </button>
              </div>
            ) : (
              <button
                onClick={addNewItem}
                className="buttonStyle  w-10 text-center"
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
