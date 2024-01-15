import {
  Card,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormGroup,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    const item = { user: user, pass: pass };
    const res = await fetch("/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then(navigate("/"));
    console.log(res);
  };
  return (
    <Card width="70%">
      <FormControl>
        <FormGroup>
          <FormLabel htmlFor="user">Username</FormLabel>
          <TextField
            onChange={(e) => {
              setUser(e.target.value);
            }}
            id="user"
            variant="filled"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="pass">Password</FormLabel>
          <TextField
            id="pass"
            onChange={(e) => {
              setPass(e.target.value);
            }}
            variant="filled"
          />
        </FormGroup>
        <Button type="submit" onClick={submit}>
          Submit
        </Button>
      </FormControl>
    </Card>
  );
}
