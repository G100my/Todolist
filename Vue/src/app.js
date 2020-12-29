import { starEmptyIcon, starFillIcon, editIcon } from './style/icons/icon.js';
import task from './components/task.js';

const emtpyTask = {
    taskTitle: '',
    isCompleted: false,
    isStar: false,
    deadlineDate: '',
    deadlineTime: '',
    comment: '',
}

const app = Vue.createApp({
    // el: '#app',
    data() {
        return {
            todolist: [
                {
                    id: '12313123',
                    taskTitle: 'qweqwe',
                    isComplete: false,
                    isStar: true,
                    deadlineDate: '',
                    deadlineTime: '',
                    // file: null,
                    comment: 'dddddddddddddd',
                }
            ],
            newTask: {
                taskTitle: '',
                isCompleted: false,
                isStar: false,
                deadlineDate: '',
                deadlineTime: '',
                comment: '',
            },
            isCreating: false,
            starEmptyIcon,
            starFillIcon,
            editIcon,
            isClose: false,
        }
    },
    methods: {
        newTaskInputHandler() {
            console.log(this.isCreating)
            this.isCreating = !this.isCreating;
        },
        createNewTask() {
            this.todolist.push(this.newTask);
            this.initCreate();
        },
        initCreate() {
            this.newTask = Object.assign({}, emtpyTask);

        },

    },
    components: {
        task
    }

})

app.mount('#app')