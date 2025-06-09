import React from "react";
import "./RankOrder.css";

const RankOrder = ({mjesto, place}) => {
    const style = {
        backgroundColor: place<=3 ? "#7F61BA":"white",
        color: place<=3 ? "white":"black",
        marginTop: "8px",
        border: place<=3 ? "solid black 1px" : "solid #7F61BA 1px"
    }
    const style2 = {
        color: place<=3 ? "white":"#7F61BA",
    }
    return (
            <div className='mjesto' style={style}>
                <div className='maleniM1'>{place}.</div>
                <div className='maleniM2'>{mjesto.firstName} {mjesto.lastName}</div>
                <div className='maleniM3' style={style2}>{mjesto.points}</div>
            </div>
    );
}

export default RankOrder;