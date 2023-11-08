import { Slider, TextField, Select, InputLabel, FormControl, MenuItem, Box } from "@mui/material";
import { useState } from "react";

export default function FormDemo() {
    const [name, setName] = useState("");
    const [volume, setVolume] = useState(50);
    const [age, setAge] = useState(30);

    const updateName = (evt) => {
        setName(evt.target.value);
    }

    const updateVolume = (evt) => {
        setVolume(evt.target.value);
    }

    const updateAge = (evt) => {
        setAge(evt.target.value);
    }

    return (
        <Box sx={{ border: '1px solid black', p: 6 }}>
            <h3>Name is {name}</h3>
            <TextField id="outlined-basic" label="Puppy Name" variant="outlined" placeholder="Puppy Name" value={name} onChange={updateName} />
            <h3>Volume is at {volume}</h3>
            <Slider aria-label="Volume" value={volume} onChange={updateVolume} />
            <h3>Age selected: {age}</h3>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={updateAge}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}