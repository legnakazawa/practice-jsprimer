import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { element, render } from "./view/html-util.js";

export class App {
  // 1. TodoListModelの初期化
  #todoListModel = new TodoListModel();
  #todoListView = new TodoListView();

  formElement;
  formInputElement;
  todoCountElement;
  todoListContainerElement;

  constructor({ formElement, formInputElement, todoCountElement, todoListContainerElement }) {
    this.formElement = formElement;
    this.formInputElement = formInputElement;
    this.todoCountElement = todoCountElement;
    this.todoListContainerElement = todoListContainerElement;
  }

  /**
   * Todoを追加するときに呼ばれるリスナー関数
   * @param {string} title
   */
  #handleAdd = (title) => {
    this.#todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  }

  /**
   * Todoの状態を更新したときに呼ばれるリスナー関数
   * @param {{ id:number, completed: boolean }}
   */
  #handleUpdate = ({ id, completed }) => {
    this.#todoListModel.updateTodo({ id, completed });
  };

  /**
   * Todoを削除したときに呼ばれるリスナー関数
   * @param {{ id: number }}
   */
  #handleDelete = ({ id }) => {
    this.#todoListModel.deleteTodo({ id });
  };

  #handleSubmit = (event) => {
    event.preventDefault();
    const inputElement = this.formInputElement;
    this.#handleAdd(inputElement.value);
    inputElement.value = "";
  }

  #handleChange = () => {
    const todoCountElement = this.todoCountElement;
    const todoListContainerElement = this.todoListContainerElement;
    const todoItems = this.#todoListModel.getTodoItems();
    const todoListElement = this.#todoListView.createElement(todoItems, {
        // Appに定義したリスナー関数を呼び出す
        onUpdateTodo: ({ id, completed }) => {
            this.#handleUpdate({ id, completed });
        },
        onDeleteTodo: ({ id }) => {
            this.#handleDelete({ id });
        }
    });
    render(todoListElement, todoListContainerElement);
    todoCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
  };

  mount() {
    this.#todoListModel.onChange(this.#handleChange);
    this.formElement.addEventListener("submit", this.#handleSubmit);
  }

  unmount() {
    this.#todoListModel.offChange(this.#handleChange);
    this.formElement.removeEventListener("submit", this.#handleSubmit);
  }
}
