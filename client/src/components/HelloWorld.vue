<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>This blog is here cuz' I had time to do it. It's mainly to
      learn how to develop on Vue.JS</h1>
    <a href="posts">Access to posts</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to this super duper blog'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
