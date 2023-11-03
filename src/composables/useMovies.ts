import { reactive, ref } from 'vue';

import API from '@/api';

import { Movie } from '../components/types/Movie';

const state = ref<Movie[]>([]);
const isFetching = ref<boolean>(false);
const page = reactive<number>(1);

export const useMovies = () => {
  const fetchMovies = () => {
    isFetching = true;

    API.get<Movie[]>(`/movies/list&page=${page}`).then((data) => {
      state = data;
      isFetching = false;
    });
  };

  const search = async (search: string) => {
    isFetching = true;
    state = await API.get(`/movies/list&search=${search}`)
    isFetching = false;
  }

  const fetchMoreMovies = () => {
    page += 1;
    fetchMovies();
  };

  const setPage = (newPage: number) => {
    page = newPage;
  };

  return {
    fetchMovies,
    fetchMoreMovies,
    search,
    setPage,
    isFetching,
    moviesList: state
  };
};
