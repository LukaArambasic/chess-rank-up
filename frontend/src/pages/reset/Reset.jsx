import React from "react";
import'./Reset.css';
import TitleContainer from "../../components/titleContainer/TitleContainer";

const Reset = () => {
    return (
        <>
           <div className="container">
                <TitleContainer title={"Resetiraj lozinku"} description={"Postavi svoju novu lozinku"} />

                    <form className="forma" action="">
                        <input className="inputStyle" type="password" placeholder="Unesite novu lozinku" required/>
                        <input className="inputStyle" type="password" placeholder="Potvrdite novu lozinku" required/>
                        <input type="submit" id="submitButton" onClick={()=>{}} value="Resetiraj lozinku"/>
                    </form> 
                </div>
        </>
    );
}

export default Reset;