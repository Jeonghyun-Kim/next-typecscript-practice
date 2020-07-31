declare module 'next-translate/useTranslation' {
  const useTranslation: () => {
    t: any;
    lang: any;
  };
  export default useTranslation;
}

declare module 'next-translate/Link' {
  const Link: any;
  export default Link;
}
