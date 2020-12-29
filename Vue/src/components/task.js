import { starEmptyIcon, starFillIcon, editIcon } from '../style/icons/icon.js';

const template = `
<div :id='data.id' :class='{"star-task": data.isStar}' class='task'>
    <div class='task-header'>
        <div class='check-complete'>
            <label>
                <input type='checkbox' v-model='data.isComplete'>
                <span></span>
            </label>
        </div>
        <div class='title'>
            <p>{{ data.taskTitle }}</p>
        </div>
        <div class='button-group'>
            <a @click='isStarHandler' v-html='data.isStar ? starFillIcon : starEmptyIcon' class='star' type='button'></a>
            <a @click='editHandler' v-html='editIcon' class='edit' type='button'></a>
        </div>
    </div>
    <div :class='{ close: isClose }' class='content'>
        <div class='detail'>
            <div class='deadline'>
                <p>Deadline</p>
                <input v-model='data.deadlineDate' type='date'>
                <input v-model='data.deadlineTime' type='time'>
            </div>
            <div class='file'>
                <p>File</p>
                <input type='file'>
            </div>
            <div class='comment'>
                <p>Comment</p>
                <textarea v-model='data.comment' cols='30' rows='10'></textarea>
            </div>
        </div>
        <div class='button-group'>
            <button @click='cancelHandler' class='cancel'>Cancel</button>
            <button @click='submitHandler' class='submit'>Submit</button>
        </div>
    </div>
</div>
`

export default {
    template,
    data() {
        return {
            data: {
                id: '',
                isComplete: false,
                isStar: false,
                taskTitle: '',
                deadlineDate: '',
                deadlineTime: '',
                // file: null,
                comment: '',
            },
            starEmptyIcon,
            starFillIcon,
            editIcon,
            isClose: true,
        }
    },
    props: {
        incomeData: Object,
    },
    created() {
        this.data = Object.assign(this.data, this.incomeData);
        console.log(this.data)
    },
    methods: {
        isStarHandler() { this.data.isStar = !this.data.isStar },
        editHandler() { this.isClose = !this.isClose },
        cancelHandler() {
            this.data = Object.assign(this.data, this.incomeData);
            this.isClose = true;
        },
        submitHandler() {
            this.isClose = true;
            // this.$emit('save-edit)
        },
    }
}