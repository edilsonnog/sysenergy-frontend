import { createContext, useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

interface AuthContextState {
    token: TokenState;
    signIn({ username, password }: UserData): Promise<void>;
    userLogged(): boolean;
    signOut(): void;
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
    const [token, setToken] = useState<TokenState>(() => {
        const token = localStorage.getItem('@SysEnergy:token');
        if (token) {
            api.defaults.headers.authorization = `Bearer ${token}`;
            return { token }
        }
        return {} as TokenState;
    });

    const signOut = useCallback(() => {
        localStorage.removeItem('@SysEnergy:token');
        localStorage.removeItem('@SGP:user');
    
        setToken({} as TokenState);
      }, []);

    const signIn = useCallback(async ({ username, password }: UserData) => {
        try {
            const response = await api.post("/sessions", { username, password });
            const { token } = response.data;
            const { user } = response.data;
            const { state } = user;
            if (state === 'Ativo') {
                const { name } = user;
                localStorage.setItem('@SGP:user', name)
                setToken(token);
                localStorage.setItem("@SysEnergy:token", token);
                api.defaults.headers.authorization = `Bearer ${token}`;
            } else {
                toast.error('Usuario Inátivo favor procurar a Administração!')
            }
        } catch (error) {
            toast.error('Usuario e/ou senha inválidos!')
        }

    }, []);

    const userLogged = useCallback(() => {
        const token = localStorage.getItem('@SysEnergy:token');
        if (token) {
            return true;
        }
        return false;
    }, [])

    return (
        <AuthContext.Provider value={{ token, signIn, userLogged, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextState {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };