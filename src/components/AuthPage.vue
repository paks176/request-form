<template>
  <div class="auth-page">
    <div class="modal fade" id="auth-modal" tabindex="-1" role="dialog" aria-labelledby="auth-modalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content p-6">
          <div v-show="loading" class="position-absolute loader border-radius-8 ease-animation">
            <img width="128" height="64" src="@/assets/images/loader.gif" alt="Загрузка">
          </div>
          <div class="modal-content__header border-radius-5 p-3">Авторизация</div>
          <div class="modal-content__body">
            <form action="#" @submit.prevent="submitForm">
              <div class="modal-inputs mb-4">

                <!--  login   -->
                <div id="auth-login" class="modal-inputs__item pb-2 mb-2">
                  <div class="modal-inputs__item--message green-text-2 mb-2">
                    Логин или Телефон
                  </div>
                  <div class="d-flex">
                    <svg class="me-2 flex-shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id="mask0_1_11122" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9"/>
                      </mask>
                      <g mask="url(#mask0_1_11122)">
                        <path
                            d="M19.95 21C17.8667 21 15.8083 20.5458 13.775 19.6375C11.7417 18.7292 9.89167 17.4417 8.225 15.775C6.55833 14.1083 5.27083 12.2583 4.3625 10.225C3.45417 8.19167 3 6.13333 3 4.05C3 3.75 3.1 3.5 3.3 3.3C3.5 3.1 3.75 3 4.05 3H8.1C8.33333 3 8.54167 3.07917 8.725 3.2375C8.90833 3.39583 9.01667 3.58333 9.05 3.8L9.7 7.3C9.73333 7.56667 9.725 7.79167 9.675 7.975C9.625 8.15833 9.53333 8.31667 9.4 8.45L6.975 10.9C7.30833 11.5167 7.70417 12.1125 8.1625 12.6875C8.62083 13.2625 9.125 13.8167 9.675 14.35C10.1917 14.8667 10.7333 15.3458 11.3 15.7875C11.8667 16.2292 12.4667 16.6333 13.1 17L15.45 14.65C15.6 14.5 15.7958 14.3875 16.0375 14.3125C16.2792 14.2375 16.5167 14.2167 16.75 14.25L20.2 14.95C20.4333 15.0167 20.625 15.1375 20.775 15.3125C20.925 15.4875 21 15.6833 21 15.9V19.95C21 20.25 20.9 20.5 20.7 20.7C20.5 20.9 20.25 21 19.95 21Z"
                            fill="#757575"/>
                      </g>
                    </svg>
                    <input required type="text" v-model="loginValue">
                  </div>
                </div>
                <!--  password  -->
                <div id="auth-password" class="modal-inputs__item pb-2 mb-2">
                  <div class="modal-inputs__item--message mb-2 text-center text-danger">&nbsp;</div>
                  <div class="d-flex">
                    <svg class="me-2 flex-shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M6.616 21C6.17133 21 5.791 20.8417 5.475 20.525C5.159 20.2083 5.00067 19.8287 5 19.386V10.616C5 10.172 5.15833 9.792 5.475 9.476C5.79167 9.16 6.17167 9.00133 6.615 9H8V7C8 5.886 8.38833 4.941 9.165 4.165C9.941 3.38833 10.886 3 12 3C13.114 3 14.0593 3.38833 14.836 4.165C15.6127 4.94167 16.0007 5.88667 16 7V9H17.385C17.829 9 18.209 9.15833 18.525 9.475C18.841 9.79167 18.9993 10.1717 19 10.615V19.385C19 19.829 18.8417 20.209 18.525 20.525C18.2083 20.841 17.8283 20.9993 17.385 21H6.616ZM12 16.5C12.422 16.5 12.7773 16.3553 13.066 16.066C13.3553 15.7773 13.5 15.422 13.5 15C13.5 14.578 13.3553 14.2227 13.066 13.934C12.7767 13.6453 12.4213 13.5007 12 13.5C11.5787 13.4993 11.2233 13.644 10.934 13.934C10.6447 14.2227 10.5 14.578 10.5 15C10.5 15.422 10.6447 15.7773 10.934 16.066C11.2227 16.3553 11.578 16.5 12 16.5ZM9 9H15V7C15 6.16667 14.7083 5.45833 14.125 4.875C13.5417 4.29167 12.8333 4 12 4C11.1667 4 10.4583 4.29167 9.875 4.875C9.29167 5.45833 9 6.16667 9 7V9Z"
                          fill="#757575"/>
                    </svg>
                    <input required type="password" v-model="passwordValue">
                    <div id="switchButton" @click="switchPasswordVisibility" class="p-0">
                      <svg class="ms-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            class="ease-animation"
                            d="M11.83 9L15 12.16V12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9H11.83ZM7.53 9.8L9.08 11.35C9.03 11.56 9 11.77 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 11.21 7.2 10.47 7.53 9.8ZM2 4.27L4.28 6.55L4.73 7C3.08 8.3 1.78 10 1 12C2.73 16.39 7 19.5 12 19.5C13.55 19.5 15.03 19.2 16.38 18.66L16.81 19.08L19.73 22L21 20.73L3.27 3M12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 12.64 16.87 13.26 16.64 13.82L19.57 16.75C21.07 15.5 22.27 13.86 23 12C21.27 7.61 17 4.5 12 4.5C10.6 4.5 9.26 4.75 8 5.2L10.17 7.35C10.74 7.13 11.35 7 12 7Z"
                            fill="#757575"/>
                      </svg>
                    </div>
                  </div>
                </div>

              </div>
              <button type="submit" class="main-button mx-auto" id="auth-button">Войти</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "AuthPage",
  data() {
    return {
      loginValue: '',
      passwordField: null,
      passwordValue: '',
      messageField: null,
      loading: false,
      authModal: null,
    }
  },
  computed: {
    ...mapGetters(['getAuthStatus']),
  },
  methods: {
    ...mapActions(['sendAuthRequest']),
    switchPasswordVisibility() {
      if (this.passwordField) {
        const switchButton = this.$el.querySelector('#switchButton');
        if (this.passwordField.getAttribute('type') === 'password' && switchButton) {
          this.passwordField.setAttribute('type', 'text');
          switchButton.querySelector('svg path').setAttribute('fill', '#333');
        } else {
          this.passwordField.setAttribute('type', 'password');
          switchButton.querySelector('svg path').setAttribute('fill', '#757575');
        }
      }
    },
    // telPrefix() {
    //   if (!this.loginValue.startsWith('+7')) {
    //     if (this.loginValue.match(/\d+/) !== null) {
    //       this.loginValue = '+7' + this.loginValue;
    //     }
    //   }
    // },
    submitForm() {
      this.loading = true;
      setTimeout(() => {
        const data = {
          'username': this.loginValue,
          'password': this.passwordValue,
        }
        this.sendAuthRequest(data).then(() => {
          if (this.getAuthStatus) {
            this.messageField.classList.replace('text-danger', 'green-text-2')
            this.messageField.innerText = 'Успешный вход';
            this.loading = false;
            this.authModal.hide();
            setTimeout(() => {
              this.$router.push({ name: 'Requests' }).catch(() => {});
            }, 500)
          } else {
            if (this.messageField) {
              this.messageField.innerText = 'Неверные данные для входа';
              this.loading = false;
            }
          }
        })
      }, 500)

    }
  },
  mounted() {
    this.messageField = this.$el.querySelector('#auth-password .modal-inputs__item--message');
    this.passwordField = this.$el.querySelector('#auth-password input');
    this.authModal = Modal.getOrCreateInstance(document.querySelector('#auth-modal'), {
      backdrop: false,
      keyboard: false,
      focus: true,
    });
    this.authModal.show();
  },
}
</script>

<style lang="scss" scoped>
.auth-page {
  min-height: 100vh;
  background-image: url("@/assets/images/auth_back.png");
  background-size: cover;
  background-position: 50% 100%;
}

#auth-modal {
  display: flex !important;
  justify-content: center;
  align-items: center;
}

.modal {
  &-dialog {
    margin: 0;
    width: 340px;
  }

  &-content {
    &__header {
      position: absolute;
      top: -1.25rem;
      left: 1rem;
      width: calc(100% - 2rem);
      font-weight: 500;
      font-size: 1rem;
      line-height: 125%;
      color: #FFFFFF;
      background-color: #44A248;
      text-align: center;
    }

    &__body {
      margin-top: 86px;

      & #auth-button {
        padding-left: 2rem;
        padding-right: 2rem;
      }
    }
  }

  &-inputs {
    &__item {
      border-bottom: 1px solid #CCCCCC;

      & input {
        border: none;
        color: #333;
        outline: none;
        width: 100%;

        &::placeholder {
          color: #999;
        }
      }

      &--message {
        font-size: 12px;
        line-height: 150%;
      }
    }
  }
}
</style>
