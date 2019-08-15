// 创建Vue实例
window.onload=function () {
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
