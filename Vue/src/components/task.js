import { starEmptyIcon, starFillIcon, editIcon } from '../style/icons/icon.js';

const template = `
<div :id='id' :class='{"star-task": isStar}' class='task'>
    <div class='task-header'>
        <div class='check-complete'>
            <label>
                <input type='checkbox' v-model='isComplete'>
                <span></span>
            </label>
        </div>
        <div class='title'>
            <p>{{ taskTitle }}</p>
        </div>
        <div class='button-group'>
            <a @click='isStarHandler' v-html='isStar ? starFillIcon : starEmptyIcon' class='star' type='button'></a>
            <a @click='editHandler' v-html='editIcon' class='edit' type='button'></a>
        </div>
    </div>
    <div :class='{ close: isClose }' class='content'>
        <div class='detail'>
            <div class='deadline'>
                <p>Deadline</p>
                <input v-model='deadlineDate' type='date'>
                <input v-model='deadlineTime' type='time'>
            </div>
            <div class='file'>
                <p>File</p>
                <input type='file'>
            </div>
            <div class='comment'>
                <p>Comment</p>
                <textarea v-model='comment' cols='30' rows='10'></textarea>
            </div>
        </div>
        <div class='button-group'>
            <button :click='cancelHandler' class='cancel'>Cancel</button>
            <button :click='submitHandler' class='submit'>Submit</button>
        </div>
    </div>
</div>
`

export default {
    template,
    data() {
        return {
            id: '',
            isComplete: false,
            isStar: false,
            taskTitle: '',
            deadlineDate: '',
            deadlineTime: '',
            // file: null,
            comment: '',
            starEmptyIcon,
            starFillIcon,
            editIcon,
            isClose: false,
        }
    },
    methods: {
        isStarHandler() { this.isStar = !this.isStar },
        editHandler() { this.isClose = !this.isClose },
        cancelHandler() {
            $emit('save-edit');
            this.isClose = true;
        },
        submitHandler() {
            $emit('cancel-edit');
            this.isClose = true;
        },
    }
}