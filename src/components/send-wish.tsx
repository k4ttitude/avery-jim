import { message } from "@/shared/message";
import { Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { useStore } from "@nanostores/react";

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

export const SendWish = () => {
  const [name, setName] = useState("");
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
    if (success) {
      toast({
        title: "Chúng mình đã nhận được lời chúc rồi, cảm ơn bạn nhiều ạ 🥰",
      });
      setName("");
      message.set("");
    } else {
      toast({
        title: "Có lỗi xảy ra. Lời chúc chưa thể tới với chúng mình 😢",
        variant: "destructive",
      });
    }
    setSending(false);
  };

  return (
    <form
      className="flex-1 flex flex-col gap-4 min-w-[200px] w-full"
      onSubmit={handleSubmit}
    >
      <h3 className="text-center">Chúc phúc ở đây ạ 😉</h3>
      <Input
        id="name"
        className="border text-primary-foreground"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Người gửi"
      />
      <Textarea
        id="message"
        className="border h-48"
        value={$message}
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
