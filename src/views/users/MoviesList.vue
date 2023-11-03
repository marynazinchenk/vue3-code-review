<template>
  <div>
    <div class="movies-page">
      <h1 class="page-title">My movies</h1>
      <div class="movies-search">
        <input type="text" v-model="searchQuery">
        <button class="clear-search" @click="searchQuery = ''">X</button>
      </div>
      <ul class="movies-list">
        <ContentScroll @load-more="handleLoadMore">
          <MovieListItem 
              v-if="!isFetching" 
              v-for="movie in moviesList"
              @on-movie-open="handleMovie" 
              @on-movie-delete="handleMovieDelete"
          />
          <Loader v-else />
        </ContentScroll>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';

  import { useMovies } from '../../composables/useMovies';

  import MovieListItem from './MovieListItem.vue';
  import ContentScroll from '../../components/ContentScroll.vue';
  import Loader from '../../components/Loader.vue';

  const router = useRouter();
  const {
    fetchMovies,
    fetchMoreMovies,
    moviesList,
    isFetching,
    setPage,
    search
  } = useMovies();

  const searchQuery = ref('');

  setPage(1);
  fetchMovies();

  const handleLoadMore = () => {
    if (!isFetching.value) {
      fetchMoreMovies();
    }
  };

  const handleMovie = (movie: any) => {
    router.push('/movie/' + movie.id);
  };

  const handleMovieDelete = () => {
    moviesList.value = moviesList.value.filter((movie: any) => movie.id !== movie.id);
  };

  watch(searchQuery, () => {
    if (!!searchQuery.value) {
      search({query: searchQuery.value});
    } else {
      setPage(1);
      fetchMovies();
    }
  }, {immediate: true, deep: true});
</script>

<style lang="scss">
  .page-title {
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 16px;
  }
</style>

<style lang="scss" scoped>
  .movies-page {
    padding: 16px;
  }
</style>
