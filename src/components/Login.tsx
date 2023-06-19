import { Button, TextField } from "@mui/material";
import { FormEvent, useCallback } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { getErrorMessage, isError } from "../models/error";
import Fieldset from "./FIeldset";
import { InlineAlert } from "./InlineAlert";

export default function Login() {
  const navigate = useNavigate();

  const { mutateAsync, ...mutation } = useMutation(async (data: any) => {
    console.log("mutating");
    const response = await fetch(`/api/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    const payload: {
      success?: boolean;
      message?: string;
    } = await response.json();

    if (payload.message) {
      throw new Error(payload.message);
    }
  });

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      console.log("onSubmit");
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const baseDetails = {
        username: formData.get("username") || '',
        password: formData.get("password") || '',
      }
      try {
        await mutateAsync(baseDetails);
        navigate("/employees");
      } catch (error) {
        console.log(getErrorMessage(error) || 'Something went wrong');
      }
    },
    [mutateAsync, navigate],
  );

  return (
    <div className="h-full flex flex-col justify-center items-center p-6">
      <Fieldset title="Login">
        <legend>Login</legend>
        <form onSubmit={onSubmit} className="flex flex-col items-stretch gap-8">
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">Enter Your Credentials</span>
          </div>
          <TextField name="username" label="Username" variant="outlined" />
          <TextField type="password" name="password" label="Password" variant="outlined" />
          {isError(mutation.error) && (
            <InlineAlert>{mutation.error.message} </InlineAlert>
          )}
          <Button type="submit" variant="contained" disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Logging In...' : 'Login'}
          </Button>
        </form>
      </Fieldset>
    </div>
  );
}