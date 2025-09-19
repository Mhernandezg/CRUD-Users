import './styles/main.scss';
import useFetchUsers from './hooks/useFetchUsers';
import useStoreData from './store/storeData';
import Header from './components/Header';
import UserTable from './components/table/UserTable';

function App() {
  useFetchUsers();
  const { users, loading, error } = useStoreData();
  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(users);
  return (
    <>
      <Header />
      <UserTable />
    </>
  );
}

export default App;
