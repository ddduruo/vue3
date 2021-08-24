const sayHelloMixin = {
    data(){
        return {
            
        }
    },
    created() {
        this.sayHello();
    },
    methods: {
        sayHello() {
            console.log("Hello Page Component")
        },
       foo() {
           console.log('foo')
       },
       conflicting() {
           console.log('from mixin')
       }
    }
}
export default sayHelloMixin;

//当组件和mixin 对象含有同名选项  这些选项会以恰当的方式合并 比如mixin 可以拥有自己的data 函数   每个data  函数都会被调用 并将返回结果合并 在数据