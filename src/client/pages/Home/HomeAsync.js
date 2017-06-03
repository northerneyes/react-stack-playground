import path from 'path';
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  LoadingComponent: () => null,
  serverSideRequirePath: path.join(__dirname, './index'),
  webpackRequireWeakId: () => require.resolveWeak('./index'),
});
