import React, {createContext, ReactNode, useEffect, useState} from "react";

interface User {
  avatarUrl?: string;
  username: string;
  email: string;
  password: string;
  bio?: string;
  favoriteFilms?: { title: string, posterUrl: string }[];
}

interface UserContextProps {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (username: string, email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  addFavoriteFilm: (title: string, posterUrl: string) => void;
  removeFavoriteFilm: (title: string) => void;
  isFilmInFavorites: (title: string) => boolean;
  updateUser: (updatedUser: User) => void;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/src/data/usersData.json');
      if (!response.ok) throw new Error('Failed to fetch user data');
      const data = await response.json();
      const users: User[] = data.users;
      const fetchedUser = users.find(
        (u) => u.email === email && u.password === password
      );
      if (fetchedUser) {
        setUser(fetchedUser);
        localStorage.setItem("user", JSON.stringify(fetchedUser));
      } else {
        throw new Error('Невірний email або пароль');
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch('/src/data/usersData.json');
      if (!response.ok) throw new Error('Failed to fetch user data');
      const data = await response.json();
      const users: User[] = data.users;

      if (users.some((u) => u.email === email)) {
        throw new Error('Email is already registered');
      }

      const newUser: User = {username, email, password};

      await fetch('/src/data/usersData.json', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({users: [...users, newUser]}),
      });

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isLoggedIn = () => {
    return user !== null;
  };

  const addFavoriteFilm = (title: string, posterUrl: string) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      favoriteFilms: [...(user.favoriteFilms || []), {title, posterUrl}],
    };

    updateUser(updatedUser);
  };

  const removeFavoriteFilm = (filmTitle: string) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      favoriteFilms: user.favoriteFilms?.filter((film) => film.title !== filmTitle) || [],
    };

    updateUser(updatedUser);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const isFilmInFavorites = (filmTitle: string): boolean => {
    if (!user || !user.favoriteFilms) return false;
    return user.favoriteFilms.some((film) => film.title === filmTitle);
  };

  return (
    <UserContext.Provider
      value={{user, login, register, logout, isLoggedIn, addFavoriteFilm, removeFavoriteFilm, isFilmInFavorites, updateUser}}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;