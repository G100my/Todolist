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
    created() {
        this.taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    },
    methods: {
        newTaskInputHandler() {
            this.isCreating = !this.isCreating;
        },
        createNewTask() {
            this.taskList.push({ id: Date.now(), ...this.newTask });
            this.initCreate();
            localStorage.setItem('taskList', JSON.stringify(this.taskList));
        },
        initCreate() {
            this.newTask = Object.assign({}, this.$options.data().newTask)
            this.isCreating = false;
        },
        updateTaskList(data) {
            const index = this.taskList.findIndex(item => item.id === data.id);
            this.taskList[index] = Object.assign(this.taskList[index], data);
            localStorage.setItem('taskList', JSON.stringify(this.taskList));
        }
    },
    components: {
        task
    }
})
    
vm.mount('#app')
