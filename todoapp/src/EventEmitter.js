export class EventEmitter {
    // 登録する [イベント名, Set(リスナー関数)] を管理するMap
    #listeners = new Map();
    /**
     * 指定したイベントが実行されたときに呼び出されるリスナー関数を登録する
     * @param {string} type イベント名
     * @param {Function} listener イベントリスナー
     */

    addEventListner(type, listener) {
        if (!this.#listeners.has(type)) {
            this.#listeners.set(type, new Set());
        }
        const listenerSet = this.#listeners.get(type);
        listenerSet.add(listener);
    }
    
    /**
     * 指定したイベントをディスパッチする
     * @param {string} type イベント名
     */

    emit(type) {
        const listenerSet = this.#listeners.get(type);
        if (!listenerSet) {
            return;
        }
        listenerSet.forEach(listener => {
            listener.call(this);
        });
    }
    
    /**
     * 指定したイベントのイベントリスナーを解除する
     * @param {string} type イベント名
     * @param {Function} listener イベントリスナー
     */

    removeEventListner(type, listener) {
        const listenerSet = this.#listeners.get(type);
        if (!listenerSet) {
            return;
        }
        listenerSet.forEach(ownListener => {
            if (ownListener === listener) {
                listenerSet.delete(listener);
            }
        });
    }
    
}
