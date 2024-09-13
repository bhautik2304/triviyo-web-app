export const serverUrl = (url) => {
  return `${process.env.NEXT_PUBLIC_API_DOMAIN}${url}`;
};
export const siteUrl = (url) => {
  return `${process.env.NEXT_PUBLIC_APP_DOMAIN}${url}`;
};
