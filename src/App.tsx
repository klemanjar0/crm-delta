import { RouterProvider } from 'react-router-dom';
import './App.css';
import '../style.sass';
import router from './router';
import { Provider } from 'react-redux';
import store from './store';
import './theme/styles.sass';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
