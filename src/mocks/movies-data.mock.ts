import { IMovieData } from 'src/app/interfaces/list-movies.interface';

export const movieDataMock: IMovieData = {
  content: Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    year: 1980 + (index % 40), // Anos variando entre 1980 e 2020
    title: `Movie Title ${index + 1}`,
    studios: [`Studio ${(index % 5) + 1}`], // 5 estúdios diferentes
    producers: [`Producer ${(index % 10) + 1}`], // 10 produtores diferentes
    winner: index % 3 === 0, // Ganhadores a cada 3 filmes
  })),
  pageable: {
    sort: {
      sorted: false,
      unsorted: true,
    },
    pageSize: 10, // 10 filmes por página
    pageNumber: 0, // Página inicial
    offset: 0,
    paged: true,
    unpaged: false,
  },
  totalElements: 15, // Total de filmes
  last: false, // Não é a última página
  totalPages: 5, // 50 filmes divididos em 5 páginas
  first: true, // Primeira página
  sort: {
    sorted: false,
    unsorted: true,
  },
  number: 0, // Número da página atual
  numberOfElements: 10, // Número de elementos na página atual
  size: 10, // Tamanho da página
};
