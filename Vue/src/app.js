import { starEmptyIcon, starFillIcon, editIcon } from './style/icons/icon.js';
import task from './components/task.js';

const vm = Vue.createApp({
    // el: '#app',
    data() {
        return {
            taskList: [],
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
    
vm.mount('#app')
