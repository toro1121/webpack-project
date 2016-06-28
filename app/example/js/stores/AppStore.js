import EventEmitter from 'events';

export default class extends EventEmitter {
    emitChange(type) {
        this.emit(type ? type : 'change');
    }
    addChangeListener(callback, type) {
        this.on(type ? type : 'change', callback);
    }
    removeChangeListener(callback, type) {
        this.removeListener(type ? type : 'change', callback);
    }
}
