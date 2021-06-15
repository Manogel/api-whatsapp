export const getAsyncAppConfig = () => {
  return {
    appname: process.env.APP_NAME || 'appname',
    env: process.env.NODE_ENV,
    isDev: process.env.NODE_ENV === 'development',
    isTest: process.env.NODE_ENV === 'test',
    port: Number(process.env.PORT) || 3636,
  };
};

const appConfig = getAsyncAppConfig();

export default appConfig;
