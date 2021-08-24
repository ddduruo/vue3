<template>
    <div>
      <home></home>
      <button @click="addName">增加name</button>
    </div>
</template>

<script>
import Home from './components/Home'
import { computed } from 'vue';
export default {
  name: 'App',
  components: {
      Home
  }, 
  data() {
    return {
      names: ['ass','eee','eerer']
    }
  },
  methods: {
    addName() {
      this.names.push('dfdf')
    }
  },
  provide() {
    return {
        name: 'why',
        age: 18,
        length: computed(() => this.names.length)   //todo: 如果直接写对象的话 this.data 是拿不到 需要包装成一个function  他这样的this就是对应当前的
    }
    
  }
    
}
</script>

<style>

</style>
