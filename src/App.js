import './App.css';
import MoviesList from './components/MoviesList';
import configureStoreFunc from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStoreFunc();

function App() {
  return (
    <Provider store={store}>
      <MoviesList/>
    </Provider>
  );
}

export default App;
