'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase';

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

interface EmployeeListProps {
  initialEmployees: Employee[];
  onEmployeeAdded: (employee: Employee) => void;
  companyId: string;
}

export function EmployeeList({ initialEmployees, onEmployeeAdded, companyId }: EmployeeListProps) {
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [newEmployee, setNewEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    role: ''
  });
  const [isEmployeeSubmitting, setIsEmployeeSubmitting] = useState(false);

  const handleAddEmployee = async () => {
    setIsEmployeeSubmitting(true);
    try {
      if (!newEmployee.first_name || !newEmployee.last_name) {
        throw new Error('first and last name are required');
      }

      const { data: employeeData, error: employeeError } = await supabase
        .from('employees')
        .insert([{
          first_name: newEmployee.first_name,
          last_name: newEmployee.last_name,
          email: newEmployee.email,
          role: newEmployee.role,
          company_id: companyId
        }])
        .select()
        .single();

      if (employeeError) {
        throw new Error(`Employee creation failed: ${employeeError.message}`);
      }

      setEmployees([employeeData, ...employees]);
      onEmployeeAdded(employeeData);
      setIsEmployeeModalOpen(false);
      setNewEmployee({ first_name: '', last_name: '', email: '', role: '' });
    } catch (error) {
      console.error('Error adding employee:', error);
      alert(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsEmployeeSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Employees
          </h3>
          <button
            onClick={() => setIsEmployeeModalOpen(true)}
            className="bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-md text-sm transition-colors"
          >
            Add Employee
          </button>
        </div>
      </div>
      <table className="w-full">
        <thead className="bg-slate-50 dark:bg-slate-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              First Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Last Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Role
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                {employee.first_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                {employee.last_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                {employee.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                {employee.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEmployeeModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Add New Employee</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={newEmployee.first_name}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, first_name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={newEmployee.last_name}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, last_name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role (optional)
                </label>
                <input
                  type="text"
                  value={newEmployee.role}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, role: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  placeholder="Enter role"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsEmployeeModalOpen(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEmployee}
                disabled={isEmployeeSubmitting}
                className="bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-md text-sm transition-colors disabled:opacity-50"
              >
                {isEmployeeSubmitting ? 'Adding...' : 'Add Employee'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}