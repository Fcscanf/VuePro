// 创建Vue实例
window.onload=function () {

    // 事件冒泡
    new Vue({
        el: '#root-event',
        data:{
        },
        methods:{
            showA:function () {
                console.log('aaaa');
            },
            showB() {
                console.log('bbbb');
            },
            showC() {
                console.log('cccc');
            }
        }
    });

    // Tab
    new Vue({
        el: '#root-tab',
        data:{
            cur: 1,
            tabTitle: ['标题一', '标题二', '标题三'],
            tabContent: ['内容一', '内容二', '内容三'],
            cur1: 1
        },
        methods:{
        }
    });

    // 输入框值绑定,单选框,多选框,下拉框
    new Vue({
        el: '#root-model',
        data:{
            age: 13,
            che: false,
            arr: [],
            radioV: "",
            items:[
                {text:'跳舞', value:'0'},
                {text:'唱歌', value:'1'},
                {text:'Rap', value:'2'}
            ],
            selected: '2'
        },
        methods:{
        }
    });

    // 闪烁效果实现
    new Vue({
        el: '#root-light',
        data:{
            msg: 'hello, it',
            age: 23,
            html: '<p>YT</p>'
        },
        methods:{

        }
    });

    // 样式绑定实现
    new Vue({
        el: '#root-bind',
        data: {
            title: '图片',
            flag: true,
            flag1: false,
            a1: 'a1',
            a2: 'a2',
            a3: 'a3',
            a4: {color:'#f00'},
            a5: {color:'#000'},
            url:'https://cn.vuejs.org/images/logo.png',
            url1:''
        }
    });

    // for的使用
    new Vue({
        el: '#for',
        data:{
            msg:'Hello World',
            age: 18,
            flag:false,
            arr:['aa', 'bb', 'cc'],
            obj:{name:'Fcant', age:13},
            lists:[
                {name:'Take', id:11},
                {name:'Fake', id:12},
                {name:'TYou', id:13}
            ]
        },
        methods:{
            click:function () {
                this.age = "20";
            },
            mouseover() {
                this.age = "21";
            },
            mouseout() {
                this.age = "22";
            },
            twoClick() {
                this.age = "24";
            }
        }
    });

    new Vue({
        el:"#root",
        data:{
            name:"Jack"
        }
    });

    var app2 = new Vue({
        el: '#app-2',
        text: '',
        data: {
            message: '页面加载于 ' + new Date().toLocaleString(),
            obj: {name: "Tom"},
            lists:[{name: "Phone", state: '0'},
                {name: "Computer", state: '1'},
                {name: "Role", state: '2'}
            ]
        },
        methods:{
            add:function (name) {
                if (name) {
                    this.lists.unshift({name:name, state:'0'});
                    this.text = '';
                }
            },
            del(index) {
                this.lists.splice(index, 1);
            }
        },
        filters:{
            stateFilter: function (type) {
                switch (type) {
                    case '0':
                        return '未采购';
                    case '1':
                        return '采购中';
                    case '2':
                        return '已采购';
                    default:
                        return '';
                }
            }
        }
    });
};
