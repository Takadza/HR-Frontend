import { Button, Card, MenuItem, Select, TextField } from "@mui/material";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { Department, DepartmentSchema } from "../models/department";
import { getErrorMessage, isError } from "../models/error";
import { InlineAlert } from "./InlineAlert";
import { Loading } from "./Loading";
import Menu from "./Menu";
import { Toolbar } from "./Toolbar";
import { fetchManagers } from "../models/employee";

export default function AddEditDepartment() {
  const [details, setDetails] = useState<Department>();

  const query = useQuery('managers', async () => fetchManagers());

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("state", state);
    const result = DepartmentSchema.safeParse(state);
    if (result.success) {
      setDetails(result.data);
    } else {
      console.log("000", result.error.issues);
    }
  }, [state]);

  const { mutateAsync, ...mutation } = useMutation((data: any) => {
    console.log("mutating");
    return fetch(details ? `/api/departments/${details.id}/edit` : '/api/departments/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
  });

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      console.log("onSubmit");
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const baseDetails = {
        name: formData.get("name") || '',
        managerId: formData.get("managerId") || '',
      } 
      const data = details ? {
        ...baseDetails,
        status: formData.get("status") || 'Active',
      } : baseDetails;
      try {
        await mutateAsync(data);
        navigate("/departments");
      } catch (error) {
        window.alert(getErrorMessage(error) || 'Something went wrong');
      }
    },
    [mutateAsync, navigate, details],
  );

  return (
    <div className="h-screen flex flex-col items-stretch gap-2 bg-slate-100">
      <Toolbar />
      <div className="grow flex flex-row justify-start items-stretch px-6 py-2">
        <Menu />
        {query.isLoading && (
          <Loading />
        )}
        {isError(query.error) && (
          <InlineAlert>{query.error.message} </InlineAlert>
        )}
        {query.data && (
          <div className="flex grow flex-col items-start px-6">
            <Card className="min-w-[70%]">
              <div className="flex flex-col items-stretch gap-8 p-6">
                <span className="text-lg font-semibold">
                  {details ? 'Edit Department' : 'Create Department'}
                </span>
                <form onSubmit={onSubmit} className="flex flex-col items-stretch gap-8">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="flex flex-col justify-center">
                      <span>Name</span>
                    </div>
                    <div className="col-span-2 flex flex-col items-stretch">
                      <TextField size="small" name="name" defaultValue={details?.name} label="First Name" variant="outlined" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span>Manager</span>
                    </div>
                    <div className="col-span-2 flex flex-col items-stretch">
                      <Select name="managerId" defaultValue={details?.managerId} size="small">
                        {query.data.map(manager => (
                          <MenuItem key={manager.id} value={manager.id}>
                            {manager.firstName} {manager.lastName}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    {!details && (
                      <input type="hidden" name="status" value="Active" />
                    )}
                    {!!details && (
                      <>
                        <div className="flex flex-col justify-center">
                          <span>Status</span>
                        </div>
                        <div className="col-span-2 flex flex-col items-stretch">
                          <Select name="status" defaultValue={details?.status} size="small">
                            {['-Select-', 'Active', 'Inactive'].map(option => (
                              <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                          </Select>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <div className="grow" />
                    <Button type="submit" disabled={mutation.isLoading} variant="contained">
                      {mutation.isLoading ? 'Saving...' : 'Save'}
                    </Button>
                    <Button disabled={mutation.isLoading} variant="outlined">
                      {mutation.isLoading ? 'Cancelling...' : 'Save'}
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}