import ModalContextProvider from "@/libs/providers/ModalContextProvider";
import ReactQueryProvider from "@/libs/providers/ReactQueryProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ModalContextProvider>{children}</ModalContextProvider>
    </ReactQueryProvider>
  );
}
