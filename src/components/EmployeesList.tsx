import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { isError, useQuery } from "react-query";
import { fetchDepartments } from "../models/department";
import { fetchEmployees, fetchManagers } from "../models/employee";
import { DataContainer } from "./DataContainer";
import Fieldset from "./FIeldset";
import { InlineAlert } from "./InlineAlert";
import { Loading } from "./Loading";
import Menu from "./Menu";
import { Toolbar } from "./Toolbar";

export default function EmployeesList() {
  const query = useQuery('employees', async () => fetchEmployees());
  const depQuery = useQuery('departments', async () => fetchDepartments());
  const manQuery = useQuery('managers', async () => fetchManagers());

  const [filtered, setFiltered] = useState<typeof query.data>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [depId, setDepId] = useState<number | undefined>(undefined);
  const [managerId, setManagerId] = useState<number | undefined>(undefined);

  const handleStatusChange = useCallback((e: SelectChangeEvent<string>) => {
    setStatus(e.target.value);
  }, []);
  const handleDepChnage = useCallback((e: SelectChangeEvent<string>) => {
    const newValue = e.target.value;
    if (newValue) {
      setDepId(Number(newValue));
    } else {
      setDepId(undefined);
    }
  }, []);
  const handleManagerChnage = useCallback((e: SelectChangeEvent<string>) => {
    const newValue = e.target.value;
    if (newValue) {
      setManagerId(Number(newValue));
    } else {
      setManagerId(undefined);
    }
  }, []);

  useEffect(() => {
    if (query.data) {
      setFiltered(query.data);
    }
  }, [query.data]);

  const filter = useCallback(
    () => {
      if (query.data) {
        setFiltered(query.data.filter(el => {
          const conditions: boolean[] = [true];
          if (status) {
            conditions.push(el.status === status);
          }
          if (depId) {
            conditions.push(el.depId === depId);
          }
          if (managerId) {
            conditions.push(el.managerId === managerId);
          }
          return conditions.every(c => c);
        }));
      }
    },
    [status, query.data, depId, managerId],
  );

  const statusOptions = [
    { label: 'Active Only', value: 'Active' },
    { label: 'All', value: undefined },
    { label: 'Deactive Only', value: 'Inactive' }
  ];

  return (
    <div className="h-screen flex flex-col items-stretch gap-2 bg-slate-100">
      <Toolbar />
      <div className="grow flex flex-row justify-start items-stretch px-6 py-2">
        <Menu />
        <div className="flex grow flex-col items-stretch gap-4 px-6">
          <span className="text-lg font-semibold">Employees</span>
          <div>
            {(depQuery.isLoading || manQuery.isLoading) && <Loading />}
            {isError(depQuery.error) && (
              <InlineAlert>{depQuery.error.message} </InlineAlert>
            )}
            {isError(manQuery.error) && (
              <InlineAlert>{manQuery.error.message} </InlineAlert>
            )}
            {(!!depQuery.data && !!manQuery.data) && (
              <Fieldset title="Filters" className="flex flex-col items-center">
                <div className="flex flex-col items-stretch gap-2 min-w-[50%]">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-stretch justify-center">
                      <span>Status</span>
                    </div>
                    <div className="col-span-2 flex flex-col items-stretch">
                      <Select name="status" size="small" value={status} onChange={handleStatusChange}>
                        {statusOptions.map(option => (
                          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-col items-stretch justify-center">
                      <span>Department</span>
                    </div>
                    <div className="col-span-2 flex flex-col items-stretch">
                      <Select name="status" size="small" onChange={handleDepChnage}>
                        <MenuItem key={'zxc'} value={undefined}>-Select-</MenuItem>
                        {depQuery.data.map(department => (
                          <MenuItem key={department.id} value={department.id}>{department.name}</MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-col items-stretch justify-center">
                      <span>Manager</span>
                    </div>
                    <div className="col-span-2 flex flex-col items-stretch">
                      <Select name="status" size="small" onChange={handleManagerChnage}>
                      <MenuItem key={'zxc'} value={undefined}>-Select-</MenuItem>
                        {manQuery.data.map(manager => (
                          <MenuItem key={manager.id} value={manager.id}>{manager.firstName} {manager.lastName}</MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Button onClick={filter} variant="contained">Filter</Button>
                  </div>
                </div>
              </Fieldset>
            )}
          </div>
          {isError(query.error) && (
            <InlineAlert>{query.error.message} </InlineAlert>
          )}
          {query.isLoading && <Loading />}
          {filtered && (
            <DataContainer employees={filtered} />
          )}
        </div>
      </div>
    </div>
  )
}