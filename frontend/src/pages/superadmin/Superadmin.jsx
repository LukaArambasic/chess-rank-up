import React from "react";
import TitleContainer from "../../components/titleContainer/TitleContainer";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";

const Superadmin = () => {
    const nav = useNavigate();
    const timeScales = [
        {id: 1, name: "Sekcije", to:"sections"},
        {id: 2, name: "Semestri", to:"semesters"},
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

export default Superadmin;