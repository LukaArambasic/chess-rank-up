import React from "react";
import { useNavigate } from "react-router-dom";
import TitleContainer from "../../../components/titleContainer/TitleContainer";
import Button from "../../../components/button/Button";

const PointsOptions = () => {
    const nav = useNavigate();
    const timeScales = [
        {id: 1, name: "Manualno", to:"manual"},
        {id: 2, name: "Automatski", to:"automatic"},
    ]

    const handleClick = (time) => {
        nav(`${(time.to)}`)
    }

    return (
        <>
            <div className="container">
                <TitleContainer title={"Bodovi"} description={"Odaberi kako želiš dodati bodove studentima"}/>

                <div className="buttonList">
                    {timeScales.map(time => (
                        <Button key={time.id} item={time} onClick={handleClick}/>
                    ))}
                </div>
            </div>
        </>
    );
}

export default PointsOptions;