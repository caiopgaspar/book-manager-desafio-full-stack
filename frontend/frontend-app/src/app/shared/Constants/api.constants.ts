export const API = {
  BASE_URL: 'http://localhost:8080',

  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register'
  },

  BOOKS: {
    BASE: '/books',
    CREATE: '/books/create',
    BY_ID: (id: number) => `/books/${id}`
  }
};
