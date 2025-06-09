import React, {createContext, useContext, useEffect, useState} from "react";
import api from "../api";

const SectionContext = createContext();

export const SectionProvider = ({children}) => {
    const [sectionId, setSectionId] = useState();
    const [sectionRole, setSectionRole] = useState();
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        const id = localStorage.getItem('sectionId');
        if (id) setSectionId(id);
    }, []);

    const setSection = (id, role) => {
        localStorage.setItem('sectionId', id);
        setSectionId(id);
        setSectionRole(role);

    }

    async function fetchSectionRole(userId) {
        await api.get(`sections/${sectionId}/members/${userId}`)
            .then(response => {
                setSectionRole(response.data.rank==="Superadmin"?"superadmin":response.data.rank==="Kralj"?"admin":"user");
                setRoleLoading(false);
            })
            .catch(error => {
                setRoleLoading(false);
                console.error("Error fetching data: ", error);
            })
    }

    return (
        <SectionContext.Provider value={{sectionId, sectionRole, setSection, fetchSectionRole, roleLoading}}>
            {children}
        </SectionContext.Provider>
    );
};

export const useSection = () => useContext(SectionContext);