'use client';
//Redux Provider
import { store } from '../store';
import { Provider } from 'react-redux';
//Persist
import { PersistGate } from 'redux-persist/integration/react'; // Asegúrate de importar PersistGate
import { persistor } from '../store';

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
