import { z } from "zod";
import { RecordIdSchema } from "./core";

export const DepartmentSchema = z.object({
  id: RecordIdSchema,
  name: z.string(),
  managerId: RecordIdSchema,
  manager: z.string(),
  status: z.enum(['Active', 'Inactive']),
});
export type Department = z.infer<typeof DepartmentSchema>;

export async function fetchDepartments() {
  const response = await fetch('/api/departments');
  const jsonData = await response.json();

  const result = await z.array(DepartmentSchema).safeParseAsync(jsonData);
  if (!result.success) {
    console.log("Isses", result.error.issues);
    throw new Error("Invalid data received");
  }
  return result.data;
}
