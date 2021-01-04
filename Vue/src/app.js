import { starEmptyIcon, starFillIcon, editIcon } from './style/icons/icon.js';
import bindDrag from '/utility/drag.js';
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
            pageSort: 'all',
            sortTaskList: [],
        }
    },
    created() {
        this.taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    },
    mounted() {
        bindDrag(this.$refs['task-list-block'], (dragItem, insertBeforeItem) => {
            const dragItemDataIndex = this.taskList.findIndex(item => item.id == dragItem.id);
            const dragItemData = this.taskList.splice(dragItemDataIndex, 1)[0];
            
            if (insertBeforeItem) {
                this.taskList.push(dragItemData)
            }
            else {
                const insertBeforeIndex = this.taskList.findIndex(item => item.id == insertBeforeItem.id);
                this.taskList.splice(insertBeforeIndex, 0, dragItemData)
            }
        })
    },
    watch: {
        taskList: {
            // function name must be 'handler' ....
            handler() {
                localStorage.setItem('taskList', JSON.stringify(this.taskList));
                this.changePageSort(this.pageSort)
            },
            deep: true,
        },
    },
    methods: {
        newTaskInputHandler() {
            this.isCreating = !this.isCreating;
        },
        createNewTask() {
            this.taskList.push({ id: Date.now(), ...this.newTask });
            this.initCreate();
        },
        initCreate() {
            this.newTask = Object.assign({}, this.$options.data().newTask)
            this.isCreating = false;
        },
        updateTaskList(data) {
            const index = this.taskList.findIndex(item => item.id === data.id);
            this.taskList[index] = Object.assign(this.taskList[index], data);
        },
        changePageSort(key) {
            this.pageSort = key;
            switch (key) {
                case 'all':
                    this.sortTaskList = this.taskList;
                    break;
            
                case 'inProgress':
                    this.sortTaskList = this.taskList.filter(item => !item.isCompleted);
                    break;
            
                case 'completed':
                    this.sortTaskList = this.taskList.filter(item => {
                        console.log(item.isCompleted)
                        return item.isCompleted
                    });
                    break;
            }
        },
    },
    components: {
        task
    }
})
    
vm.mount('#app')
