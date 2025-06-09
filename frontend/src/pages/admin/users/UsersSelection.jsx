import React, {useEffect, useState} from 'react';
import {
    Button, MenuItem, Select, InputLabel, FormControl, Icon, Autocomplete, TextField
} from '@mui/material';
import TitleContainer from '../../../components/titleContainer/TitleContainer';
import {useSection} from "../../../contexts/SectionProvider";
import api from "../../../api";
import InfoAccordion from "../../../components/info-accordion/InfoAccordion";

const UsersSelection = () => {
    const {sectionId} = useSection();
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [uploadError, setUploadError] = useState('');

    useEffect(() => {
        async function fetchData() {
            await api.get(`semesters`)
                .then(response => {
                    const newSemesters = response.data.map(semester => ({
                        ...semester,
                        label: `Semestar ${semester.name}`
                    }))
                    setSemesters(newSemesters);
                })
                .catch(error => {
                    console.log("Error fetching data ", error);
                })
        }

        fetchData();
    }, []);

    const handleSemesterChange = (e) => {
        setSelectedSemester(e.target.value);
        setUploadError('');
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
            setUploadError('');
        }
    };

    const handleSubmit = async () => {
        if (!selectedSemester) {
            setUploadError('Molimo odaberite događaj.');
            return;
        }
        if (!selectedFile) {
            setUploadError('Molimo uploadajte CSV ili TXT file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('semesterId', selectedSemester.id);

        try {
            await api.post(
                `sections/${sectionId}/semesters/selection`,
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
            <TitleContainer title={"Selekcija"} description={"Odaberi studente koji su prošli selekciju"} />

            <InfoAccordion text1={"Ovdje birate studente koji imaju pravo pokušati položiti tjelesni preko\n" +
                "                sekcije za određeni semestar. Odabirom studenti ne polažu predmet\n" +
                "                automatski, već dobivaju priliku."}
                           text2={"Ovdje je potrebno priložiti .txt ili .csv datoteku s JMBAG-om studenata koji su prošli selekciju "}
            />


            <FormControl style={{width: "90%", margin: "10px 0px"}}>
                <Autocomplete
                    slotProps={{
                        popper: {
                            sx: {
                                '& .MuiAutocomplete-option': { fontSize: 16, minHeight: 'unset' },
                            },
                        },
                    }}
                    value={selectedSemester}
                    onChange={(e, newValue) => {setSelectedSemester(newValue);setUploadError('')}}
                    options={semesters}
                    renderInput={(params) => <TextField {...params} label="Odaberi semestar" />}
                />
            </FormControl>

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


export default UsersSelection;
