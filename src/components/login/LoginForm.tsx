"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/slices/auth.slice";
import { useState } from "react";
import { useRouter } from "next/router";

const formSchema = z.object({
  email: z
    .string()
    .min(6, {
      message: "Username must be at least 6 characters.",
    })
    .email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});
type LoginFormType = z.infer<typeof formSchema>;

export function LoginForm({ onClose }: { onClose: (open: boolean) => void }) {
  const form = useForm<LoginFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    axios
      .post(`https://nt.softly.uz/api/auth/login`, values)
      .then((res) => {
        toast.success("Muvaffaqqiyatli !");
        onClose(false);
        dispatch(login(res.data));
        localStorage.setItem("auth", JSON.stringify(res.data));
        router.push("/user");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Noto'g'ri ma'lumot");
      })
      .finally(() => {
        console.log("final");
        setLoading(false);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          {loading && (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-4 border-slate-50"></div>
            </div>
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
}
