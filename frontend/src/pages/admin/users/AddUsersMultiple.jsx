import React, {useEffect, useState} from 'react';
import { Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import TitleContainer from '../../../components/titleContainer/TitleContainer';
import {useSection} from "../../../contexts/SectionProvider";
import api from "../../../api";
import InfoAccordion from "../../../components/info-accordion/InfoAccordion";

const AddUsersMultiple = () => {
    const {sectionId} = useSection();
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [uploadError, setUploadError] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
            setUploadError('');
        }
    };

    const handleSubmit = async () => {

        if (!selectedFile) {
            setUploadError('Molimo uploadajte CSV ili TXT file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        console.log(selectedFile);

        try {
            await api.post(
                `members/many`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            // uspjeh
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadError('Došlo je do pogreške pri uploadu.');
        }
    };


    return (
        <div className='container'>
            <TitleContainer title={"Dodavanje korisnika"} description={"Unesi nove korisnike automatski"} />

            <InfoAccordion
                text1={"Stranica za automatski unos bodova. Ovdje je potrebno odabrati događanje i datoteku tipa .txt ili .csv s JMBAG-om svih studenata koji su bili prisutni na tom događanju."}
                text2={"Aplikacija 'QR Skener' pamti što je skenirala. Iz nje možete preuzeti .txt i .csv datoteke.  "}
            />

            <FormControl style={{width:"90%", margin: "10px 0px"}}>
                <Button variant="outlined" component="label">
                    Upload file
                    <input type="file" hidden onChange={handleFileChange}/>
                </Button>
            </FormControl>
            <div style={{alignSelf: "start", padding:"0 10%"}}>
                {fileName && (
                    <>"{fileName}" učitan</>
                )}
            </div>

            <div style={{alignSelf: "start", padding:"0 10%", color: "darkred"}}>
                {uploadError}
            </div>

            <Button variant="contained" color="primary" style={{width:"90%", margin: "10px 0px"}} onClick={handleSubmit}>Submit</Button>
        </div>
    );
};

export default AddUsersMultiple;
