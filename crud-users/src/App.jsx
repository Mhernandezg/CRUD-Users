import './styles/main.scss';
import useFetchUsers from './hooks/useFetchUsers';
import Header from './components/Header';
import UserTable from './components/UserTable';

function App() {
  useFetchUsers();
  return (
    <>
      <Header />
      <UserTable />
    </>
  );
}

export default App;
