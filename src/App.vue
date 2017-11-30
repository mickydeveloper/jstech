<template>
  <div id="app">
    <nav>
      <router-link to="/">
        Recent
      </router-link>
      <router-link to="/settings">
        <i class="fa fa-cog" aria-hidden="true"></i>Settings
      </router-link>
      </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    this.$store.dispatch("fetchRecent").then(() => {
      console.log("Got the Recent!!")
    })

    this.$store.dispatch("fetchSettings").then(() => {
      console.log("Got the Settings!!")
    })
  }
}
</script>

<style lang="scss" scoped>
nav{
  display: flex;
  margin-bottom: 2.5rem;
  a{
    padding: 1rem;
    text-align: center;
    display: inline-block;
    width: 50%;
    text-decoration: none;
    color: $primary;
    font-weight: 400;
    font-size: 1rem;
    font-size: 1.1rem;
    opacity: 0.7;

    &.router-link-exact-active {
      opacity: 1;
      border-bottom: 2px solid $primary;
      font-weight: 500;
    }

    i{
      margin-right: 0.5rem;
    }
  }
}

</style>

<style lang="scss">
@import 'style.scss';

</style>
