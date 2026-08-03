"use client";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";

type EditableFieldProps = {
  value: string;
  placeholder: string;
};

export function EditableField({ value, placeholder }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  function handleSave() {
    setCurrentValue(currentValue);
    setIsEditing(false);
  }
  function handleCancel() {
    setCurrentValue(value);
    setIsEditing(false);
  }

  if (!isEditing) {
    return (
      <div className="mb-4 flex items-center gap-3">
        <p className="text-lg text-slate-200">{currentValue}</p>
        <FiEdit2
          className="text-secondary size-4 cursor-pointer"
          onClick={() => setIsEditing(true)}
        />
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <input
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        className="text-slate-200 placeholder:text-slate-200/30"
        placeholder={placeholder}
        autoFocus
      />

      <div className="flex gap-2 *:rounded-md *:px-2 *:py-1 *:text-slate-200">
        <button className="cursor-pointer bg-emerald-600" onClick={handleSave}>
          Update
        </button>
        <button className="cursor-pointer bg-red-500" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
