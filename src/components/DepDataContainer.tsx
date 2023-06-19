import { useCallback, useEffect, useState } from "react";
import { Department } from "../models/department";
import { DebouncedSearch } from "./DebouncedSearch";
import DepDataTable from "./DepDataTable";

interface Props {
  departments: Department[];
}
export function DepDataContainer(props: Props) {
  const { departments } = props;

  const [filtered, setFiltered] = useState(departments);

  useEffect(() => {
    setFiltered(departments);
  }, [departments]);

  const filter = useCallback(
    (searchTerms: string) => {
      setFiltered(departments.filter(el => {
        return el.name.includes(searchTerms) ||
          el.manager.includes(searchTerms) ||
          el.status.includes(searchTerms);
      }))
    },
    [departments],
  );

  return (
    <div className="flex flex-col items-stretch gap-2">
      <div className="flex flex-row items-center gap-4">
        <div className="grow" />
        <DebouncedSearch runSearch={filter} placeholder="Search" />
      </div>
      <DepDataTable departments={filtered} />
    </div>
  )
}