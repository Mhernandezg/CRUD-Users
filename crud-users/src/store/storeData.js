import { create } from 'zustand';

const useStoreData = create((set) => ({
  users: [],
  userDetails: {},
  loading: false,
  error: null,
  selectedUser: null,

  setUsers: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

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
