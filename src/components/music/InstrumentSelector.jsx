import React from 'react';
import { Select } from "@/components/ui/select";

const InstrumentSelector = ({ selectedInstrument, onSelect }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-white">Instrument:</span>
      <Select
        value={selectedInstrument}
        onValueChange={onSelect}
        className="w-32"
      >
        <option value="synth">Synth</option>
        <option value="marimba">Marimba</option>
      </Select>
    </div>
  );
};

export default InstrumentSelector;