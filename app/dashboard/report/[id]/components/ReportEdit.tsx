'use client';

import { Report, Material, EquipmentItem } from '../types';

interface ReportEditProps {
  editedReport: Partial<Report>;
  isSaving: boolean;
  onSave: () => void;
  handleInputChange: (field: keyof Partial<Report>, value: any) => void;
  handleMaterialChange: (index: number, field: keyof Material, value: string) => void;
  addMaterialRow: () => void;
  handleEquipmentChange: (index: number, field: keyof EquipmentItem, value: string) => void;
  addEquipmentRow: () => void;
  handleWorkforceChange: (field: keyof NonNullable<Report['workforce']>, value: string) => void;
}

const ReportEdit: React.FC<ReportEditProps> = ({
  editedReport,
  isSaving,
  onSave,
  handleInputChange,
  handleMaterialChange,
  addMaterialRow,
  handleEquipmentChange,
  addEquipmentRow,
  handleWorkforceChange
}) => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Edit Report</h2>

      <div className="space-y-6">
        {/* Report Title and Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="report_title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Report Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="report_title"
              value={editedReport.report_title || ''}
              onChange={(e) => handleInputChange('report_title', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="report_date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Report Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="report_date"
              value={editedReport.report_date?.split('T')[0] || ''}
              onChange={(e) => handleInputChange('report_date', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
              required
            />
          </div>
        </div>

        {/* Weather Conditions */}
        <div>
          <label htmlFor="weather_conditions" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Weather Conditions
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">(How did weather impact today's work?)</span>
          </label>
          <textarea
            id="weather_conditions"
            value={editedReport.weather_conditions || ''}
            onChange={(e) => handleInputChange('weather_conditions', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
            placeholder="Describe weather conditions and any impact on work"
          />
        </div>

        {/* General Comments */}
        <div>
          <label htmlFor="comment_general" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            General Comments <span className="text-red-500">*</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">(Overview of today's activities)</span>
          </label>
          <textarea
            id="comment_general"
            value={editedReport.comment_general || ''}
            onChange={(e) => handleInputChange('comment_general', e.target.value)}
            rows={5}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
            placeholder="Provide a general overview of today's work activities"
            required
          />
        </div>

        {/* Challenges Encountered */}
        <div>
          <label htmlFor="challengesEncountered" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Challenges Encountered
          </label>
          <textarea
            id="challengesEncountered"
            value={editedReport.challengesEncountered || ''}
            onChange={(e) => handleInputChange('challengesEncountered', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
            placeholder="Describe any challenges or issues encountered during the day"
          />
        </div>

        {/* Safety Incidents */}
        <div>
          <label htmlFor="safetyIncidents" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Safety Incidents
          </label>
          <textarea
            id="safetyIncidents"
            value={editedReport.safetyIncidents || ''}
            onChange={(e) => handleInputChange('safetyIncidents', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
            placeholder="Document any safety incidents or near-misses"
          />
        </div>

        {/* Materials Used */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Materials Used
            </label>
            <button
              type="button"
              onClick={addMaterialRow}
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              + Add Material
            </button>
          </div>
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-md">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-2">Material</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Unit</th>
                  <th className="px-4 py-2">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {(editedReport.materials_used || []).map((material, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={material.name || ''}
                        onChange={(e) => handleMaterialChange(index, 'name', e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
                        placeholder="Material Name"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={material.quantity || ''}
                        onChange={(e) => handleMaterialChange(index, 'quantity', e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
                        placeholder="Quantity"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={material.unit || ''}
                        onChange={(e) => handleMaterialChange(index, 'unit', e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
                        placeholder="Unit"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={material.remarks || ''}
                        onChange={(e) => handleMaterialChange(index, 'remarks', e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
                        placeholder="Remarks"
                      />
                    </td>
                  </tr>
                ))}
                {(editedReport.materials_used || []).length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-2 text-center text-slate-500 dark:text-slate-400">
                      No materials added. Click "Add Material" to add one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Equipment Information */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Equipment Used
            </label>
            <button
              type="button"
              onClick={addEquipmentRow}
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              + Add Equipment
            </button>
          </div>
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-md">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-2">Equipment</th>
                  <th className="px-4 py-2">Quantity Used</th>
                  <th className="px-4 py-2">Quantity Remaining</th>
                  <th className="px-4 py-2">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {(editedReport.equipment || []).map((equipment, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={equipment.name || ''}
                        onChange={(e) => handleEquipmentChange(index, 'name', e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
                        placeholder="Equipment Name"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={equipment.quantityUsed || ''}
                        onChange={(e) => handleEquipmentChange(index, 'quantityUsed', e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
                        placeholder="Quantity Used"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={equipment.quantityRemaining || ''}
                        onChange={(e) => handleEquipmentChange(index, 'quantityRemaining', e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
                        placeholder="Quantity Remaining"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={equipment.remarks || ''}
                        onChange={(e) => handleEquipmentChange(index, 'remarks', e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
                        placeholder="Remarks"
                      />
                    </td>
                  </tr>
                ))}
                {(editedReport.equipment || []).length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-2 text-center text-slate-500 dark:text-slate-400">
                      No equipment added. Click "Add Equipment" to add one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Workforce Information */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Workforce Information
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="totalPresent" className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                Total Present
              </label>
              <input
                type="text"
                id="totalPresent"
                value={(editedReport.workforce?.totalPresent) || ''}
                onChange={(e) => handleWorkforceChange('totalPresent', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
                placeholder="Number of workers"
              />
            </div>
            <div>
              <label htmlFor="hoursWorked" className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                Hours Worked
              </label>
              <input
                type="text"
                id="hoursWorked"
                value={(editedReport.workforce?.hoursWorked) || ''}
                onChange={(e) => handleWorkforceChange('hoursWorked', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
                placeholder="Average hours"
              />
            </div>
            <div>
              <label htmlFor="absentees" className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                Absentees
              </label>
              <input
                type="text"
                id="absentees"
                value={(editedReport.workforce?.absentees) || ''}
                onChange={(e) => handleWorkforceChange('absentees', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
                placeholder="Number of absent workers"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onSave}
            disabled={isSaving}
            className={`bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-md text-sm transition-colors${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportEdit;