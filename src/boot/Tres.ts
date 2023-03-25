import { boot } from 'quasar/wrappers';
import Tres from '@tresjs/core';

export default boot(({ app }) => {
  app.use(Tres);
});
