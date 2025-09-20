import useStoreData from '../store/storeData';

const Paginator = () => {
  const { total, limit, page, setPage } = useStoreData();
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  return (
    <div className="paginator">
      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i} onClick={() => setPage(i)} className={page === i ? 'active' : ''}>
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Paginator;
