import React, { useEffect, useState } from "react";
import Grid from "../components/Grid";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
} from "@mui/material";

export default function GetUser() {
  const [users, setUsers] = useState([]);
  const [row, setRow] = useState();
  const [dialogShowing, setDialogShowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleDialogOpen = (row) => {
    setDialogShowing(true);
    console.log(row);
    setRow(row);
  };
  const handleDialogClose = () => {
    setDialogShowing(false);
  };
  const userFetch = async () => {
    const res = await fetch("/users");
    const body = await res.json().then((data) => {
      setUsers(data);
    });
  };
  const userEdit = async (item, id) => {
    console.log("updating")
    const res = await fetch("/users/" + id.toString(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    console.log(res)

  };
  useEffect(() => {
    userFetch();
  }, []);
  useEffect(() => {
    setLoading(false);
  }, [users]);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid DialogOpen={handleDialogOpen} list={users} />
      )}
      <Dialog
        open={dialogShowing}
        onClose={handleDialogClose}
        PaperProps={{
          component: "form",

          onSubmit: (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const user = formJson.user;
            const pass = formJson.pass;
            console.log(user);
            console.log(pass);
            const item = { user: user, pass: pass,id:row.id};
            userEdit(item, row.id);
            handleDialogClose();
            window.location.reload();
          }
        }}
      >
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <DialogContent>
            <TextField
              margin="dense"
              id="user"
              name="user"
              label="User"
              type="text"
            />
            <TextField
              margin="dense"
              id="pass"
              name="pass"
              label="pass"
              type="text"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
