import { z } from "zod";
import { RecordIdSchema } from "./core";

export const EmployeeSchema = z.object({
  id: RecordIdSchema,
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  email: z.string().email(),
  managerId: RecordIdSchema,
  manager: z.string(),
  status: z.enum(['Active', 'Inactive']),
  depId: z.number().optional(),
  depName: z.string().optional(),
});
export type Employee = z.infer<typeof EmployeeSchema>;

export const ManagerSchema = z.object({
  id: RecordIdSchema,
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  phone: z.string().min(6),
  email: z.string().email(),
  status: z.enum(['Active', 'Inactive']),
});
export type Manager = z.infer<typeof ManagerSchema>;

export async function fetchEmployees() {
  const response = await fetch('/api/employees');
  const jsonData = await response.json();

  const result = await z.array(EmployeeSchema).safeParseAsync(jsonData);
  if (!result.success) {
    console.log("Isses", result.error.issues);
    throw new Error("Invalid data received");
  }
  return result.data;
}

export async function fetchManagers() {
  const response = await fetch('/api/managers');
  const jsonData = await response.json();

  const result = await z.array(ManagerSchema).safeParseAsync(jsonData);
  if (!result.success) {
    console.log("Isses", result.error.issues);
    throw new Error("Invalid data received");
  }
  return result.data;
}