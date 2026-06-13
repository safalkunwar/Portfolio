import { Route, Switch } from 'wouter';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
