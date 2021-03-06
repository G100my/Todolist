import { starEmptyIcon, starFillIcon, editIcon, datetimeIcon, fileIcon, commentIcon } from '../style/icons/icon.js';

const template = `
<div :id='data.id' :class='{"star-task": data.isStar}' draggable="true" class='task'>
    <div class='task-header'>
        <div class='check-complete'>
            <label>
                <input v-model='data.isCompleted' type='checkbox'>
                <span></span>
            </label>
        </div>
        <div class='title'>
            <p
                @blur='data.taskTitle = $event.target.textContent'
                :textContent='data.taskTitle'
                :contenteditable='titleEditable'
            ></p>
        </div>
        <div class='button-group'>
            <a @click='isStarHandler' v-html='data.isStar ? starFillIcon : starEmptyIcon' class='star' type='button'></a>
            <a @click='editHandler' v-html='editIcon' class='edit' type='button'></a>
        </div>
        <div class="status-block">
            <span v-if="(data.deadlineDate != '' || data.deadlineTime != '')">
                <span v-html="datetimeIcon"></span>
                <span v-if="data.deadlineDate != ''">{{ data.deadlineDate }}</span>
                <span v-if="data.deadlineTime != ''">{{ data.deadlineTime }}</span>
            </span>
            <span v-if="data.file != null" v-html="fileIcon"></span>
            <span v-if="data.comment != ''" v-html="commentIcon"></span>
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
            // created 時 watch 已經 set up，所以直接接過來
            data: {...this.incomeData},
            previousData: undefined,
            starEmptyIcon,
            starFillIcon,
            editIcon,
            isClose: true,
            titleEditable: false,
            datetimeIcon,
            fileIcon,
            commentIcon,
        }
    },
    // 先設定上面的初始值，在 create 時換成 props incomeData
    // created() {
    //     this.data = Object.assign(this.data, this.incomeData);
    // },
    props: {
        incomeData: Object,
    },
    // vue3 syntax 用來檢查/描述 event，有點類似寫測試XD?
    emits: ['update-tasklist'],
    // isStar, isCompleted 不在 content 內, 需要按了立即更新，
    // 因此使用 watch，與 submitHandler 分開
    // 且不使用 deep: true
    // data: {
    //     deep: trune,
    //     function () { ... }
    // }
    watch: {
        // object property 的寫法
        'data.isStar': function () {
            this.$emit('update-tasklist', this.data);
        },
        'data.isCompleted': function () {
            this.$emit('update-tasklist', this.data);
        },
    },
    methods: {
        isStarHandler() { this.data.isStar = !this.data.isStar },
        editHandler() {
            this.isClose = !this.isClose;
            this.titleEditable = !this.titleEditable;
            this.previousData = { ...this.data };
        },
        cancelHandler() {
            // this.data = Object.assign(this.data, this.$props.incomeData);
            this.data = { ...this.previousData };
            this.isClose = true;
        },
        submitHandler() {
            this.isClose = true;
            this.$emit('update-tasklist', this.data);
        },
    }
}