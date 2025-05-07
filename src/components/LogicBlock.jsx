import React from 'react';
import { Listbox } from '@headlessui/react';
import { Trash2, ChevronDown } from 'lucide-react';

const FIELD_OPTIONS = [
  { label: 'New Wallets', icon: '👛', units: ['wallets'], placeholder: 'How many wallets?' },
  { label: 'Wallet Age', icon: '⏳', units: ['days'], placeholder: 'How many days?' },
  { label: 'Volume', icon: '💰', units: ['SOL', 'USD'], placeholder: 'What volume?' },
  { label: 'Smart Wallet Buys', icon: '🧠', units: ['wallets'], placeholder: 'How many smart wallets?' },
  { label: 'Win Rate', icon: '🏆', units: ['%'], placeholder: 'What % win rate?' },
  { label: 'Buy Window', icon: '⏱️', units: ['minutes'], placeholder: 'How many minutes?' },
  { label: 'Tracked Wallet Sell', icon: '🔔', units: ['event'], placeholder: 'Event count' },
  { label: 'User Holding Token', icon: '🪙', units: ['boolean'], placeholder: 'Yes or No?' },
  { label: 'New Holders', icon: '👥', units: ['wallets'], placeholder: 'How many holders?' },
  { label: 'Time Window', icon: '🕒', units: ['minutes'], placeholder: 'How many minutes?' },
  { label: 'Market Cap', icon: '📈', units: ['USD'], placeholder: 'What market cap?' },
  { label: 'Price Retrace', icon: '📉', units: ['%'], placeholder: 'What % retrace?' },
  { label: 'Smart Wallet Re-Buys', icon: '🔄', units: ['wallets'], placeholder: 'How many wallets?' },
];
const OPERATOR_OPTIONS = ['=', '>', '<', '≥', '≤'];

function Dropdown({ value, options, onChange, className = '', icon = false }) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className={`relative ${className}`}>
        <Listbox.Button className="flex items-center gap-1 bg-zinc-800 text-zinc-200 rounded px-2 py-1 text-sm font-semibold min-w-[90px] focus:outline-none focus:ring-2 focus:ring-blue-500/40">
          {icon && options.find(o => o.label === value)?.icon}
          <span>{icon ? options.find(o => o.label === value)?.label : value}</span>
          <ChevronDown className="w-4 h-4 ml-1 text-zinc-400" />
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg z-50 max-h-60 overflow-auto">
          {options.map(opt => (
            <Listbox.Option
              key={icon ? opt.label : opt}
              value={icon ? opt.label : opt}
              className={({ active, selected }) =>
                `px-4 py-2 cursor-pointer select-none transition-colors ${
                  selected ? 'bg-blue-500/20 text-blue-300 font-bold' : active ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-200'
                }`
              }
            >
              {icon && <span className="mr-2">{opt.icon}</span>}
              {icon ? opt.label : opt}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}

export default function LogicBlock({ block, editable = true, onChange, onRemove }) {
  // Find the selected field object
  const fieldObj = FIELD_OPTIONS.find(f => f.label === block.field) || FIELD_OPTIONS[0];
  const allowedUnits = fieldObj.units;
  const placeholder = fieldObj.placeholder;
  const isBoolean = allowedUnits && allowedUnits[0] === 'boolean';

  // When field changes, auto-select first allowed unit
  const handleFieldChange = (newField) => {
    const newFieldObj = FIELD_OPTIONS.find(f => f.label === newField);
    if (onChange) onChange({ ...block, field: newField, unit: newFieldObj.units[0], value: newFieldObj.units[0] === 'boolean' ? 1 : 0 });
  };

  const handleChange = (key, value) => {
    if (onChange) onChange({ ...block, [key]: value });
  };

  return (
    <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-700 rounded-xl px-4 py-3 mb-2 shadow-sm hover:border-blue-400/40 transition-all">
      <Dropdown
        value={block.field}
        options={FIELD_OPTIONS}
        onChange={handleFieldChange}
        icon={true}
        className="min-w-[140px]"
      />
      <Dropdown
        value={block.operator}
        options={OPERATOR_OPTIONS}
        onChange={v => handleChange('operator', v)}
        className="min-w-[60px]"
      />
      {isBoolean ? (
        <Dropdown
          value={block.value === 1 ? 'Yes' : 'No'}
          options={['Yes', 'No']}
          onChange={v => handleChange('value', v === 'Yes' ? 1 : 0)}
          className="min-w-[60px]"
        />
      ) : (
        <input
          type="number"
          className="bg-zinc-800 text-zinc-200 rounded px-2 py-1 text-sm font-semibold w-28 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
          value={block.value}
          disabled={!editable}
          onChange={e => handleChange('value', e.target.value)}
          placeholder={placeholder}
        />
      )}
      {allowedUnits && allowedUnits.length > 0 && !isBoolean && (
        <Dropdown
          value={block.unit}
          options={allowedUnits}
          onChange={v => handleChange('unit', v)}
          className="min-w-[80px]"
        />
      )}
      {editable && onRemove && (
        <button
          className="ml-3 text-red-400 hover:text-red-300 p-1 rounded-full transition"
          onClick={onRemove}
          title="Remove condition"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
} 