<script lang="ts">
  import { 
    RouterView,
    RouterLink
  } from 'vue-router';
  import { 
    SearchOutlined, 
    UnorderedListOutlined,
    HeartOutlined,
  } from '@ant-design/icons-vue';

  export default {
    components: {
      RouterView,
      RouterLink,
      SearchOutlined,
      UnorderedListOutlined,
      HeartOutlined
    },
  }
</script>

<template>
  <header>
    <div class="header">
      <div class="logo_header_container">
        <img src="./assets/happytal_logo_header.png" class="logo" />
      </div>
      <div class="header_items">
        <RouterLink to="/" :class="$router.currentRoute.path === '/' ? 'currentRoute' : ''">
          <unordered-list-outlined />
          Liste des Articles
        </RouterLink>
        <RouterLink to="/mesarticles" :class="$router.currentRoute.path === '/mesarticles' ? 'currentRoute' : '' " >
          <heart-outlined />
          Mes Articles Favoris
        </RouterLink>
      </div>
    </div>  
  </header>

  <router-view />
</template>

<style>
  body {
    margin: 0px;
    padding: 0px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }

  #app {
    height: 100vh;

  }

  header {
    padding: 0 50px;
    background-color: #78dcd4;
    border-bottom: 2px solid #d43c5c;
    box-shadow: 0 4px 8px 0 rgba(212, 60, 92, 0.2), 0 6px 20px 0 rgba(212, 60, 92, 0.19);
  }

  .header {
    display: flex;
    height: 60px;
    align-items: center;
  }

  .logo_header_container {
    height: 50px;
    display: flex;
    margin-left: 10px;
    align-items: center;
  }

  .logo {
    height: 80%;
    width: auto;
  }

  .header_items {
    width: 100%;
    height: 100%;
    display: flex;
    font-size: 18px;
    margin-left: 70px;
  }
  .header_items > * {
    display: flex;
    align-items: center;
    padding: 0px 20px;
    height: 100%;
    color: #d43c5c;
  }
  .header_items > *:hover {
    color: #9f1936;
  }
  .router-link-exact-active {
    background-color: #2ebeb7;
    color: #9f1936;
    cursor: default;
  }
  a:hover {
    color: green;
  }
  .header_items > * > * {
    margin: 8px;
  }
</style>
