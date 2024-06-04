import { createContext, useState, useContext } from 'react';

const AppContext = createContext();
export const useUIDContext = () => useContext(AppContext);

const UIDProvider = ({ children }) => {
    const [uid, setUid] = useState(null);
    return (
        <AppContext.Provider value={[uid, setUid]}>
            {children}
        </AppContext.Provider>
    );
}

export default UIDProvider;