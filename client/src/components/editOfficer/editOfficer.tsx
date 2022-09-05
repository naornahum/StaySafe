import { DialogTitle, TextField, DialogContent, Button, DialogActions } from "@mui/material";
import { useState } from "react";

const EditOfficer = (props: any) => {
  const { data, setIsEdit, endpoint, edifOfficer } = props;
  const [name, setName] = useState<any>(null);
  const [phone, setPhone] = useState<any>(null);
  const [email, setEmail] = useState<any>(null);

  return (
    <>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <TextField
          id="name"
          label="Name"
          defaultValue={data.name}
          variant="standard"
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          id="phone"
          label="Phone"
          defaultValue={data.phone}
          variant="standard"
          onChange={(event) => setPhone(event.target.value)}
        />
        <TextField
          id="email"
          label="Email"
          defaultValue={data.email}
          variant="standard"
          onChange={(event) => setEmail(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() =>
            edifOfficer(data.officer_id, {
              name: name || data.name,
              phone: phone || data.phone,
              email: email || data.email,
            })
          }
        >
          Save
        </Button>
        <Button onClick={() => setIsEdit(false)}>Cancel</Button>
      </DialogActions>
    </>
  );
};
export default EditOfficer;
