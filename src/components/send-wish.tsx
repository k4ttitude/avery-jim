import { message } from "@/shared/message";
import { useStore } from "@nanostores/react";
import { useDebounce } from "@uidotdev/usehooks";
import { Copy, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

type Wish = { id: string; sender: string; message: string; status?: string };

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

const getWishes = async () =>
  fetch(`${process.env.SUPABASE_URL}/rest/v1/wishes`, {
    headers: { apikey: process.env.SUPABASE_ANON || "" },
  }).then((response) => response.json() as Promise<Wish[]>);

export const SendWish = () => {
  const [name, setName] = useState("");
  // const [message, setMessage] = useState("");
  const $message = useStore(message);

  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) {
      return;
    }
    if (!name || !message.value) {
      return toast({
        title: "Vui lòng nhập cả tên và nội dung 🔴",
      });
    }
    setSending(true);
    const success = await sendWish({ name, message: message.value });
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
    <form
      className="flex flex-col gap-4 flex-1 max-w-[500px] w-full"
      onSubmit={handleSubmit}
    >
      <h3 className="text-center">Gửi lời chúc phúc ở đây ạ 😉</h3>
      <Input
        id="name"
        className="border text-primary-foreground"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Người gửi"
      />
      <Textarea
        id="message"
        className="border h-[8.5rem]"
        value={message.value}
        onChange={(e) => message.set(e.target.value)}
        placeholder="Nội dung"
      ></Textarea>
      <Button type="submit" className="bg-gradient-to-r from-primary to-accent">
        Gửi
        {sending ? (
          <Loader2 size={16} className="animate-spin-infinite ml-1" />
        ) : null}
      </Button>
    </form>
  );
};
