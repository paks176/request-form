<template>
<div>
  <div class="modal fade" id="appealModal" tabindex="-1" role="dialog" aria-labelledby="auth-modalLabel">
    <div class="modal-dialog">
      <div class="modal-content p-6">
        <div class="modal-header my-2 p-0">
          <h3>Заявка № {{ this.appealHeader.number }} от {{ this.appealHeader.date }}</h3>
        </div>
        <div class="input-group-1 d-flex mb-6">
          <div class="modal-inputs__item flex-grow-1 pb-2 me-3">
            <div class="modal-inputs__item--message green-text-2 mb-2">
              Дом
            </div>
            <div>
              <select name="" id="premise">
                <option selected>1</option>
                <option>2</option>
              </select>
            </div>
          </div>
          <div class="modal-inputs__item flex-grow-1 pb-2 me-3">
            <div class="modal-inputs__item--message green-text-2 mb-2">
              Квартира
            </div>
            <div>
              <select name="" id="premise">
                <option selected>1</option>
                <option>2</option>
              </select>
            </div>
          </div>
          <div class="modal-inputs__item flex-grow-1 pb-2">
            <div class="modal-inputs__item--message green-text-2 mb-2">
              Срок
            </div>
            <div>
              <input type="date" id="due_date" v-model="formData.due_date">
            </div>
          </div>
        </div>
        <div class="input-group-2 d-flex mb-6">
          <div class="modal-inputs__item pb-2 me-3">
            <div class="modal-inputs__item--message green-text-2 mb-2">
              Фамилия
            </div>
            <div>
              <input type="text">
            </div>
          </div>
          <div class="modal-inputs__item pb-2 me-3">
            <div class="modal-inputs__item--message green-text-2 mb-2">
              Имя
            </div>
            <div>
              <input type="text">
            </div>
          </div>
          <div class="modal-inputs__item pb-2 me-3">
            <div class="modal-inputs__item--message green-text-2 mb-2">
              Отчество
            </div>
            <div>
              <input type="text">
            </div>
          </div>
          <div class="modal-inputs__item pb-2">
            <div class="modal-inputs__item--message green-text-2 mb-2">
              Телефон
            </div>
            <div>
              <input type="number">
            </div>
          </div>
        </div>

        <div class="modal-inputs__item pb-2 flex-grow-1">
          <div class="modal-inputs__item--message green-text-2 mb-2">
            Описание заявки
          </div>
          <textarea></textarea>
        </div>
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
    appealProps: null,
  },
  data() {
    return {
      appealModal: null,
      appealHeader: {
        number: '',
        date: ''
      },
      formData: {
        due_date: '',
        applicant: ''
      }
    }
  },
  watch: {
    $props: {
      handler() {
        if (this.$props.appealProps) {
          this.applyFormInfo(this.$props.appealProps);
          this.appealModal.show();
        }
      },
      deep: true,
    }
  },
  
  methods: {
    applyFormInfo(data) {
      console.log(data)
    }
  },
  
  mounted() {
    this.appealModal = Modal.getOrCreateInstance(document.querySelector('#appealModal'), {
      backdrop: true,
      keyboard: false,
    });

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