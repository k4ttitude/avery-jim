import { Copy } from "lucide-react";
import { message } from "@/shared/wish";
import { useDebounce } from "@uidotdev/usehooks";
import { useStore } from "@nanostores/react";
import { useToast } from "./ui/use-toast";

export const Banks = () => {
  const $message = useStore(message);
  const addInfo = useDebounce($message, 300);
  const searchParams = new URLSearchParams({ addInfo });
  const { toast } = useToast();

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({ title: "Đã sao chép" });
  };

  return (
    <div className="flex flex-col md:flex-row justify-evenly gap-12 flex-1 min-w-fit w-full">
      <div className="flex flex-col items-center">
        <h6 className="uppercase">Nguyễn Thị Thảo Nguyên</h6>
        <div className="border-2 border-dashed rounded-lg p-2 my-4">
          <img
            src={`https://img.vietqr.io/image/TCB-${BANK_ACCOUNT_TN}-qr_only.png?${searchParams.toString()}`}
            alt="Thao Nguyen's bank account QR"
            className="w-56 h-56"
          />
        </div>
        <span>Techcombank</span>
        <button
          type="button"
          className="inline-flex items-center gap-2 ml-8 p-1 [&>svg]:hover:text-white"
          onClick={() => handleCopy(BANK_ACCOUNT_TN)}
        >
          <span className="font-semibold text-xl">
            {formatBankAccount(BANK_ACCOUNT_TN)}
          </span>
          <Copy className="text-muted-foreground" />
        </button>
      </div>
      {/**/}
      <div className="flex flex-col items-center">
        <h6 className="uppercase">Phạm Minh Hiếu</h6>
        <div className="border-2 border-dashed rounded-lg p-2 my-4">
          <img
            src={`https://img.vietqr.io/image/TCB-${BANK_ACCOUNT_MH}-qr_only.png?${searchParams.toString()}`}
            alt="Minh Hieu's bank account QR"
            className="w-56 h-56"
          />
        </div>
        <span>Techcombank</span>
        <button
          type="button"
          className="inline-flex items-center gap-2 ml-8 p-1 [&>svg]:hover:text-white"
          onClick={() => handleCopy(BANK_ACCOUNT_MH)}
        >
          <span className="font-semibold text-xl">
            {formatBankAccount(BANK_ACCOUNT_MH)}
          </span>
          <Copy className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

const BANK_ACCOUNT_TN = "19033075156010";
const BANK_ACCOUNT_MH = "19037964519015";

const formatBankAccount = (account: string) =>
  account.match(/(.{1,4})/g)?.join(" ");
