"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUp, Router } from "lucide-react";
import { FileUpload } from "../file-upload";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hook/use-model-store";

// === Schema validate ===
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Tên server không được để trống",
  }),
  imageUrl: z.string().min(1, {
    message: "Vui lòng chọn ảnh đại diện",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === "createServer";
  // === Khởi tạo form ===
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  // === Xử lý submit ===
  const onSubmit = async (values: FormValues) => {
    try {
      await axios.post("/api/servers", values);

      form.reset();
      window.location.reload();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
    console.log("Tạo server:", values);
  };

  const handelClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handelClose}>
      <DialogContent
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="bg-white text-black p-0 overflow-hidden max-w-md"
      >
        {/* Header */}
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Tùy chỉnh server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Đặt tên và ảnh đại diện cho server. Bạn có thể thay đổi sau.
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 px-6"
          >
            {/* === Upload ảnh (TODO) === */}
            <div className="flex items-center justify-center">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        endpoint="serverImage"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* === Tên server === */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                    Tên server
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Nhập tên server..."
                      {...field}
                      className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* === Nút submit === */}
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Đang tạo server..." : "Tạo server"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
