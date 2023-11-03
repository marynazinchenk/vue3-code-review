<template>
  <div class="movie-item" :class="{ selected: selectedId === movie.id }">
    <Card class="movie-item" @click="handleMovieOpen">
      <template #slot1>{{ movie.avatar }}</template>
      <template #slot2>{{ movie.title }}</template>
      <template #slot3></template>
    </Card>
    <button v-if="selectedId === movie.id" class="button_delete" @click="handleMovieDelete">Delete movie</button>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';
  import API from '@/api';

  import Card from '../../components/Card.vue';
  import type { Movie } from '../../components/types/Movie';

  const props = defineProps<{
    movie: Movie;
    selectedId: number;
  }>();

  const emitMovieCardEvent = defineEmits(['on-movie-delete', 'on-error', 'on-movie-open']);

  const handleMovieOpen = () => {
    emitMovieCardEvent('on-movie-open', props.movie);
  };

  const handleMovieDelete = () => {
    API.post('/movies/delete', { id: props.selectedId })
      .then(() => {
        emitMovieCardEvent('on-movie-delete', props.movie);
      })
      .catch((err: any) => {
        emitMovieCardEvent('on-error', err);
      });
  };
</script>

<style lang="scss" scoped></style>
