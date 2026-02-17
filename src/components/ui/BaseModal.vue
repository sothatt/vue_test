<template>
  <div>

    <div class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);" @click.self="$emit('close')">
      <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ title }}
            </h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <slot/>
          </div>
          <div class="modal-footer">
            <slot name="footer">

            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps,defineEmits } from 'vue';

defineProps({title : String })

/*
let props = defineProps[{ }]
*/
const emit = defineEmits(["close"]);

// const close = () => emit("close");



</script>
