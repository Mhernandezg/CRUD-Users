import { create } from 'zustand';

const useStoreData = create((set) => ({
  users: [],
  userDetails: {},
  loading: false,
  loadingTable: false,
  errorTable: null,
  error: null,
  selectedUser: null,
  total: 0,
  page: 0,
  limit: 5,

  setTotal: (total) => set({ total }),
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),

  setUsers: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setLoadingTable: (loadingTable) => set({ loadingTable }),
  setErrorTable: (errorTable) => set({ errorTable }),

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),

  updateUser: (updatedUser) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
      userDetails: {
        ...state.userDetails,
        [updatedUser.id]: updatedUser,
      },
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
      userDetails: Object.fromEntries(
        Object.entries(state.userDetails).filter(([key]) => key !== id)
      ),
    })),

  setUserDetail: (user) =>
    set((state) => {
      if (state.userDetails[user.id]) return state;
      return { userDetails: { ...state.userDetails, [user.id]: user } };
    }),
}));

export default useStoreData;
