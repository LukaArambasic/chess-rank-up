import React, { useState } from 'react';
import {
    Paper,
    Typography,
    TextField,
    Button,
    Autocomplete,
    Box
} from '@mui/material';
import TitleContainer from '../../../components/titleContainer/TitleContainer';
import { useSection } from '../../../contexts/SectionProvider';
import { useNavigate, useParams } from 'react-router-dom';

const AddAdmin = () => {
    const { id } = useParams(); // section id
    const { sectionId } = useSection();
    const navigate = useNavigate();

    // Dummy members data
    const membersData = [
        { id: 1, name: 'Ivan', surname: 'Horvat', jmbag: '0036530114', email: 'ivan.horvat@example.com' },
        { id: 2, name: 'Ana', surname: 'Kovač', jmbag: '0036530113', email: 'ana.kovac@example.com' },
        { id: 3, name: 'Marko', surname: 'Babić', jmbag: '0036530115', email: 'marko.babic@example.com' },
        { id: 4, name: 'Petra', surname: 'Novak', jmbag: '0036530116', email: 'petra.novak@example.com' }
    ];

    const [selectedMember, setSelectedMember] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        if (selectedMember) {
            console.log('Dodajem voditelja:', selectedMember);
            // TODO: poziv API-ja za dodavanje voditelja
            navigate(-1);
        }
    };

    return (
        <div className="container">
            <TitleContainer
                title="Dodaj voditelja sekcije"
                description="Odaberite člana koji će postati voditelj sekcije"
            />
            <div style={{width: "90%", margin:"10px 0"}}>
                <Box mb={2}>
                    <Autocomplete
                        options={membersData}
                        getOptionLabel={(option) => `${option.surname}, ${option.name} (${option.jmbag})`}
                        filterOptions={(options, { inputValue }) =>
                            options.filter(
                                (o) =>
                                    o.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                                    o.surname.toLowerCase().includes(inputValue.toLowerCase()) ||
                                    o.jmbag.includes(inputValue)
                            )
                        }
                        inputValue={inputValue}
                        onInputChange={(e, value) => setInputValue(value)}
                        value={selectedMember}
                        onChange={(e, value) => setSelectedMember(value)}
                        renderInput={(params) => (
                            <TextField {...params} label="Pretraži člana" variant="outlined" />
                        )}
                        clearOnBlur={false}
                    />
                </Box>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!selectedMember}
                >
                    Dodaj voditelja
                </Button>
            </div>
        </div>
    );
};

export default AddAdmin;
