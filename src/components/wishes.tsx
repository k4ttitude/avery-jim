import { useState, type FormEvent } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useDebounce } from "@uidotdev/usehooks";
import { Copy, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const BANK_ACCOUNT_TN = "19033075156010";
const BANK_ACCOUNT_MH = "19037964519015";

const formatBankAccount = (account: string) =>
  account.match(/(.{1,4})/g)?.join(" ");

const sendWish = async (data: { name: string; message: string }) => {
  try {
    const response = await fetch("/actions/send-wish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const { success } = (await response.json()) as { success: boolean };
    return success;
  } catch (err) {
    return false;
  }
};

export const Wishes = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const debouncedMessage = useDebounce(message, 300);
  const searchParams = new URLSearchParams({
    addInfo: debouncedMessage.slice(0, 50),
  });

  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    const success = await sendWish({ name, message });
    success
      ? toast({
          title: "Chúng mình đã nhận được lời chúc rồi, cảm ơn bạn nhiều ạ 🥰",
        })
      : toast({
          title: "Có lỗi xảy ra. Lời chúc chưa thể tới với chúng mình 😢",
          variant: "destructive",
        });
    setSending(false);
  };

  return (
    <section className="bg-black text-white/90 flex flex-col lg:flex-row justify-center items-center lg:items-start gap-12 py-12 px-16">
      <form
        className="flex flex-col gap-4 flex-1 max-w-[500px] w-full"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center">Mừng Hạnh Phúc</h3>
        <Input
          id="name"
          className="border"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Người gửi"
        />
        <Textarea
          id="message"
          className="border h-[8.5rem]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Lời chúc của bạn"
        ></Textarea>
        <Button type="submit" disabled={!name || !message || sending}>
          Gửi
          {sending ? (
            <Loader2 size={16} className="animate-spin-infinite ml-1" />
          ) : null}
        </Button>
      </form>

      <div className="flex flex-col md:flex-row justify-evenly gap-12">
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
              alt="Minh Hieu's bank account QR"
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
