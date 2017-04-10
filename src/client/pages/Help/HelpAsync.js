import path from 'path';
import Loadable from 'react-loadable/lib';

export default Loadable({
  loader: () => import('./index'),
  LoadingComponent: () => null,
  serverSideRequirePath: path.join(__dirname, './index'),
  webpackRequireWeakId: () => require.resolveWeak('./index')
});
