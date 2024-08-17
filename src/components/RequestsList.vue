<template>
  <div>
    <h1 class="py-4 px-5">Список заявок</h1>
    <div class="p-3">
      <div class="request-table position-relative border-radius-8 px-3 py-7">

        <div v-if="loading" class="loader position-absolute">
          <div class="w-100 h-100 d-flex align-items-center justify-content-center">
            <img width="192" height="96" src="@/assets/images/loader.gif" alt="Загрузка...">
          </div>
        </div>

        <button class="main-button ms-auto mb-5" @click="showAppeal">СОЗДАТЬ</button>
        <div class="d-flex mb-6">
          <div class="request-table__input d-flex pb-3 me-3">
            <input class="w-100" type="text" placeholder="Поиск (№ заявки, название)" id="searchAppealInput" @input="searchAppealOnInput">
            <button @click="searchAppealByClick">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_2002_52" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                  <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_2002_52)">
                  <path
                      d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
                      fill="#999999"/>
                </g>
              </svg>
            </button>
          </div>

          <div class="request-table__input d-flex pb-3">
            <select class="w-100 cursor-pointer" name="" id="premiseSelect" @change="choosePremise">
              <option selected value="">Не выбрано</option>
              <option v-for="premise in this.premisesData.results" :key="premise.id" :value="premise.id">
                {{ premise?.full_address }}
              </option>
            </select>
          </div>
        </div>

        <div v-if="!this.appealsData.results.length && !loading" class="p-5 d-flex justify-content-center align-items-center w-100">
          <h2>Нет результатов</h2>
        </div>
        
        <div v-else>
          <table class="w-100 mb-6">
            <tr>
              <th class="cursor-pointer">
                <label for="number" @click="sortBy('number')">
                  <input type="checkbox" id="number" class="d-none">
                  №
                  <svg class="ms-1 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_2026_108" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                      <rect width="16" height="16" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_2026_108)">
                      <path class="ease-animation" d="M7.33333 12V5.86668L4.93333 8.26668L4 7.33334L8 3.33334L12 7.33334L11.0667 8.26668L8.66667 5.86668V12H7.33333Z" fill="#CCCCCC"/>
                    </g>
                  </svg>
                </label>
              </th>
              <th class="cursor-pointer">
                <label for="created_at" data-sort="created" @click="sortBy('created')">
                  <input type="checkbox" id="created_at" class="d-none">
                  Создана
                  <svg class="ms-1 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_2026_108" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                      <rect width="16" height="16" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_2026_108)">
                      <path class="ease-animation" d="M7.33333 12V5.86668L4.93333 8.26668L4 7.33334L8 3.33334L12 7.33334L11.0667 8.26668L8.66667 5.86668V12H7.33333Z" fill="#CCCCCC"/>
                    </g>
                  </svg>
                </label>
              </th>
              <th class="cursor-pointer">
                <label for="address" @click="sortBy('address')">
                  <input type="checkbox" id="address" class="d-none">
                  Адрес
                  <svg class="ms-1 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_2026_108" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                      <rect width="16" height="16" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_2026_108)">
                      <path class="ease-animation" d="M7.33333 12V5.86668L4.93333 8.26668L4 7.33334L8 3.33334L12 7.33334L11.0667 8.26668L8.66667 5.86668V12H7.33333Z" fill="#CCCCCC"/>
                    </g>
                  </svg>
                </label>
              </th>
              <th class="cursor-pointer">
                <label for="applicant" @click="sortBy('applicant')">
                  <input type="checkbox" id="applicant" class="d-none">
                  Заявитель
                  <svg class="ms-1 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_2026_108" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                      <rect width="16" height="16" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_2026_108)">
                      <path class="ease-animation" d="M7.33333 12V5.86668L4.93333 8.26668L4 7.33334L8 3.33334L12 7.33334L11.0667 8.26668L8.66667 5.86668V12H7.33333Z" fill="#CCCCCC"/>
                    </g>
                  </svg>
                </label>
              </th>
              <th class="cursor-pointer">
                <label for="description" @click="sortBy('description')">
                  <input type="checkbox" id="description" class="d-none">
                  Описание
                  <svg class="ms-1 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_2026_108" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                      <rect width="16" height="16" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_2026_108)">
                      <path class="ease-animation" d="M7.33333 12V5.86668L4.93333 8.26668L4 7.33334L8 3.33334L12 7.33334L11.0667 8.26668L8.66667 5.86668V12H7.33333Z" fill="#CCCCCC"/>
                    </g>
                  </svg>
                </label>
              </th>
              <th class="cursor-pointer">
                <label for="due_date">
                  <input type="checkbox" id="due_date" class="d-none" @click="sortBy('due_date')">
                  Срок
                  <svg class="ms-1 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_2026_108" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                      <rect width="16" height="16" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_2026_108)">
                      <path class="ease-animation" d="M7.33333 12V5.86668L4.93333 8.26668L4 7.33334L8 3.33334L12 7.33334L11.0667 8.26668L8.66667 5.86668V12H7.33333Z" fill="#CCCCCC"/>
                    </g>
                  </svg>
                </label>
              </th>
              <th class="cursor-pointer">
                <label for="status">
                  <input type="checkbox" id="status" class="d-none" @click="sortBy('status')">
                  Статус
                  <svg class="ms-1 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_2026_108" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                      <rect width="16" height="16" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_2026_108)">
                      <path class="ease-animation" d="M7.33333 12V5.86668L4.93333 8.26668L4 7.33334L8 3.33334L12 7.33334L11.0667 8.26668L8.66667 5.86668V12H7.33333Z" fill="#CCCCCC"/>
                    </g>
                  </svg>
                </label>
              </th>
            </tr>
            
            <tr v-for="appeal in this.appealsData.results" :key="appeal.id">
              <td>
                <button class="border-radius-4 cursor-pointer" @click="showAppeal(appeal.id)">{{ appeal.number }}</button>
              </td>
              <td>{{ appeal?.created_at ? getDate(appeal.created_at) : 'Данные отсутствуют' }}</td>
              <td>{{ appeal.premise?.address ? appeal.premise.address : 'Данные отсутствуют' }}</td>
              <td>{{ getApplicant(appeal)?.firstName && getApplicant(appeal)?.lastName ? getApplicant(appeal)?.firstName + ' ' + getApplicant(appeal)?.lastName : getApplicant(appeal)?.userName }}</td>
              <td>
                <p>{{ appeal?.description ? appeal.description : 'Данные отсутствуют' }}</p>
              </td>
              <td>{{ appeal?.due_date ? getDate(appeal.due_date) : 'Данные отсутствуют' }}</td>
              <td>{{ appeal?.status?.name ? appeal.status.name : 'Данные отсутствуют' }}</td>
            </tr>
          </table>
        </div>

        <div v-if="this.paginationData.pages > 1" class="d-flex justify-content-between">
          <div class="d-flex align-items-center">
            <div class="me-3">
              <b>{{ (this.paginationData.page * this.paginationData.page_size) - (this.paginationData.page_size - 1) }}-{{ (this.paginationData.page * this.paginationData.page_size) }}</b>
              из <b>{{ this.paginationData.pages * this.paginationData.page_size }}</b> записей
            </div>
            <select name="page_size" id="pageSize" @change="changePageSize">
              <option value="10" selected>10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>
          <div class="pagination d-flex align-items-center">
            <button data-action="first" v-if="this.paginationData.page !== 1" @click="changePage">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_2038_827" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
                  <rect width="14" height="14" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_2038_827)">
                  <path
                      d="M6.41669 10.5L2.91669 7L6.41669 3.5L7.23335 4.31667L4.5646 7L7.23335 9.68333L6.41669 10.5ZM10.2667 10.5L6.76669 7L10.2667 3.5L11.0834 4.31667L8.4146 7L11.0834 9.68333L10.2667 10.5Z"
                      fill="#6C757D"/>
                </g>
              </svg>
            </button>

            <button data-action="prev" v-if="this.paginationData.page_previous" @click="changePage">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_2038_834" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
                  <rect width="14" height="14" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_2038_834)">
                  <path d="M8.16669 10.5L4.66669 7L8.16669 3.5L8.98335 4.31667L6.30002 7L8.98335 9.68333L8.16669 10.5Z" fill="#6C757D"/>
                </g>
              </svg>
            </button>

            <div class="d-flex align-items-center">
              <button v-for="index in getMaxPages()" :key="index" :data-action="getPagesArray() + index" @click="changePage" :class="getCurrentPage(index) ? 'current' : ''">
                {{ getPagesArray() + index }}
              </button>
            </div>

            <button data-action="next" v-if="this.paginationData.page_next" @click="changePage">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_2038_869" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                  <rect width="16" height="16" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_2038_869)">
                  <path d="M8.40004 8L5.33337 4.93333L6.26671 4L10.2667 8L6.26671 12L5.33337 11.0667L8.40004 8Z" fill="#6C757D"/>
                </g>
              </svg>
            </button>

            <button data-action="last" v-if="this.paginationData.page !== this.paginationData.pages" @click="changePage">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_2038_876" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                  <rect width="16" height="16" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_2038_876)">
                  <path
                      d="M6.38337 8L3.33337 4.93333L4.26671 4L8.26671 8L4.26671 12L3.33337 11.0667L6.38337 8ZM10.7834 8L7.73337 4.93333L8.66671 4L12.6667 8L8.66671 12L7.73337 11.0667L10.7834 8Z"
                      fill="#6C757D"/>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <AppealModal :appeal="this.modalProps" @clearProps="clearModalProps" @showEditedAppeal="filterByEditedAppeal"/>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import AppealModal from "@/components/AppealModal.vue";

export default {
  name: "RequestsList",
  
  components: {
    AppealModal,
  },
  
  computed: {
    ...mapGetters(["getAppealsList", "getAuthStatus", "getPremisesData"]),
  },
  
  data() {
    return {
      loading: true,
      
      currentQuery: {
        page_size: '10',
        page: '1',
        premise_id: '',
        search: '',
      },
      appealsData: {
        results: [],
      },
      paginationData: {
        page: '',
        page_next: '',
        page_previous: '',
        page_size: '',
        pages: '',
      },
      premisesData: [],
      
      searchAppealInput: null,
      pageSizeSelect: null,
      premiseSelect: null,
      
      modalProps: null,
    }
  },
  
  methods: {
    ...mapActions(["sendAppealsRequest", "sendPremisesRequest"]),
    
    ...mapMutations(["sortBy", "pushNewToast"]),

    filterByEditedAppeal(response) {
      if (response && response.number) {
        this.currentQuery.search = response.number;
        this.searchAppealInput.value = response.number;
      }
      this.currentQuery.page = 1;
      this.currentQuery.premise_id = '';
    },

    searchAppealOnInput() {
      if (this.searchAppealInput) {
        setTimeout(() => {
          this.currentQuery.search = this.searchAppealInput.value;
          this.currentQuery.page = 1;
        }, 1000)
      }
    },

    searchAppealByClick() {
      if (this.searchAppealInput) {
        this.currentQuery.search = this.searchAppealInput.value;
        this.currentQuery.page = 1;
      }
    },
    
    choosePremise() {
      if (this.premiseSelect) {
        const selected = this.premiseSelect.selectedIndex;
        const value = this.premiseSelect[selected].value;
        if (value) {
          this.currentQuery.premise_id = value;
        } else {
          this.currentQuery.premise_id = '';
        }
        this.currentQuery.page = 1;
      }
    },

    changePage(event) {
      const action = event.target.dataset.action;
      const curPage = Number(this.currentQuery.page);
      if (!isNaN(Number(action))) {
        // пришло число, меняем страницу на конкретную
        if (this.paginationData.page !== Number(action)) {
          this.currentQuery.page = action;
        }
      } else {
        // пришло действие
        switch (action) {
          case "next":
            this.currentQuery.page = String(curPage + 1);
            break;
          case "prev":
            if (curPage - 1 !== 0) {
              this.currentQuery.page = String(curPage - 1);
            }
            break;
          case "first":
            if (this.paginationData.page !== '1') {
              this.currentQuery.page = '1';
            }
            break;
          case "last":
            if (this.paginationData.page !== this.paginationData.pages) {
              this.currentQuery.page = this.paginationData.pages;
            }
            break;
        }
      }
    },

    getMaxPages() {
      if (this.paginationData.pages < 5) {
        return this.paginationData.pages;
      } else {
        return 5;
      }
    },

    getCurrentPage(index) {
      if (Number(this.paginationData.page) === this.getPagesArray() + index) {
        return true
      } else return false
    },

    getApplicant(appeal) {
      let result = {
        firstName: '',
        lastName: '',
        userName: '',
        patronymic: '',
      };

      const getName = (name) => {
        if (name && name.startsWith('user_')) {
          return name.split('_')[1];
        } else return name;
      }
      
      appeal.created_by.first_name ? result.firstName = getName(appeal.created_by.first_name) : result.firstName = null;

      appeal.created_by.last_name ? result.lastName = getName(appeal.created_by.last_name) : result.lastName = null;

      appeal.created_by.patronymic? result.patronymic = getName(appeal.created_by.patronymic) : result.patronymic = null;

      appeal.created_by.username ? result.userName = appeal.created_by.username : result.userName = null;
      
      return result;
    },

    getDate(date) {
      if (date) {
        const objData = new Date(date);
        const makeTwoDigits = (value) => {
          if (String(value).length === 1) {
              return '0' + value; 
          } else return value;
        }
        return makeTwoDigits(objData.getDate()) + '.'
            + makeTwoDigits(objData.getMonth())
            + '.' + objData.getFullYear()
            + ' ' + makeTwoDigits(objData.getHours())
            + ':' + makeTwoDigits(objData.getMinutes());
      }
    },

    changePageSize() {
      if (this.pageSizeSelect) {
        const selected = this.pageSizeSelect.selectedIndex;
        const value = this.pageSizeSelect[selected].value;
        if (value) {
          this.currentQuery.page_size = value;
          this.currentQuery.page = 1;
        }
      }
    },

    updateTable() {
      this.loading = true;
      this.sendAppealsRequest(this.currentQuery).then(() => {
        if (Object.keys(this.getAppealsList).length) {
          this.$set(this.appealsData, 'results', this.getAppealsList?.results);
          this.$set(this.paginationData, 'page', this.getAppealsList?.page);
          this.$set(this.paginationData, 'page_next', this.getAppealsList?.page_next);
          this.$set(this.paginationData, 'page_previous', this.getAppealsList?.page_previous);
          this.$set(this.paginationData, 'page_size', this.getAppealsList?.page_size);
          this.$set(this.paginationData, 'pages', this.getAppealsList?.pages);
          this.pageSizeSelect = this.$el.querySelector('select#pageSize');
          this.$router.replace({query: this.currentQuery}).catch(() => {
          });
          setTimeout(() => {
            this.loading = false;
          }, 500)
        }
      });
    },

    getPagesArray() {
      const getLastElement = (page) => {
        if (page >= 5 && this.paginationData.pages > 5) {
          while (page % 5 !== 0 && page < Number(this.paginationData.pages)) {
            page++
          }
          return page;
        } else {
          return page;
        }
      }
      const lastEl = getLastElement(Number(this.paginationData.page));
      if (lastEl - 5 > 0) {
        return lastEl - 5
      } else {
        return 0;
      }
    },

    showAppeal(id) {
      let thisAppeal;
      if (id) {
        thisAppeal = this.appealsData.results.find((appeal) => appeal.id === id);
      }
      this.prepareDataForModal(thisAppeal)
    },
    
    prepareDataForModal(data) {
      if (data?.id) {
        // если редактируем
        this.modalProps = {
          appeal_id: data.id,
          modalHeader: {
            number: data?.number,
            date: this.getDate(data?.created_at).split(' ')[0],
            status: data.status.name,
          },
          applicant: this.getApplicant(data),
          phone: data.applicant?.phone,
          description: data?.description,
          full_address: data.premise?.full_address,
          premise_id: data?.premise?.id,
          apartment: data.apartment?.number,
          due_date: data?.due_date,
          status: data.status,
        };
      } else {
        // если новая
        this.modalProps = {
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
          status_id: 1,
        };
      }
      
    },

    clearModalProps() {
     this.modalProps = null; 
    }
  },
  
  watch: {
    'currentQuery': {
      handler: function () {
        this.updateTable();
      },
      deep: true
    }
  },
  
  mounted() {
    if (this.getAuthStatus) {
      this.premiseSelect = this.$el.querySelector('select#premiseSelect');
      this.searchAppealInput = this.$el.querySelector('#searchAppealInput');
      
      this.sendPremisesRequest().then(() => {
        this.$set(this.premisesData, 'results', this.getPremisesData?.results);
      })
      this.updateTable();
      this.pushNewToast({
        type: 'warning',
        header: 'Работает простая сортировка по столбцам по возрастанию по клику',
        text: 'Работает в пределах одной страницы. Чтобы было и на убывание требуется больше времени, опыт создания таких таблиц с сортировкой есть.'
      })
    } else {
      this.$router.push({name: 'Login'});
    }
  },
}
</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  display: block;
  transition: opacity 0.2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

h1 {
  margin-bottom: 47px;
  font-size: 20px;
  line-height: 120%;
  color: #454545;
}

.request-table {
  transition: all 0.5s ease;
  min-height: calc(100vh - 172px);
  margin-bottom: 100px;
  background-color: #FFFFFF;

  &__input {
    flex-grow: 1;
    border-bottom: 1px solid #CCCCCC;
    max-width: 50%;

    & input, select {
      background-color: transparent;
      border: none;
      outline: none;
    }
  }
}

select {
  cursor: pointer;
  min-width: 90px;
  background-color: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid #CCCCCC;
  padding: 0.5rem 0;
}

table {
  & tr {
    border-bottom: 1px solid #CCCCCC;
  }

  & th {
    border-bottom: 1px solid #CCCCCC;

    & label {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      cursor: pointer;
      color: #50b053;
      padding: 0.75rem 0.5rem;
      font-weight: 400;

      &:hover svg path {
        fill: #333333;
      }

      & input:checked + svg path {
        fill: #333333;
      }
    }
  }

  & td {
    padding: 1.25rem .5rem;

    & p {
      margin: 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 1;
      max-width: 260px;
    }

    & button {
      width: min-content;
      color: #fff;
      background: #50b053;
      padding: 0.25rem 0.875rem
    }
  }
}

.pagination {
  button {
    cursor: pointer;
    width: 46px;
    height: 32px;
    margin: 0 4px;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    & svg {
      pointer-events: none;
    }

    &.current {
      width: unset;
      padding: 10px;
      color: #fff;
      box-shadow: 0 4px 4px 0 rgba(106, 174, 94, 0.25);
      background: #50b053;
      border-radius: 50%;
      aspect-ratio: 1 / 1;
    }
  }
}
</style>