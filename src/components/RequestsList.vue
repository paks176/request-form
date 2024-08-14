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
 
            <button class="main-button ms-auto mb-5">СОЗДАТЬ</button>
            <div class="d-flex mb-6">
              <div class="request-table__input d-flex pb-3 me-3">
                <input class="w-100 cursor-pointer" type="text" placeholder="Поиск (№ заявки, название)">
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
              </div>

              <div class="request-table__input d-flex pb-3">
                <select class="w-100 cursor-pointer" name="" id="">
                  <option value="0">Дом</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
            <table class="w-100 mb-6">
              <tr>
                <th class="cursor-pointer">
                  <label for="number">
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
                  <label for="created_at">
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
                  <label for="apartment">
                    <input type="checkbox" id="apartment" class="d-none">
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
                  <label for="applicant">
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
                  <label for="description">
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
                    <input type="checkbox" id="due_date" class="d-none">
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
                    <input type="checkbox" id="status" class="d-none">
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
                  <div class="border-radius-4">{{appeal.number}}</div>
                </td>
                <td>{{appeal?.created_at ? getDate(appeal.created_at) : 'Данные отсутствуют'}}</td>
                <td>{{appeal.premise?.address ? appeal.premise.address : 'Данные отсутствуют' }}</td>
                <td>{{ getApplicant(appeal) }}</td>
                <td>
                  <p>{{ appeal?.description ? appeal.description : 'Данные отсутствуют' }}</p>
                </td>
                <td>{{ appeal?.due_date ? getDate(appeal.due_date) : 'Данные отсутствуют'}}</td>
                <td>{{ appeal?.status?.name ? appeal.status.name : 'Данные отсутствуют' }}</td>
              </tr>
            </table>
         
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "RequestsList",
  computed: {
    ...mapGetters(["getAppealsList"]),
  },
  data() {
    return {
      appealsData: {
        results: [],
      },
      loading: true
    }
  },
  methods: {
    ...mapActions(["sendAppealsRequest"]),
    getFilters() {
      // здесь будут доставаться фильтры, которые юзер применял в прошлый раз
      return {
        page: "1",
        page_size: "10",
      }
    },
    getApplicant(appeal) {
      if (appeal.created_by) {
         if (appeal.created_by.first_name && appeal.created_by.last_name) {
           return appeal.created_by.first_name + " " + appeal.created_by.last_name
         } else return appeal.created_by.username
      } else return 'Данные отсутствуют'
    },
    getDate(date) {
      if (date) {
        return new Date(date).toISOString().slice(0, 16).replace('T', ' ').replaceAll('-', '.');
      }
    },
  },
  mounted() {
    const filters = this.getFilters();
    this.sendAppealsRequest(filters).then(() => {
      if (Object.keys(this.getAppealsList).length) {
        this.$set(this.appealsData, 'results',this.getAppealsList?.results);
        this.$router.push({path: this.$route.fullPath, query: filters})
        setTimeout(() => {
          this.loading = false;
        }, 1000)
      }
    });
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

    & div {
      width: min-content;
      color: #fff;
      background: #50b053;
      padding: 0.25rem 0.875rem
    }
  }
}
</style>