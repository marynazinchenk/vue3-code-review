<template>
  <div class="user-item" :class="{ selected: selectedId === movie.id }">
    <Card class="user-item" @click="handleUserOpen">
      <template #slot1>{{ movie.avatar }}</template>
      <template #slot2>{{ movie.title }}</template>
      <template #slot3></template>
    </Card>
    <button v-if="selectedId === movie.id" class="button_delete" @click="handleUserDelete">Delete user</button>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';
  import API from '@/api';

  import Card from '../../components/Card.vue';

  import { Movie } from '../../components/types/Movie';

  const props = defineProps<{
    movie: Movie;
    selectedId: number;
  }>();

  const emitUserCardEvent = defineEmits(['on-user-delete', 'on-error', 'on-user-open']);

  const handleUserOpen = () => {
    emitUserCardEvent('on-user-open', props.movie);
  };

  const handleUserDelete = () => {
    API.post('/users/delete', { id: props.selectedId })
      .then(() => {
        emitUserCardEvent('on-user-delete', props.user);
      })
      .catch((err: any) => {
        emitUserCardEvent('on-error', err);
      });
  };
</script>

<style lang="scss" scoped></style>
