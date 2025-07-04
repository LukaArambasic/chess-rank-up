import React from "react";
import TitleContainer from "../../components/titleContainer/TitleContainer";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";

const Admin = () => {
    const nav = useNavigate();
    const timeScales = [
        {id: 1, name: "Događanja", to:"events"},
        {id: 2, name: "Bodovi", to:"points"},
        {id: 3, name: "Članovi", to:"users"},
    ]

    const handleClick = (time) => {
        nav(`${(time.to)}`)
    }
    
    return (
        <>
           <div className="container">
                <TitleContainer title={"Admin"} description={"Odaberi što želiš napraviti"}/>
                
                <div className="buttonList">
                    {timeScales.map(time => (
                        <Button key={time.id} item={time} onClick={handleClick}/>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Admin;