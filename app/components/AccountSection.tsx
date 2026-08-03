"use client";
import { useMutation } from "@tanstack/react-query";
import { EditableField } from "./EditableField";
import { updateAccount } from "@/libs/actions/account";

type AccountProp = {
  session: {
    id: string;
    email: string | undefined;
    name: string;
    timezone: string;
  };
};
export function AccountSection({ session }: AccountProp) {
  const { mutate, isPending, mutateAsync } = useMutation({
    mutationFn: updateAccount,
    onError: (error, variables) => {
      const field = variables.name ? "name" : "email";
      alert(`Error while changing ${field} - ${error.message}`);
    },
    onSuccess: (_, variables) => {
      if (variables.email) {
        alert(
          `Confirmation email sent to ${variables.email}, check your inbox to finish updating your email.`,
        );
      }
    },
  });

  return (
    <div className="space-y-4 p-3">
      <div>
        <EditableField
          value={session.name}
          onSaveAction={(value) => mutateAsync({ name: value })}
          isPending={isPending}
          placeholder="Enter your name"
        />
      </div>

      <div>
        <EditableField
          value={session.email!}
          onSaveAction={(value) => mutateAsync({ email: value })}
          isPending={isPending}
          placeholder="Enter your email"
        />
      </div>
    </div>
  );
}
