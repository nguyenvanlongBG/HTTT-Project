<template>
  <div class="page-login">
    <div class="container-login">
      <div class="left">
        <div class="login">Đăng nhập</div>
        <div class="eula">
          Nỗ lực hôm nay tương lai ngày mai
          <br />
          Cố gắng lên <i class="fa-sharp fa-solid fa-heart red-color"></i>
        </div>
      </div>
      <div class="right">
        <svg viewBox="0 0 320 300">
          <defs>
            <linearGradient
              inkscape:collect="always"
              id="linearGradient"
              x1="13"
              y1="193.49992"
              x2="307"
              y2="193.49992"
              gradientUnits="userSpaceOnUse"
            >
              <stop style="stop-color: #ff00ff" offset="0" id="stop876" />
              <stop style="stop-color: #ff0000" offset="1" id="stop878" />
            </linearGradient>
          </defs>
          <path
            d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143"
          />
        </svg>
        <div class="form">
          <label for="email">Tài khoản</label>
          <input
            class="font-size-input-login"
            type="email"
            id="email"
            placeholder="Email"
            v-model="email"
          />
          <label for="password">Mật khẩu</label>
          <input
            class="font-size-input-login"
            type="password"
            id="password"
            placeholder="****"
            v-model="password"
          />
          <div class="red-color" v-if="message">{{ message }}</div>
          <div class="button-login-register">
            <div class="button" @click="handleSubmit">Đăng nhập</div>
            <a class="button" href="#/register">Đăng ký</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import { login } from '../services/authen';
import router from 'src/router';
export default {
  name: 'LoginComponent',
  setup() {
    const email = ref('');
    const password = ref('');
    const message = ref('');
    async function handleSubmit() {
      const response = await login(email.value, password.value);
      if (!response.success) {
        message.value = response.messages[0];
      } else {
        router.push({ name: 'class' });
      }
    }
    return {
      email,
      password,
      message,
      handleSubmit,
    };
  },
};
</script>
<style scoped>
.red-color {
  color: red;
}

::selection {
  background: #2d2f36;
}

::-webkit-selection {
  background: #2d2f36;
}

::-moz-selection {
  background: #2d2f36;
}

body {
  background: white;
  font-family: 'Inter UI', sans-serif;
  margin: 0;
  padding: 20px;
}

.page-login {
  background: #e2e2e5;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 40px);
  place-content: center;
  width: 100%;
}

@media (max-width: 767px) {
  .page-login {
    height: auto;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
}

.container-login {
  display: flex;
  height: 320px;
  margin: 0 auto;
  width: 640px;
}

@media (max-width: 767px) {
  .container-login {
    flex-direction: column;
    height: 630px;
    width: 320px;
  }
}

.left {
  background: white;
  height: calc(100% - 40px);
  top: 20px;
  position: relative;
  width: 50%;
}

@media (max-width: 767px) {
  .left {
    height: 100%;
    left: 20px;
    width: calc(100% - 40px);
    max-height: 270px;
  }
}

.login {
  font-size: 30px;
  font-weight: 900;
  margin: 50px 40px 40px;
}

.eula {
  color: #999;
  font-size: 14px;
  line-height: 1.5;
  margin: 40px;
}

.right {
  background: #222;
  box-shadow: 0px 0px 40px 16px rgba(0, 0, 0, 0.22);
  color: #f1f1f2;
  position: relative;
  width: 50%;
  border: #ea4f4c 2px solid;
}

@media (max-width: 767px) {
  .right {
    flex-shrink: 0;
    height: 100%;
    width: 100%;
    max-height: 350px;
  }
}

svg {
  position: absolute;
  width: 320px;
}

path {
  fill: none;
  stroke: url(#linearGradient);
  stroke-width: 4;
  stroke-dasharray: 240 1386;
}

.form {
  margin: 40px;
  position: absolute;
}

label {
  color: #c2c2c5;
  display: block;
  font-size: 18px;
  height: 16px;
  margin-top: 20px;
  margin-bottom: 5px;
}

input {
  background: transparent;
  border: 0;
  color: #f2f2f2;
  font-size: 20px;
  height: 30px;
  line-height: 30px;
  outline: none !important;
  width: 100%;
}

input::-moz-focus-inner {
  border: 0;
}

.button-login-register {
  display: flex;
  justify-content: space-around;
}

.button {
  color: #ea4f4c;
  text-decoration: none;
  margin-top: 40px;
  transition: color 300ms;
  font-weight: bold;
}

.button:hover {
  color: #f2f2f2;
}

.button:active {
  color: #d0d0d2;
}
.font-size-input-login {
  font-size: 16px;
}
</style>
