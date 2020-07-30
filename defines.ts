export const API_URL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL : 'http://localhost';
export const SERVER_URL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

const DEFINES = {
  API_URL,
  SERVER_URL,
};

export default DEFINES;
