// 创建Vue实例
window.onload=function () {

    // 参数传递、子路由、路由跳转
    let Login = Vue.component('Login', {
        template: '#login'
    });
    // 路由
    let Home = Vue.component('Home', {
        template: "<h2>Home</h2>"
    });
    // 模板中的数据将以函数的形式返回
    let News = Vue.component('News', {
        template: "#news",
        data() {
            return{
                uname: "Fcant",
                pwd: "123"
            }
        }
    });
    let One = Vue.component('One', {
        template: "#one"
    });
    let Register = Vue.component('Register', {
        template: "#register"
    });
    // 配置路由
    let routes = [
        {path: '/home', component: Home},
        {
            path:"/news",
            component: News,
            children: [
                {path: '/news/login/:uname/:pwd', component: Login},
                {path: '/news/register', component: Register}
            ]
        },
        // {path: '/news', component: News},
        // 配置带参数的路由,参数需要使用：使用的是Restful风格
        {path: '/one/:id', component: One},
        // 配置默认路由-通过重定向
        {path: '/*', redirect:'/home'}
    ];
    // 定义路由
    let router = new VueRouter({
        routes,
        // 设置路由样式
        linkActiveClass:'active'
    });
    new Vue({
        el: '#root-router',
        data:{
            id: 100
        },
        methods:{
            // 页面路由跳转
            goNews() {
                router.push({path: '/news'})
            }
        },
        components:{
        },
        router
    });

    // 动画样式
    new Vue({
        el: '#root-css',
        data:{
            flag:false
        },
        methods:{
            beforeEnter(el) {
                console.log('动画进入之前', el);
                el.style.background = 'red';
            },
            enter() {
                console.log('动画进入中');
            },
            afterEnter(el) {
                console.log('动画进入后');
                el.style.background = 'blue';
            },
            beforeLeave(el) {
                el.innerHTML = '我要离开了';
                console.log('动画离开之前');
            },
            leave() {
                console.log('动画离开中');
            },
            afterLeave() {
                console.log('动画离开后')
            }
        },
        components:{
        }
    });

    // 计算属性的值，通过修改引用属性的值达到修改计算属性的结果
    new Vue({
        el: '#root-var',
        data:{
            shopcart:[
                {name:"商品A", price: 15, count:2},
                {name:"商品B", price: 17, count:2}
            ],
            countPrice:0,
            num1:0,
            num2:0
        },
        methods:{
            //计算购物车总价
            priceAll() {
                this.shopcart.forEach((el, index) => {
                    this.countPrice += el.price*el.count;
                });
            },
            // 更新购物车商品数量
            changeShop() {
                this.shopcart[0].count++;
            },
            setComputedValue() {
                this.num = 222;
            }
        },
        computed:{
            // 计算属性-通过forEach遍历计算
            priceBll() {
                var price = 0;
                this.shopcart.forEach((el, index) => {
                    price += el.price*el.count;
                });
                return price;
            },
            // 计算属性-通过Map计算，Map转换的结果为array，不能作加法处理
            /*priceAllByMap() {
                this.shopcart.map(v => {
                    return v.price*v.count;
                });
            }*/
            //
            priceAllByReduce() {
                return this.shopcart.reduce((total, v) => {
                    return total + v.price*v.count;
                }, 0)
            },
            // 修改计算属性---通过修改引用属性的值达到修改计算属性的值
            num:{
                get:function () {
                    return this.num1+this.num2;
                },
                set:function (val) {
                    console.log('set', val)
                    this.num2 = 222;
                }
            }
        }
    });

    // 对象的监听-一般的监听
    var vm = new Vue({
        el: '#root-tgb',
        data:{
            name:'Gbt',
            address:{
                text:'北京市'
            }
        },
        watch:{
            // 变量监听方式1
            /*name:function (newValue, oldValue) {
                console.log(newValue, oldValue);
            }*/
            // 变量监听方式2
            /*'name':function (newValue, oldValue) {
                console.log(newValue, oldValue);
            }*/
            // 变量监听方式3-调用外部方法
            /*name:'watchName'*/

            // 关联监听使用引号引用，并通过'.'监听的属性
            // 缺点：------>>>>>>>对于N级属性无法指定，优化方法如下：<<<<<<<<<<<
            /*'address.text':function (newValue, oldValue) {
                console.log(newValue, oldValue);
            }*/
            // 关联属性监听-对于属性对象的深度、多维监听
            address: {
                handler: (newValue, oldValue) => {
                    console.log(newValue, oldValue);
                },
                deep: true
            }
        },
        methods:{
            watchName(newValue, oldValue) {
                console.log(newValue, oldValue);
            }
        },
        components:{
        }
    });
    // 变量监听方式4-将Vue对象作为变量对其进行监听以及方法调用
    // 调用Vue实例的变量或者方法需要使用'$'
    vm.$watch('name', function (newValue, oldValue) {
        console.log(newValue, oldValue);
        this.address={text:'江苏省'}
    });

    // 兄弟组件通信
    // 定义空Vue对象用于接收数据
    let Bus = new Vue();
    let A = {
        template:'#com-b-1',
        data() {
            return{
                name:'aaaa'
            }
        },
        methods:{
            send() {
                Bus.$emit('data-a', this.name)
            }
        }
    };
    let B = {
        template:'#com-b-2',
        data() {
            return{
                name:'bbbb'
            }
        },
        methods:{
            send() {
                Bus.$emit('data-b', this.name)
            }
        }
    };
    let C = {
        template:"#com-b-3",
        data() {
            return{
                name:'',
                nameA:'',
                nameB:''
            }
        },
        // 组件生命周期
        mounted() {
            Bus.$on('data-a', function (name) {
                this.name=name;
            });
            Bus.$on('data-b', function (name) {
                this.name=name;
            });
            Bus.$on('data-a', name => {
                this.nameA = name;
            });
            Bus.$on('data-b', name => {
                this.nameB = name;
            })
        }
    };
    new Vue({
        el: '#com-brother',
        data:{
        },
        methods:{
        },
        components:{
            'com-b-1': A,
            'com-b-2': B,
            'com-b-3': C
        }
    });

    // 组件通信-子到父
    new Vue({
        el: '#com-c',
        data:{
        },
        methods:{
        },
        components:{
            'com-c-1':{
                template:'#com-c-1',
                data:function () {
                    return{
                        pname:'parents',
                        page: 18,
                        cname: '',
                        cage: ''
                    }
                },
                methods:{
                    handleSubData(name, age) {
                        this.cname = name;
                        this.cage = age;
                    }
                },
                components:{
                    'com-c-2':{
                        template: '#com-c-2',
                        data:function () {
                            return{
                                cname:'child',
                                cage:20
                            }
                        },
                        props:['pname', 'page'],
                        methods:{
                            sendMsg() {
                                // 发送事件及参数
                                this.$emit('e-com-c-2', this.cname, this.cage)
                            }
                        }
                    }
                }
            }
        }
    });

    Vue.component('com-k', {
        template:"<h2>全局组件{{name}}--{{msg}}</h2>",
        data:function () {
            return{
                msg: '111'
            }
        },
        props: ['name']
    });
    // 组件通信--父-》子
    new Vue({
        el: '#root-p',
        data:{
            msg: '信息',
            name: 'Gh'
        },
        methods:{
        },
        components:{
            'p-com':{
                template:"#p-com",
                data:function () {
                    return{
                        title: '组件通信',
                        lists: [1, 2, 3, 4, 5]
                    }
                },
                props:['msg']
            }

        }
    });

    // component
    //全局组件
    // 组件-方式一
    var mCom = Vue.extend({
        // 嵌入的模板必须使用外部标签封装起来，不能一级出现多个标签
        template: '<div><h1>Hello Component</h1><div><h2>Tom</h2></div></div>'
    });
    // 命名规范-组件名用横线作连接符-，驼峰命名不易与Vue识别，容易报错，
    Vue.component('helloWorld', mCom);
    // 组件-方式二
    Vue.component('hello', {
        template: '<h3>Component</h3>'
    });
    new Vue({
        el: '#root-component',
        data:{
        },
        methods:{
        },
        // 局部组件
        components:{
            'component-cn':{
                template:'<h3>局部组件</h3>'
            },
            'com-con' : {
                // 引用定义的组件模板
                template: "#com-con",
                data:function () {
                    return{
                        title:'title',
                        lists : [1, 2, 3, 4]
                    }
                }
            },
            'component-tab':{
                template:"#com-tab",
                data: function () {
                    return{
                        tabTitle: ['标题一', '标题二', '标题三'],
                        tabContent: ['内容一', '内容二', '内容三'],
                        cur1: 1
                    }
                }
            }
        }
    });

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
            lists:[{name: "Phone", state: false},
                {name: "Computer", state: false},
                {name: "Role", state: true}
            ],
            count:0
        },
        mounted() {
            this.countSum();
        },
        methods:{
            // 计算未采购数量
            countSum() {
                /*this.count = 0;
                this.lists.forEach((el, index)=>{
                    if (el.state === '0') {
                        this.count++;
                    }
                })*/
            //    使用过滤进行统计
                this.count = this.lists.filter(item => !item.state).length;
            },
            add:function (name) {
                if (name) {
                    this.lists.unshift({name:name, state:false});
                    this.text = '';
                    this.countSum();
                }
            },
            del(index) {
                this.lists.splice(index, 1);
                this.countSum();
            }
        },
        filters:{
            stateFilter: function (type) {
                switch (type) {
                    case false:
                        return '未采购';
                    case true:
                        return '已采购';
                    default:
                        return '';
                }
            }
        }
    });
};
