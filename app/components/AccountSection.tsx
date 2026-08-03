"use client";
import { EditableField } from "./EditableField";

type AccountProp = {
  session: {
    id: string;
    email: string | undefined;
    name: string;
    timezone: string;
  };
};
export function AccountSection({ session }: AccountProp) {
  return (
    <div className="space-y-4 p-3">
      <div>
        <EditableField value={session.name} placeholder="Enter your name" />
      </div>

      <div>
        <EditableField value={session.email!} placeholder="Enter your email" />
      </div>
    </div>
  );
}
