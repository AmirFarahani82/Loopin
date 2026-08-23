"use client";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";

type EditableFieldProps = {
  value: string;
  onSaveAction: (value: string) => Promise<void>;
  isPending: boolean;
  placeholder: string;
};

export function EditableField({
  value,
  onSaveAction,
  isPending,
  placeholder,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  async function handleSave() {
    if (currentValue.trim() === "" || currentValue.trim() === value) return;
    await onSaveAction(currentValue.trim());
    setIsEditing(false);
  }
  function handleCancel() {
    setCurrentValue(value);
    setIsEditing(false);
  }

  if (!isEditing) {
    return (
      <div className="mb-4 flex items-center gap-3">
        <p className="text-subtitle truncate text-slate-200">{value}</p>
        <FiEdit2
          className="text-secondary size-4 shrink-0 cursor-pointer"
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
        className="w-full rounded-md border border-slate-700 bg-slate-800/50 px-2 py-2 text-slate-200 placeholder:text-slate-200/30"
        placeholder={placeholder}
        autoFocus
      />

      <div className="flex gap-2 *:rounded-md *:px-2 *:py-1 *:text-slate-200">
        <button
          disabled={isPending}
          className="cursor-pointer bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-600/40"
          onClick={handleSave}
        >
          {isPending ? "Updating..." : "Update"}
        </button>
        <button
          disabled={isPending}
          className="cursor-pointer bg-red-500 disabled:cursor-not-allowed disabled:bg-red-500/40"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
