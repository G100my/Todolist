import { starEmptyIcon, starFillIcon, editIcon } from './style/icons/icon.js';
import task from './components/task.js';

const emtpyTask = {
    title: '',
    isCompleted: false,
    isStar: false,
    date: '',
    time: '',
}

const app = Vue.createApp({
    // el: '#app',
    data() {
        return {
            todolist: [
                {
                    id: '12313123',
                    isComplete: false,
                    isStar: true,
                    taskTitle: 'qweqwe',
                    deadlineDate: '',
                    deadlineTime: '',
                    // file: null,
                    comment: '',
                }
            ],
            newTask: {
                title: '',
                isCompleted: false,
                isStar: false,
                date: '',
                time: '',
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