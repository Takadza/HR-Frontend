import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { isError, useQuery } from "react-query";
import { fetchDepartments } from "../models/department";
import { DepDataContainer } from "./DepDataContainer";
import Fieldset from "./FIeldset";
import { InlineAlert } from "./InlineAlert";
import { Loading } from "./Loading";
import Menu from "./Menu";
import { Toolbar } from "./Toolbar";
import { useCallback, useEffect, useState } from "react";

export default function DepartmentsList() {
  const query = useQuery('departments', async () => fetchDepartments());

  const [filtered, setFiltered] = useState<typeof query.data>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);

  const handleStatusChange = useCallback((e: SelectChangeEvent<string>) => {
    setStatus(e.target.value);
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
          return conditions.every(c => c);
        }));
      }
    },
    [status, query.data],
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
          <span className="text-lg font-semibold">Departments</span>
          <div>
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
                </div>
                <div className="flex flex-col items-end">
                  <Button onClick={filter} variant="contained">Filter</Button>
                </div>
              </div>
            </Fieldset>
          </div>
          {isError(query.error) && (
            <InlineAlert>{query.error.message} </InlineAlert>
          )}
          {query.isLoading && <Loading />}
          {filtered && (
            <DepDataContainer departments={filtered} />
          )}
        </div>
      </div>
    </div>
  )
}