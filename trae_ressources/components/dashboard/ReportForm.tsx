
import React, { useState } from 'react';
import VoiceRecorder from './VoiceRecorder';
import { Mic, AlertTriangle, Truck, Users } from 'lucide-react';
import { toast } from '@/components/use-toast';

type ReportFormProps = {
  projectId: string;
  onSave: () => void;
};

const ReportForm: React.FC<ReportFormProps> = ({ projectId, onSave }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    generalOverview: '',
    challengesEncountered: '',
    safetyIncidents: '',
    equipment: [
      { name: '', quantityUsed: '', quantityRemaining: '', remarks: '' }
    ],
    workforce: {
      totalPresent: '',
      hoursWorked: '',
      absentees: ''
    }
  });

  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    // Simulate AI generating a report
    setTimeout(() => {
      setFormData({
        generalOverview: 'Today we continued work on the foundation. The concrete pour was completed on schedule and weather conditions were favorable.',
        challengesEncountered: 'There was a delay in the morning due to a late material delivery, but we were able to make up time in the afternoon.',
        safetyIncidents: 'No safety incidents reported today.',
        equipment: [
          { name: 'Concrete Mixer', quantityUsed: '1', quantityRemaining: '1', remarks: 'Working properly' },
          { name: 'Shovels', quantityUsed: '8', quantityRemaining: '12', remarks: 'Two need replacement' },
          { name: 'Safety Helmets', quantityUsed: '15', quantityRemaining: '10', remarks: 'All in good condition' }
        ],
        workforce: {
          totalPresent: '15',
          hoursWorked: '8',
          absentees: '2'
        }
      });
      
      setIsGenerating(false);
      toast({
        title: "Report generated",
        description: "AI has completed generating your report. Please review and make any necessary changes.",
      });
      
      // Save the generated report
      onSave();
    }, 3000);
  };

  const handleTextChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEquipmentChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newEquipment = [...prev.equipment];
      newEquipment[index] = {
        ...newEquipment[index],
        [field]: value
      };
      return {
        ...prev,
        equipment: newEquipment
      };
    });
  };

  const addEquipmentRow = () => {
    setFormData(prev => ({
      ...prev,
      equipment: [
        ...prev.equipment,
        { name: '', quantityUsed: '', quantityRemaining: '', remarks: '' }
      ]
    }));
  };

  const handleWorkforceChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      workforce: {
        ...prev.workforce,
        [field]: value
      }
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Voice Notes Card */}
      <div className="bg-white rounded-lg shadow-sm border border-construction-200 p-5">
        <div className="flex items-center mb-4">
          <Mic className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-lg font-semibold text-construction-800">Voice Notes</h2>
        </div>
        
        <VoiceRecorder />
        
        <button
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="mt-4 w-full flex items-center justify-center py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-70"
        >
          {isGenerating ? (
            <>
              <span className="mr-2">Generating Report</span>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            </>
          ) : 'Generate Report from Voice Notes'}
        </button>
      </div>
      
      {/* General Overview Card */}
      <div className="bg-white rounded-lg shadow-sm border border-construction-200 p-5">
        <h2 className="text-lg font-semibold text-construction-800 mb-4">General Overview</h2>
        <textarea
          value={formData.generalOverview}
          onChange={(e) => handleTextChange('generalOverview', e.target.value)}
          placeholder="AI-generated summary of the day's activities"
          className="w-full h-60 p-3 border border-construction-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        ></textarea>
      </div>
      
      {/* Challenges Encountered Card */}
      <div className="bg-white rounded-lg shadow-sm border border-construction-200 p-5">
        <h2 className="text-lg font-semibold text-construction-800 mb-4">Challenges Encountered</h2>
        <textarea
          value={formData.challengesEncountered}
          onChange={(e) => handleTextChange('challengesEncountered', e.target.value)}
          placeholder="Describe any challenges or issues encountered during the day"
          className="w-full h-60 p-3 border border-construction-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        ></textarea>
      </div>
      
      {/* Safety Incidents Card */}
      <div className="bg-white rounded-lg shadow-sm border border-construction-200 p-5">
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
          <h2 className="text-lg font-semibold text-construction-800">Safety Incidents</h2>
        </div>
        <textarea
          value={formData.safetyIncidents}
          onChange={(e) => handleTextChange('safetyIncidents', e.target.value)}
          placeholder="Summary of safety incidents, if any"
          className="w-full h-40 p-3 border border-construction-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        ></textarea>
      </div>
      
      {/* Equipment & Materials Card */}
      <div className="bg-white rounded-lg shadow-sm border border-construction-200 p-5">
        <div className="flex items-center mb-4">
          <Truck className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-lg font-semibold text-construction-800">Equipment & Materials</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-construction-700 bg-construction-50">
              <tr>
                <th className="px-4 py-2 rounded-tl-md">Item Name</th>
                <th className="px-4 py-2">Quantity Used</th>
                <th className="px-4 py-2">Remaining</th>
                <th className="px-4 py-2 rounded-tr-md">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {formData.equipment.map((item, index) => (
                <tr key={index} className="border-b border-construction-100">
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleEquipmentChange(index, 'name', e.target.value)}
                      className="w-full p-1 border border-construction-200 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Item name"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={item.quantityUsed}
                      onChange={(e) => handleEquipmentChange(index, 'quantityUsed', e.target.value)}
                      className="w-full p-1 border border-construction-200 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Qty"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={item.quantityRemaining}
                      onChange={(e) => handleEquipmentChange(index, 'quantityRemaining', e.target.value)}
                      className="w-full p-1 border border-construction-200 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Qty"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={item.remarks}
                      onChange={(e) => handleEquipmentChange(index, 'remarks', e.target.value)}
                      className="w-full p-1 border border-construction-200 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Remarks"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <button
          onClick={addEquipmentRow}
          className="mt-3 text-primary text-sm hover:underline"
        >
          + Add New Item
        </button>
      </div>
      
      {/* Workforce Attendance Card */}
      <div className="bg-white rounded-lg shadow-sm border border-construction-200 p-5">
        <div className="flex items-center mb-4">
          <Users className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-lg font-semibold text-construction-800">Workforce Attendance</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-construction-700 mb-1">
              Total Workforce Present
            </label>
            <input
              type="text"
              value={formData.workforce.totalPresent}
              onChange={(e) => handleWorkforceChange('totalPresent', e.target.value)}
              className="w-full p-2 border border-construction-200 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-construction-700 mb-1">
              Hours Worked
            </label>
            <input
              type="text"
              value={formData.workforce.hoursWorked}
              onChange={(e) => handleWorkforceChange('hoursWorked', e.target.value)}
              className="w-full p-2 border border-construction-200 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter hours"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-construction-700 mb-1">
              Absentees
            </label>
            <input
              type="text"
              value={formData.workforce.absentees}
              onChange={(e) => handleWorkforceChange('absentees', e.target.value)}
              className="w-full p-2 border border-construction-200 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter number and/or names"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;
