import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AlarmIcon from '@mui/icons-material/Alarm';

export default function BasicButtons() {
    return (
        <Stack spacing={2} direction="row">
            <Button variant="text">Text Button</Button>
            <Button variant="contained">Contained Button</Button>
            <Button color="success" size="small" variant="outlined">Outlined Button</Button>
            <IconButton color="secondary" aria-label="add an alarm">
                <AlarmIcon />
            </IconButton>
        </Stack>
    );
}