<template>
    <!-- 注册了一个全局组件 父组件调用该组件时传入的attribute值会被子组件的根元素默认继承 -->
    <div>
        <label>
            <input/>
        </label>

    </div>
</template>

<script>
export default {
    name: 'baseInput'
}
</script>

<style>

</style>
