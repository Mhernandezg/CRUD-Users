import { create } from 'zustand';

const useStoreData = create((set) => ({
  users: [],
  loading: false,
  error: null,
  selectedUser: null,

  setUsers: (users) => set({ users }),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  selectUser: (user) => set({ selectedUser: user }),
  clearSelectedUser: () => set({ selectedUser: null }),

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),

  updateUser: (updatedUser) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),
}));

export default useStoreData;
