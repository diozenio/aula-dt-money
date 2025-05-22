import Image from "next/image";
import { CreateTransactionModal } from "../CreateTransactionModal";

export function Header() {
  return (
    <header className="bg-header w-full h-[212px]">
      <div className="max-w-[1120px] mx-auto flex row justify-between pt-8">
        <Image src="/logo.svg" width={172} height={40} alt="Logo Image" />
        <CreateTransactionModal />
      </div>
    </header>
  );
}
