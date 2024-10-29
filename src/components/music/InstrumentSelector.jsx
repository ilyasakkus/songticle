import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InstrumentSelector = ({ selectedInstrument, onSelect }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-white">Mode:</span>
      <Tabs value={selectedInstrument} onValueChange={onSelect}>
        <TabsList className="bg-gray-700">
          <TabsTrigger value="synth">Synth</TabsTrigger>
          <TabsTrigger value="marimba">Marimba</TabsTrigger>
          <TabsTrigger value="electronic">Electronic</TabsTrigger>
          <TabsTrigger value="piano">Piano</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default InstrumentSelector;