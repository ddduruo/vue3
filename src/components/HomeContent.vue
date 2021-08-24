<template>
    <div>
        <h2>HomeContent</h2>
        <h2>{{name}}-{{age}}</h2>
        <h2>{{length.value}}</h2>
    </div>
</template>

<script>
export default {
    inject: ["name", "age","length"]
}
</script>

<style>

</style>
