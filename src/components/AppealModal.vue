<template>
<div>
  <div class="modal fade" id="appealModal" tabindex="-1" role="dialog" aria-labelledby="auth-modalLabel">
    <div class="modal-dialog">
      <div class="modal-content p-6">
        <div class="modal-header my-2 p-0 d-flex justify-content-between">
          <div v-if="localAppeal.modalHeader.number && localAppeal.modalHeader.date">
            <h3>Заявка № {{ localAppeal.modalHeader.number }} (от {{ localAppeal.modalHeader.date }})</h3>
          </div>
          <b v-else>Создание заявки</b>
          <b v-if="localAppeal.modalHeader.status">Статус: {{ localAppeal.modalHeader.status }}</b>
          <b v-if="!localAppeal.modalHeader.number">Новая</b>
        </div>

        <div class="input-group-1 d-flex mb-6">

          <div class="modal-inputs__item position-relative flex-grow-1 pb-2 me-3">
            <div class="modal-inputs__item--message green-text-2 mb-2">
              Дом
            </div>
            <div>
              <input
                  data-info="premise_id"
                  type="text"
                  id="premiseAddress"
                  @input="sendPremisesAutocompleteRequest($event.target.value)"
                  v-model="localAppeal.full_address"
                  :placeholder="!localAppeal.full_address ? 'Не указано' : '' "/>
            </div>
            <div v-if="getPremisesAutocomplete.length" class="choice position-absolute">
              <div
                  class="choice-item p-2"
                  v-for="item in getPremisesAutocomplete"
                  :key="item.id"
                  @click="applyAddressChoice($event.target, item.id)"
              >
                {{ item.full_address }}
              </div>
            </div>
          </div>

          <div class="modal-inputs__item position-relative flex-grow-1 pb-2 me-3">
            <div class="modal-inputs__item--message green-text-2 mb-2">
              Квартира
            </div>
            <div>
              <input
                  data-info="apartment"
                  type="text"
                  id="apartmentInput"
                  @input="sendApartmentAutocompleteRequest({ apartment: $event.target.value, premise: localAppeal.premise_id })"
                  v-model="localAppeal.apartment"
                  :placeholder="!localAppeal.apartment ? 'Не указано' : '' "/>
            </div>
            <div v-if="getApartmentAutocomplete.length > 0 && formInputs?.apartmentInput?.value !== ''" class="choice position-absolute">
              <div
                  class="choice-item p-2"
                  v-for="item in getApartmentAutocomplete"
                  :key="item.id"
                  @click="applyApartmentChoice($event.target, item.id)"
              >
                {{ item.number }}
              </div>
            </div>
          </div>


          <div class="modal-inputs__item flex-grow-1 pb-2">
            <div class="modal-inputs__item--message green-text-2 mb-2">
              Срок
            </div>
            <div>
              <input
                  data-info="due_date"
                  type="date"
                  @change="onFormChange($event.target)"
                  id="due_date"
                  :value ="myDate && new Date(myDate.getTime()-(myDate.getTimezoneOffset()*60*1000)).toISOString().split('T')[0]"
                  @input="myDate = $event.target.valueAsDate"/>
            </div>
          </div>
        </div>

        <div class="input-group-2 d-flex mb-6">
          <div class="modal-inputs__item pb-2 me-3">
            <div class="modal-inputs__item--message green-text-2 mb-2">
              Фамилия
            </div>
            <div>
              <input
                  data-info="lastName"
                  type="text"
                  @input="onFormChange($event.target)"
                  :value="localAppeal.applicant.lastName"
                  :placeholder="localAppeal.lastName ?? 'Не указано'">
            </div>
          </div>
          <div class="modal-inputs__item pb-2 me-3">
            <div class="modal-inputs__item--message green-text-2 mb-2">
              Имя
            </div>
            <div>
              <input
                  data-info="firstName"
                  type="text"
                  @input="onFormChange($event.target)"
                  :value="localAppeal.applicant.firstName"
                  :placeholder="localAppeal.firstName ?? 'Не указано'">
            </div>
          </div>
          <div class="modal-inputs__item pb-2 me-3">
            <div class="modal-inputs__item--message green-text-2 mb-2">
              Отчество
            </div>
            <div>
              <input
                  data-info="patronymic"
                  type="text"
                  @input="onFormChange($event.target)"
                  :value="localAppeal.applicant.patronymic"
                  :placeholder="localAppeal.patronymic ?? 'Не указано'">
            </div>
          </div>
          <div class="modal-inputs__item pb-2">
            <div class="modal-inputs__item--message green-text-2 mb-2">
              Телефон
            </div>
            <div>
              <input
                  data-info="phone"
                  type="number"
                  @change="onFormChange($event.target)"
                  v-model="localAppeal.phone"
                  :placeholder="localAppeal.phone ?? 'Не указано'">
            </div>
          </div>
        </div>

        <div class="modal-inputs__item pb-2 flex-grow-1">
          <div class="modal-inputs__item--message green-text-2 mb-2">
            Описание заявки
          </div>
          <textarea
              data-info="description"
              :value="localAppeal.description"
              @input="onFormChange($event.target)"
              :placeholder="localAppeal.description ?? 'Не указано'"></textarea>
        </div>

        <button class="d-none" id="setDate" @click="setDateFromAppeal">Set date</button>

        <div class="d-flex ms-auto">
          <button :class="{disabled: !formChanged}" class="main-button mt-4 me-4" @click="handleAppealChange(localAppeal)">Сохранить</button>
          <button class="main-button mt-4" @click="closeModal()">Закрыть</button>
        </div>

        <div v-if="modalLoading" class="position-absolute loader border-radius-8 ease-animation">
          <div v-if="success" class="border-radius-8 bg-white p-4 box-shadow">
            <h4 class="green-text-1">Успешно</h4>
          </div>
          <div v-else>
            <img width="128" height="64" src="@/assets/images/loader.gif" alt="Загрузка">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import { Modal } from 'bootstrap';
export default {
  name: "AppealModal",

  props: {
    appeal: null,
  },

  computed: {
    ...mapGetters(["getPremisesAutocomplete", "getApartmentAutocomplete"]),
  },

  data() {
    return {
      appealModal: null,
      modalLoading: false,
      success: false,
      formChanged: false,
      myDate: new Date('2000-01-01T00:01:01Z'),

      formInputs: {
        dueDateInput: null,
        addressInput: null,
        apartmentInput: null,
      },

      localAppeal: {
        appeal_id: '',
        modalHeader: {
          number: '',
          date: '',
        },
        applicant: {
          first_name: '',
          last_name: '',
          patronymic_name: '',
          username: ''
        },
        phone: '',
        description: '',
        full_address: '',
        apartment: '',
        apartment_id: '',
        due_date: '',
        premise_id: '',
      },

      setDateButton: '',
    }
  },
  watch: {
    $props: {
      handler() {
        if (this.$props.appeal) {
          this.$set(this.$data, 'localAppeal', this.$props.appeal);
          this.setDateButton.click();
          this.appealModal.show();
        }
      },
      deep: true,
    },
    localAppeal: {
      // не закончил нормальное отслеживание изменений для отображения кнопки Сохранить, надо больше времени
      // handler(newValue, oldValue) {
      //   if (!this.isDefaultValues) {
      //     console.log(JSON.stringify(newValue));
      //     console.log(JSON.stringify(oldValue));
      //     if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
      //       this.formChanged = true;
      //     }
      //   }
      // },
      // deep: true,
    }
  },

  methods: {
    ...mapActions([
      "sendPremisesAutocompleteRequest",
      "sendApartmentAutocompleteRequest",
      "changeOrCreateAppeal"
    ]),
    ...mapMutations(["setPremisesAutocomplete", "setApartmentAutocomplete"]),
    onFormChange(target) {
      this.formChanged = true;
      if (target.dataset.info === 'firstName' || target.dataset.info === 'lastName' || target.dataset.info === 'patronymic') {
        this.localAppeal.applicant[target.dataset.info] = target.value;
      } else {
        this.localAppeal[target.dataset.info] = target.value;
      }
    },
    applyAddressChoice(target, id) {
      if (this.formInputs.addressInput && id) {
        this.localAppeal.full_address = target.innerText;
        this.localAppeal.premise_id = id;
        this.setPremisesAutocomplete([]);
        this.formChanged = true;
      }
    },
    applyApartmentChoice(target, id) {
      if (this.formInputs.apartmentInput && id) {
        this.localAppeal.apartment = target.innerText;
        this.localAppeal.apartment_id = id;
        this.setApartmentAutocomplete([]);
        this.formChanged = true;
      }
    },
    setDateFromAppeal() {
      if (!this.localAppeal.due_date) {
        this.myDate = new Date(Date.now());
        this.localAppeal.due_date = new Date(Date.now()).toISOString();
      } else {
        this.myDate = new Date(this.localAppeal.due_date);
      }
    },
    closeModal() {
      if (this.appealModal) {
        this.appealModal.hide();
      }
    },
    handleAppealChange(appeal) {
      this.modalLoading = true;

      if (appeal.due_date) {
        appeal.due_date = new Date(appeal.due_date).toISOString();
      }

      this.changeOrCreateAppeal(appeal)
          .then(response => {
            this.success = true;
            setTimeout(() => {
              this.closeModal();
              this.success = false;
              this.modalLoading = false;
              this.$emit('showEditedAppeal', response)
            }, 1000)
          })
    }
  },

  mounted() {
    this.formInputs.dueDateInput = this.$el.querySelector('#due_date');
    this.formInputs.addressInput = this.$el.querySelector('#premiseAddress');
    this.formInputs.apartmentInput = this.$el.querySelector('#apartmentInput');
    this.setDateButton = this.$el.querySelector('#setDate');

    this.appealModal = Modal.getOrCreateInstance(document.querySelector('#appealModal'), {
      backdrop: true,
      keyboard: true,
    });

    this.myDate = new Date(this.myDate.setDate(this.myDate.getDate() + 1));

    this.$el.querySelector('#appealModal').addEventListener('hidden.bs.modal', () => {
      this.$emit('clearProps');
      this.formChanged = false;
      this.setPremisesAutocomplete([]);
      this.setApartmentAutocomplete([]);
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
      margin-top: 15%;
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
          outline: none;
        }
      }
    }
  }
  .choice {
    transition: all 0.3s ease;
    background-color: #FFFFFF;
    border: 1px solid #CCCCCC;
    border-radius: 0 0 6px 6px;
    top: 100%;
    width: 100%;
    max-height: 300px;
    overflow-y: auto;
      &::-webkit-scrollbar {
        width: 12px;
        background-clip: padding-box;
      }
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #D6D6DF;
        border-radius: 20px;
        border: 3px solid #fff;
      }
    &-item {
      cursor: pointer;
      &:hover {
        background-color: #CCCCCC;
      }
    }
  }
</style>
