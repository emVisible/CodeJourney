export default () => ({
  app: {
    name: 'cms',
    isDev: process.env.MODE == 'development',
  },
})