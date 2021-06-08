import { createContext, useCallback, useContext, useState } from "react";
import api from "../services/api";

interface AuthContextState {
    token: TokenState;
    signIn({ username, password }: UserData): Promise<void>;
    userLogged(): boolean;
    user: string;
}

interface UserData {
    username: string;
    password: string;
}

interface TokenState {
    token: string;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children }) => {
    const [ user, setUser ] = useState('')
    const [token, setToken] = useState<TokenState>(() => {
        const token = localStorage.getItem('@SysEnergy:token');
        if (token) {
            api.defaults.headers.authorization = `Bearer ${token}`;
            return { token }
        }
        return {} as TokenState;
    });
    const signIn = useCallback(async ({ username, password }: UserData) => {
        const response = await api.post("/sessions", { username, password });
        const { token } = response.data;
        const { user } = response.data;
        const { name } = user;
        setUser(name)
        setToken(token);
        localStorage.setItem("@SysEnergy:token", token);
        api.defaults.headers.authorization = `Bearer ${token}`;
    }, []);

    const userLogged = useCallback(() => {
        const token = localStorage.getItem('@SysEnergy:token');
        if (token) {
            return true;
        }
        return false;
    }, [])

    return (
        <AuthContext.Provider value={{ token, signIn, userLogged, user }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextState {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };