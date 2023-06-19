import { useCallback, useEffect, useState } from "react";
import { Employee } from "../models/employee";
import { DebouncedSearch } from "./DebouncedSearch";
import EmployeesDataTable from "./EmployeesDataTable";

interface Props {
  employees: Employee[];
}
export function DataContainer(props: Props) {
  const { employees } = props;

  const [filtered, setFiltered] = useState(employees);

  useEffect(() => {
    setFiltered(employees);
  }, [employees]);

  const filter = useCallback(
    (searchTerms: string) => {
      setFiltered(employees.filter(el => {
        return el.firstName.includes(searchTerms) ||
          el.lastName.includes(searchTerms) ||
          el.manager.includes(searchTerms) ||
          el.phone.includes(searchTerms) ||
          el.status.includes(searchTerms);
      }))
    },
    [employees],
  );

  return (
    <div className="flex flex-col items-stretch gap-2">
      <div className="flex flex-row items-center gap-4">
        <div className="grow" />
        <DebouncedSearch runSearch={filter} placeholder="Search" />
      </div>
      <EmployeesDataTable employees={filtered} />
    </div>
  )
}