import { element } from "./html-util.js";
import { TodoItemView } from "./TodoItemView.js";

export class TodoListView {
    /**
     * `todoItems`に対応するTodoリストのHTML要素を作成して返す
     * @param {TodoItemModel[]} todoItems TodoItemModelの配列
     * @param {function({id:number, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
     * @param {function({id:number})} onDeleteTodo 削除ボタンのクリックイベントリスナー
     * @returns {Element} TodoItemModelの配列に対応したリストのHTML要素
     */
    createElement(todoItems, { onUpdateTodo, onDeleteTodo }) {
        const todoListElement = element`<ul></ul>`;
        // それぞれのTodoItem要素をtodoListElement以下へ追加する
        todoItems.forEach(item => {
            const todoItemElement = new TodoItemView().createElement(item, {
                onUpdateTodo,
                onDeleteTodo
            });
            todoListElement.appendChild(todoItemElement);
        });
        return todoListElement;
    }
}