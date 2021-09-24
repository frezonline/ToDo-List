const selectors = {
  enterButton: "#enter",
  input: "#userInput",
  ul: "ul",
  listItem: "li",
  deleteAllButton: ".deleteAllButton",
};

const enterButton = document.querySelector(selectors.enterButton);
const input = document.querySelector(selectors.input);
const ul = document.querySelector(selectors.ul);
const listItem = document.querySelector(selectors.listItem);
const deleteAllButton = document.querySelector(selectors.deleteAllButton);

function inputLength() {
  return input.value.length;
}

function listLength() {
  return item.length;
}

const createListElement = (todoItem) => `
  <li 
      id=${todoItem.id} 
      class='${todoItem.checked ? "checked" : ""}'
      >
      ${todoItem.text} 
      <button class='close'>×</button> 
  </li>`;

const renderAfterReload = () => {
  const todoStorage = JSON.parse(localStorage.getItem("TODO storage")) || [];
  if (todoStorage.length > 0) {
    todoStorage.forEach((item) => {
      ul.insertAdjacentHTML("beforeEnd", createListElement(item));
    });
  }
};

const setNewTodo = (text) => {
  const storage = JSON.parse(localStorage.getItem("TODO storage")) || [];
  const newTodo = {
    text,
    checked: false,
    id: Math.floor(Math.random() * 1000),
  };
  storage.push(newTodo);
  localStorage.setItem("TODO storage", JSON.stringify(storage));
  ul.insertAdjacentHTML("beforeEnd", createListElement(newTodo));
};

renderAfterReload();

enterButton.addEventListener("click", () => {
  const textOfNewToDo = document.querySelector("input").value;
  if (textOfNewToDo.length < 4) {
    alert("Please, input your task!");
    return;
  }
  setNewTodo(textOfNewToDo);
  document.querySelector("input").value = "";
});

userInput.onkeypress = function click(event) {
  if (event.keyCode === 13 || event.key === 13) {
    const textOfNewToDo = document.querySelector(selectors.input).value;
    if (textOfNewToDo.length < 4) {
      alert("Please, input your task!");
      return;
    }
    setNewTodo(textOfNewToDo);
    document.querySelector("input").value = "";
  }
};

ul.addEventListener("click", ({ target }) => {
  const todoStorage = JSON.parse(localStorage.getItem("TODO storage"));
  if (target.closest(".close")) {
    const idOfNote = +target.closest("li").getAttribute("id");
    const updatedStorage = todoStorage.filter((item) => item.id !== idOfNote);
    localStorage.setItem("TODO storage", JSON.stringify(updatedStorage));
    target.closest("li").remove();
    return;
  }

  if (target.closest("li")) {
    const idOfNote = +target.getAttribute("id");
    const updatedStorage = todoStorage.map((item) => {
      if (item.id === idOfNote) {
        item.checked = !item.checked;
      }
      return item;
    });
    localStorage.setItem("TODO storage", JSON.stringify(updatedStorage));
    target.classList.toggle("checked");
  }
});

deleteAllButton.addEventListener("click", (event) => {
  if (event.target.classList.contains("deleteAllButton")) {
    ul.innerHTML = "";
    localStorage.clear();
  }
});
