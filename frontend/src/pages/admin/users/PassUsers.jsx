import React, {useEffect, useState} from 'react';
import TitleContainer from "../../../components/titleContainer/TitleContainer";
import {Autocomplete, Button, FormControl, FormHelperText, Input, InputLabel, TextField} from "@mui/material";
import api from "../../../api";
import {useSection} from "../../../contexts/SectionProvider";
import InfoAccordion from "../../../components/info-accordion/InfoAccordion";

const PassUsers = () => {
    const { sectionId } = useSection();

    const [members,  setMembers]  = useState([]);
    const [threshold, setThreshold]  = useState(1000);
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(null);

    useEffect(()=>{
        async function fetchData() {
            await api.get('semesters')
                .then(response => {
                    response.data.sort((a,b)=>b.dateTo-a.dateTo);
                    const semesters = response.data.map(semester => {
                        return {
                            ...semester,
                            label: semester.name,
                        }
                    })
                    setSemesters(semesters);
                })
                .catch(error => {
                    console.error("Error fetching data: ", error);
                })
        }
        fetchData();

    },[]);

    const handleCalculate = async () => {
        await api.get(`sections/${sectionId}/participations/pass/${threshold}/semester/${selectedSemester.id}`)
            .then(response => {
                console.log(response.data);
                setMembers(response.data);
            })
            .catch(error => {
                console.error("Error calculating data: ", error);
            })

    }

    const saveExcel = () => {
        const plainText = members.map(member => "'"+member.jmbag).join('\n');
        const blob = new Blob([plainText], {type: 'text/csv;charset=utf-8'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "Prolaz.xlsx";
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <div className='container'>
            <TitleContainer title={"Prag za prolaz"} description={"Dohvati popis studenata koji imaju dovoljno bodova"} />

            <InfoAccordion
                text1={"Ovdje dobivate popis svih studenata koji su skupili dovoljno bodova u semestru koji odaberete. Dodavanje bodova možete napraviti na stranici za bodove."}
                text2={"Prag birate sami i potpuno je proizvoljan. "}
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
                    onChange={(e, newValue) => setSelectedSemester(newValue)}
                    options={semesters}
                    renderInput={(params) => <TextField {...params} label="Odaberi semestar" />}
                />
            </FormControl>

            <FormControl style={{width: "90%", margin: "10px 0px"}}>
                <InputLabel id="threshold-label">Odaberi prag</InputLabel>
                <Input id="threshold-input" variant="outlined" value={threshold} onChange={(e) => {
                    if (parseInt(e.target.value)) {
                        setThreshold(parseInt(e.target.value));
                    } else {
                        setThreshold(0);
                    }
                }}/>
                <FormHelperText>Broj bodova potrebnih za prolaz</FormHelperText>
            </FormControl>

            <Button
                variant="contained"
                color="primary"
                style={{ width: "90%", margin: "10px 0" }}
                onClick={handleCalculate}
            >
                Izračunaj
            </Button>

            {members && members.length>0 && (
                <>
                    <br/>
                    <br/>
                    <div>
                        Broj osoba koje su prošle: {members.length}
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ width: "90%", margin: "10px 0" }}
                        onClick={saveExcel}
                    >
                        Preuzmi excel tablicu
                    </Button>
                </>
            )}
        </div>
    );
};

export default PassUsers;