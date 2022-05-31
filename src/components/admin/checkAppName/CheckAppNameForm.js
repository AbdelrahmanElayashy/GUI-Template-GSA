import { useState } from 'react'
import '../../../style/App.css';
import { doAppExists } from '../../../services/azureBlobController';
import { Alert, Button, ButtonGroup, TextField } from '@mui/material';


export default function CheckAppNameForm(props) {
    const [err, setErr] = useState('')
    const [alert, setAlert] = useState(false)

    const handleChange = (event) => {
        const appName = event.target.value
        props.handleChangeAppName(appName)
        doAppExists(appName)
            .then((resolve) => {
                setErr('')
                setAlert(false)
                props.updateValidAppName(true)
            }).catch(reject => {
                props.updateValidAppName(false)
                setErr(reject)
                setAlert(true)
            });
    }

    return (
        <>
            <div style={{ maxWidth: 210, padding: 5 }}>
                <TextField
                    id="outlined"
                    label="App name"
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                {alert ? <Alert severity='error'>{err}</Alert> : null}
            </div>

        </>
    );
}


