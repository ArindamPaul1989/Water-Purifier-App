'use client';
import { useState } from 'react';

export default function Home() {
  const [pincode, setPincode] = useState('');
  const [step, setStep] = useState(1);
  const [knowsSource, setKnowsSource] = useState(null);
  const [waterSource, setWaterSource] = useState({
    category: '',
    specificSource: ''
  });
  const [knowsTDS, setKnowsTDS] = useState(null);
  const [tdsValue, setTdsValue] = useState('');
  const [sourceChangeFrequency, setSourceChangeFrequency] = useState('');
  const [advanceNotice, setAdvanceNotice] = useState(null);
  const [tdsPreference, setTdsPreference] = useState(null);
  const [preferredTDSRange, setPreferredTDSRange] = useState('');

  const sourceCategories = [
    'Borewell',
    'River',
    'Dam',
    'Corporation',
    'Other'
  ];

  const handlePincodeSubmit = () => {
    if (pincode.length === 6) {
      setStep(2);
    }
  };

  const handleBackClick = () => {
    setStep(step - 1);
  };

  const handleTDSSubmit = () => {
    const tds = parseInt(tdsValue);
    if (tds >= 0) {
      setStep(5);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">
        Water Purifier Recommendation System
      </h1>
      
      {/* Step 1: Pincode */}
      {step === 1 && (
        <div className="max-w-2xl">
          <p className="mb-4">Let's find the perfect water purifier for you.</p>
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Enter your pincode</span>
              <input 
                type="text" 
                maxLength="6"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                placeholder="Enter 6-digit pincode"
              />
            </label>
            <button 
              onClick={handlePincodeSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={pincode.length !== 6}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Know Water Source */}
      {step === 2 && (
        <div className="max-w-2xl">
          <p className="mb-4">Do you know the source of your water?</p>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button 
                onClick={() => {
                  setKnowsSource(true);
                  setStep(3);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Yes
              </button>
              <button 
                onClick={() => {
                  setKnowsSource(false);
                  setStep(4);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                No
              </button>
            </div>
            <button 
              onClick={handleBackClick}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Water Source Details */}
      {step === 3 && (
        <div className="max-w-2xl">
          <p className="mb-4">Tell us about your water source:</p>
          <div className="space-y-6">
            <div>
              <label className="block mb-2">Water Source Category</label>
              <select 
                value={waterSource.category}
                onChange={(e) => setWaterSource({...waterSource, category: e.target.value})}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select a category</option>
                {sourceCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2">Specific Source (Optional)</label>
              <input 
                type="text"
                value={waterSource.specificSource}
                onChange={(e) => setWaterSource({...waterSource, specificSource: e.target.value})}
                className="w-full p-2 border rounded-md"
                placeholder="e.g., Vihar Lake"
              />
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={() => setStep(4)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={!waterSource.category}
              >
                Next
              </button>
              <button 
                onClick={handleBackClick}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: TDS Knowledge */}
      {step === 4 && (
        <div className="max-w-2xl">
          <p className="mb-4">Do you know the TDS value of your source water?</p>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button 
                onClick={() => {
                  setKnowsTDS(true);
                  setStep(4.1);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Yes
              </button>
              <button 
                onClick={() => {
                  setKnowsTDS(false);
                  setStep(5);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                No
              </button>
            </div>
            <button 
              onClick={handleBackClick}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* Step 4.1: TDS Value Input */}
      {step === 4.1 && (
        <div className="max-w-2xl">
          <p className="mb-4">What is the TDS value of your water?</p>
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Enter TDS value (in ppm)</span>
              <input 
                type="number"
                value={tdsValue}
                onChange={(e) => setTdsValue(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                placeholder="Enter TDS value"
                min="0"
              />
            </label>
            <div className="text-sm text-gray-600">
              <p>TDS (Total Dissolved Solids) is measured in parts per million (ppm)</p>
              <p>Typical ranges:</p>
              <ul className="list-disc ml-5 mt-2">
                <li>0-50 ppm: Very low</li>
                <li>50-150 ppm: Ideal for drinking</li>
                <li>150-250 ppm: Acceptable</li>
                <li>Above 250 ppm: May need treatment</li>
              </ul>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={handleTDSSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={!tdsValue}
              >
                Next
              </button>
              <button 
                onClick={handleBackClick}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Source Change Frequency */}
      {step === 5 && (
        <div className="max-w-2xl">
          <p className="mb-4">How frequently do you experience a change in water source (tanker/borewell/etc.)?</p>
          <div className="space-y-4">
            <div className="space-y-2">
              {[
                'Never',
                'Once a year',
                'Once a quarter',
                'Once a month',
                'Every couple of days'
              ].map((frequency) => (
                <button
                  key={frequency}
                  onClick={() => {
                    setSourceChangeFrequency(frequency);
                    setStep(6);
                  }}
                  className="block w-full text-left px-4 py-2 rounded hover:bg-blue-50 border mb-2"
                >
                  {frequency}
                </button>
              ))}
            </div>
            <button 
              onClick={handleBackClick}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Advance Notice */}
      {step === 6 && (
        <div className="max-w-2xl">
          <p className="mb-4">Are you told in advance if the source of water has changed?</p>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button 
                onClick={() => {
                  console.log('Clicked Yes');
                  setAdvanceNotice(true);
                  setStep(7);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Yes
              </button>
              <button 
                onClick={() => {
                  console.log('Clicked No');
                  setAdvanceNotice(false);
                  setStep(7);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                No
              </button>
            </div>
            <button 
              onClick={handleBackClick}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* Step 7: TDS Range Preference */}
      {step === 7 && (
        <div className="max-w-2xl">
          <p className="mb-4">Do you like your drinking water TDS to be in a specific range?</p>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button 
                onClick={() => {
                  setTdsPreference(true);
                  setStep(7.1);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Yes
              </button>
              <button 
                onClick={() => {
                  setTdsPreference(false);
                  setStep(8);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                No
              </button>
            </div>
            <button 
              onClick={handleBackClick}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* Step 7.1: TDS Range Selection */}
      {step === 7.1 && (
        <div className="max-w-2xl">
          <p className="mb-4">Select your preferred TDS range:</p>
          <div className="space-y-4">
            <div className="space-y-2">
              {[
                '< 50',
                '50-100 (recommended)',
                '75-125',
                '100-150',
                '125-175',
                '150-200'
              ].map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setPreferredTDSRange(range);
                    setStep(8);
                  }}
                  className="block w-full text-left px-4 py-2 rounded hover:bg-blue-50 border mb-2"
                >
                  {range}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-600 mt-4">
              <p>Note: It is recommended to consume water in the TDS band of 50-100 to preserve minerals</p>
            </div>
            <button 
              onClick={handleBackClick}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
