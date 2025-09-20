import './styles/main.scss';
import useStoreData from './store/storeData';
import Header from './components/Header';
import UserTable from './components/UserTable';
import usePaginatorUsers from './hooks/usePaginatorUsers';
import Paginator from './components/Paginator';

function App() {
  const { page, limit } = useStoreData();
  usePaginatorUsers(page, limit);
  return (
    <>
      <Header />
      <UserTable />
      <Paginator />
    </>
  );
}

export default App;
