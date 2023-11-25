import { useState, type FormEvent } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useDebounce } from "@uidotdev/usehooks";
import { Copy } from "lucide-react";
import { Button } from "./ui/button";

const BANK_ACCOUNT_TN = "19033075156010";
const BANK_ACCOUNT_MH = "19037964519015";

const formatBankAccount = (account: string) =>
  account.match(/(.{1,4})/g)?.join(" ");

export const Gifts = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const debouncedMessage = useDebounce(message, 300);
  const searchParams = new URLSearchParams({
    addInfo: debouncedMessage.slice(0, 50),
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetch("/actions/send-wish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, message }),
    });
  };

  return (
    <section className="bg-black text-white/90 flex flex-col lg:flex-row justify-evenly gap-12 py-12 px-16">
      <form className="flex flex-col flex-1 gap-4" onSubmit={handleSubmit}>
        <h3 className="text-center">Mừng Hạnh Phúc</h3>
        <Input
          id="name"
          className="border"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Người gửi"
        />
        <Textarea
          id="message"
          className="border h-[8.5rem]"
          defaultValue={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Lời chúc của bạn"
        ></Textarea>
        <Button type="submit" disabled={!name || !message}>
          Gửi
        </Button>
      </form>

      <div className="flex flex-col md:flex-row justify-evenly gap-12">
        <div className="flex flex-col items-center">
          <h6 className="uppercase">Nguyễn Thị Thảo Nguyên</h6>
          <div className="border-2 border-dashed rounded-lg p-2 my-4">
            <img
              src={`https://img.vietqr.io/image/TCB-${BANK_ACCOUNT_TN}-qr_only.png?${searchParams.toString()}`}
              className="w-56 h-56"
            />
          </div>
          <span>Techcombank</span>
          <button
            className="inline-flex items-center gap-2 ml-8 p-1 [&>svg]:hover:text-white"
            onClick={() => navigator.clipboard.writeText(BANK_ACCOUNT_TN)}
          >
            <span className="font-semibold text-lg">
              {formatBankAccount(BANK_ACCOUNT_TN)}
            </span>
            <Copy className="text-muted-foreground" />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <h6 className="uppercase">Phạm Minh Hiếu</h6>
          <div className="border-2 border-dashed rounded-lg p-2 my-4">
            <img
              src={`https://img.vietqr.io/image/TCB-${BANK_ACCOUNT_MH}-qr_only.png?${searchParams.toString()}`}
              className="w-56 h-56"
            />
          </div>
          <span>Techcombank</span>
          <button
            type="button"
            className="inline-flex items-center gap-2 ml-8 p-1 [&>svg]:hover:text-white"
            onClick={() => navigator.clipboard.writeText(BANK_ACCOUNT_MH)}
          >
            <span className="font-semibold text-xl">
              {formatBankAccount(BANK_ACCOUNT_MH)}
            </span>
            <Copy className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};
