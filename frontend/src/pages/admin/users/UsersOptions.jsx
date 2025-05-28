import React from "react";
import { useNavigate } from "react-router-dom";
import TitleContainer from "../../../components/titleContainer/TitleContainer";
import Button from "../../../components/button/Button";

const UsersOptions = () => {
    const nav = useNavigate();
    const timeScales = [
        {id: 1, name: "Svi članovi", to:"all"},
        {id: 2, name: "Dodjela prolaza", to:"pass"},
    ]

    const handleClick = (time) => {
        nav(`${(time.to)}`)
    }

    return (
        <>
            <div className="container">
                <TitleContainer title={"Studenti"} description={"Pogledaj listu ili dodijeli prolaz"}/>

                <div className="buttonList">
                    {timeScales.map(time => (
                        <Button key={time.id} item={time} onClick={handleClick}/>
                    ))}
                </div>
            </div>
        </>
    );
}

export default UsersOptions;