<template>
  <nav aria-label="Page navigation example" v-if="totalPages > 1">
    <ul class="pagination">
      <li class="page-item" @click="backPage">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only"></span>
        </a>
      </li>
      <li class="page-item" v-for="value in totalPages" :class="{ active: value === currentPage }" :key="value">
        <a class="page-link" href="#" @click="gotoPage(value)">{{ value}}</a>
      </li>
      <li class="page-item" @click="nextPage">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only"></span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script setup>
import { ref, watch } from 'vue';
let emit = defineEmits(['update:page'])
let props = defineProps({
  totalPages: { type: Number, default: 0 },
  current: { type: Number, default: 0 }
})
let currentPage = ref(props.current)

watch(() => props.current, (val) => currentPage.value = val);

const nextPage = () => {
  if (currentPage.value < props.totalPages) {
    let page = currentPage.value + 1;
    emit('update:page', page)
  }
}

const backPage = () => {
  if (currentPage.value > 1) {
    let page = currentPage.value - 1;
    emit('update:page', page)
  }
}

const gotoPage = (page) => {
  currentPage.value = page;
  emit('update:page', page)
}
</script>