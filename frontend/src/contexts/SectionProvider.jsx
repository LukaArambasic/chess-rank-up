import React, {createContext, useContext, useEffect, useState} from "react";

const SectionContext = createContext();

export const SectionProvider = ({children}) => {
    const [sectionId, setSectionId] = useState();
    const [sectionRole, setSectionRole] = useState();

    useEffect(() => {
        const id = localStorage.getItem('sectionId');
        console.log("Check if id");
        if (id) setSectionId(id);
    }, []);

    const setSection = (id, role) => {
        localStorage.setItem('sectionId', id);
        setSectionId(id);

        setSectionRole(role);

    }

    return (
        <SectionContext.Provider value={{sectionId, sectionRole, setSection}}>
            {children}
        </SectionContext.Provider>
    );
};

export const useSection = () => useContext(SectionContext);