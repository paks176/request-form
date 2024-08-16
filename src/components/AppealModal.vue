<template>
<div>
  <div class="modal fade" id="appealModal" tabindex="-1" role="dialog" aria-labelledby="auth-modalLabel">
    <div class="modal-dialog">
      <div class="modal-content p-6">
        <div class="modal-header my-2 p-0">
          <h3>Заявка № {{ this.localAppeal.modalHeader.number }} (от {{ this.localAppeal.modalHeader.date }})</h3>
        </div>
        <div class="input-group-1 d-flex mb-6">
          <div class="modal-inputs__item flex-grow-1 pb-2 me-3">
            <div class="modal-inputs__item--message green-text-2 mb-2">
              Дом
            </div>
            <div>
              <input type="text" id="premiseAddress" v-model="this.localAppeal.address" :placeholder="this.localAppeal.address ?? 'Не указано' "/>
            </div>
          </div>
          <div class="modal-inputs__item flex-grow-1 pb-2 me-3">
            <div class="modal-inputs__item--message green-text-2 mb-2">
              Квартира
            </div>
            <div>
              <input type="text" id="premiseApartment" v-model="this.localAppeal.apartment" :placeholder="this.localAppeal.apartment ?? 'Не указано' "/>
            </div>
          </div>
          <div class="modal-inputs__item flex-grow-1 pb-2">
            <div class="modal-inputs__item--message green-text-2 mb-2">
              Срок
            </div>
            <div>
              <input type="date" id="dueDate" :value ="this.myDate && new Date(myDate.getTime()-(myDate.getTimezoneOffset()*60*1000)).toISOString().split('T')[0]" @input="this.myDate = $event.target.valueAsDate"/>
            </div>
          </div>
        </div>
        <div class="input-group-2 d-flex mb-6">
          <div class="modal-inputs__item pb-2 me-3">
            <div class="modal-inputs__item--message green-text-2 mb-2">
              Фамилия
            </div>
            <div>
              <input type="text" v-model="this.localAppeal.applicant.lastName"  :placeholder="this.localAppeal.lastName ?? 'Не указано'">
            </div>
          </div>
          <div class="modal-inputs__item pb-2 me-3">
            <div class="modal-inputs__item--message green-text-2 mb-2">
              Имя
            </div>
            <div>
              <input type="text" v-model="this.localAppeal.applicant.firstName" :placeholder="this.localAppeal.firstName ?? 'Не указано'">
            </div>
          </div>
          <div class="modal-inputs__item pb-2 me-3">
            <div class="modal-inputs__item--message green-text-2 mb-2">
              Отчество
            </div>
            <div>
              <input type="text" v-model="this.localAppeal.applicant.patronymic" :placeholder="this.localAppeal.patronymic ?? 'Не указано'">
            </div>
          </div>
          <div class="modal-inputs__item pb-2">
            <div class="modal-inputs__item--message green-text-2 mb-2">
              Телефон
            </div>
            <div>
              <input type="number" v-model="this.localAppeal.applicant.phone" :placeholder="this.localAppeal.phone ?? 'Не указано'">
            </div>
          </div>
        </div>

        <div class="modal-inputs__item pb-2 flex-grow-1">
          <div class="modal-inputs__item--message green-text-2 mb-2">
            Описание заявки
          </div>
          <textarea v-model="this.localAppeal.description" :placeholder="this.localAppeal.description ?? 'Не указано'"></textarea>
        </div>
        <button class="d-none" id="setDate" @click="setDateFromAppeal">Set date one to today</button>
        <button class="main-button ms-auto mt-4">Сохранить</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { Modal } from 'bootstrap';
export default {
  name: "AppealModal",
  props: {
    appeal: null,
  },
  data() {
    return {
      appealModal: null,
      myDate: new Date('2000-01-01T00:01:01Z'),
      formInputs: {
        dueDateInput: null,
        addressInput: null, 
      },
      localAppeal: {
        modalHeader: {
          number: '',
          date: '',
        },
        applicant: '',
        phone: '',
        description: '',
        address: '',
        apartment: '',
        due_date: '',
      },
      setDateButton: '',
    }
  },
  watch: {
    $props: {
      handler() {
        if (this.$props.appeal) {
          this.$set(this.$data, 'localAppeal', this.$props.appeal);
          // костыль, vue не поддерживает .valueAsDate почему-то! По хорошему надо встроить библиотеку, но нет времени
          // из-за костыля в консоли ошибки, но форма работает. При начичии времени можно сделать по-нормальному
          this.setDateButton.click();
          this.appealModal.show();
        }
      },
      deep: true,
    }
  },
  
  methods: {
    setDateFromAppeal() {
      this.myDate = new Date(this.localAppeal.due_date);
    }
  },
  
  mounted() {
    this.formInputs.dueDateInput = this.$el.querySelector('#dueDate');
    this.formInputs.addressInput = this.$el.querySelector('#premiseAddress');
    this.setDateButton = this.$el.querySelector('#setDate');
    this.appealModal = Modal.getOrCreateInstance(document.querySelector('#appealModal'), {
      backdrop: true,
      keyboard: false,
    });
    this.myDate = new Date(this.myDate.setDate(this.myDate.getDate() + 1));

    this.$el.querySelector('#appealModal').addEventListener('hidden.bs.modal', () => {
      this.$emit('clearProps');
    })
  }
}


</script>

<style scoped lang="scss">
  .input-group-2 {
    .modal-inputs__item input {
      max-width: 160px;
    }
  }
  .modal {
    &-header {
      border: none;
      & h3 {
        font-weight: 500;
        font-size: 16px;
        line-height: 150%;
      }
    }
    &-dialog {
      margin-top: 20%;
      max-width: unset !important;
      width: 740px;
    }
    &-inputs {
      &__item {
        cursor: pointer;
        border-bottom: 1px solid #CCCCCC;

        & input {
          border: none;
          color: #333;
          outline: none;

          &::placeholder {
            color: #999;
          }
        }
        &--message {
          font-size: 12px;
          line-height: 150%;
        }
        & select {
          border: none;
          width: 100%;
          background: none;
        }
        & textarea {
          width: 100%;
          border: none;
        }
      }
    }
  }
</style>