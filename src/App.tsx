import { RouterProvider } from 'react-router-dom';
import './App.css';
import '../style.sass';
import router from './router';
import { Provider } from 'react-redux';
import store from './store';
import './theme/styles.sass';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
