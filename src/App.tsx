import { RouterProvider } from 'react-router-dom';
import './App.css';
import '../style.sass';
import router from './router';
import { Provider } from 'react-redux';
import store from './store';
import './theme/styles.sass';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './hooks/useAuth.tsx';

function App() {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </Provider>
    </>
  );
}

export default App;
