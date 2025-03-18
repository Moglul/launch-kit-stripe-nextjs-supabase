'use client';

import { Report, Employee } from '../types';

interface ReportViewProps {
  report: Report;
  employees: Employee[];
}

const ReportView: React.FC<ReportViewProps> = ({ report, employees }) => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Report Details</h2>

      {report.comment_general ? (
        <div className="mb-6">
          <h3 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-2">General Comments</h3>
          <p className="text-slate-900 dark:text-white">{report.comment_general}</p>
        </div>
      ) : (
        <div className="mb-6 text-slate-500 dark:text-slate-400">
          No general comments available for this report.
        </div>
      )}

      {report.weather_conditions && (
        <div className="mb-6">
          <h3 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-2">Weather Conditions</h3>
          <p className="text-slate-600 dark:text-slate-400">{report.weather_conditions}</p>
        </div>
      )}

      {report.challengesEncountered && (
        <div className="mb-6">
          <h3 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-2">Challenges Encountered</h3>
          <p className="text-slate-600 dark:text-slate-400">{report.challengesEncountered}</p>
        </div>
      )}

      {report.safetyIncidents && (
        <div className="mb-6">
          <h3 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-2">Safety Incidents</h3>
          <p className="text-slate-600 dark:text-slate-400">{report.safetyIncidents}</p>
        </div>
      )}

      {report.materials_used && report.materials_used.length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-2">Materials Used</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-2 rounded-tl-md">Material</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Unit</th>
                  <th className="px-4 py-2 rounded-tr-md">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {report.materials_used.map((material, index) => (
                  <tr key={index} className="border-b border-slate-200 dark:border-slate-700">
                    <td className="px-4 py-2 whitespace-nowrap text-slate-900 dark:text-white">
                      {material.name}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-slate-900 dark:text-white">
                      {material.quantity}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-slate-900 dark:text-white">
                      {material.unit}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-slate-900 dark:text-white">
                      {material.remarks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {report.equipment && report.equipment.length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-2">Equipment</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-2 rounded-tl-md">Equipment</th>
                  <th className="px-4 py-2">Quantity Used</th>
                  <th className="px-4 py-2">Quantity Remaining</th>
                  <th className="px-4 py-2 rounded-tr-md">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {report.equipment.map((item, index) => (
                  <tr key={index} className="border-b border-slate-200 dark:border-slate-700">
                    <td className="px-4 py-2 whitespace-nowrap text-slate-900 dark:text-white">
                      {item.name}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-slate-900 dark:text-white">
                      {item.quantityUsed}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-slate-900 dark:text-white">
                      {item.quantityRemaining}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-slate-900 dark:text-white">
                      {item.remarks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {report.workforce && (
        <div className="mb-6">
          <h3 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-2">Workforce</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total Present</p>
              <p className="text-lg font-medium text-slate-900 dark:text-white">{report.workforce.totalPresent}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Hours Worked</p>
              <p className="text-lg font-medium text-slate-900 dark:text-white">{report.workforce.hoursWorked}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Absentees</p>
              <p className="text-lg font-medium text-slate-900 dark:text-white">{report.workforce.absentees}</p>
            </div>
          </div>
        </div>
      )}

      {employees.length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-2">Employees on Site</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-2 rounded-tl-md">Name</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2 rounded-tr-md">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {employees.map((employee) => (
                  <tr key={employee.id} className="border-b border-slate-200 dark:border-slate-700">
                    <td className="px-4 py-2 whitespace-nowrap text-slate-900 dark:text-white">
                      {employee.first_name} {employee.last_name}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-slate-900 dark:text-white">
                      {employee.role}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-slate-900 dark:text-white">
                      {employee.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {report.attachments && report.attachments.length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-2">Attachments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {report.attachments.map((attachment, index) => (
              <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-md p-3 flex items-center">
                <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-md mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {attachment.split('/').pop()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportView;