<template>
  <header>
    <nav>
      <div v-if="isAuthenticated && user">
        Добро пожаловать, {{ user.name }}
        <button @click="logout">Выход</button>
      </div>
      <div v-else>
        <form @submit.prevent="login">
          <div class="space">
            <label for="email">Почта</label><br/>
            <input v-model="email" type="email" id="email" required/>
          </div>
          <div class="space">
            <label for="password">Пароль</label><br/>
            <input v-model="password" type="password" id="password" required/>
          </div>
          <button type="sumbit" class="space">Войти</button>
          <p v-if="authError" class="error">{{ authError }}</p>
        </form>
      </div>
    </nav>
  </header>
</template>
<script>
  import { useAuthStore } from "@/stores/authStore";
  export default {
    data() {
      return {
        email: '',
        password: '',
        authStore: useAuthStore()
      };
    },
    computed: {
      isAuthenticated() {
        return this.authStore.isAuthenticated;
      },
      user() {
        return this.authStore.user;
      },
      authError() {
        return this.authStore.errorMessage;
      }
    },
    methods: {
      logout() {
        this.authStore.logout();
      },
      login() {
        this.authStore.login({ email: this.email, password: this.password });
      }
    },
    mounted() {
      const token = localStorage.getItem('token');
      if(token) {
        this.authStore.isAuthenticated = true;
        this.authStore.getUser();
      }
    }
  }
</script>
<style scoped>
  .error {
    color: red;
  }
  .space {
    margin: 10px;
  }
</style>