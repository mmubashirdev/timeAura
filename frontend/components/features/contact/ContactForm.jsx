"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/features/auth/LoadingSpinner";
import { contactFormSchema } from "@/lib/validations";

const SUBJECTS = [
  "General Inquiry",
  "Order Support",
  "Returns & Exchanges",
  "Product Question",
  "Partnership",
  "Other",
];

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  // NOTE: there's no /contact endpoint in the backend yet — this simulates
  // a send so the UI is fully usable. Wire it up to a real
  // POST /api/v1/contact (controller → service → mailer) once that route exists.
  const onSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    toast.success("Message sent", {
      description:
        "Thanks for reaching out — our team will get back to you within 24 hours.",
    });
    reset();
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-6 lg:p-8">
      <h2 className="font-serif text-2xl text-neutral-900 mb-1">
        Send Us a Message
      </h2>
      <p className="text-sm text-neutral-600 mb-6">
        Fill out the form below and our team will get back to you.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        noValidate
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Input
              id="name"
              placeholder="Your Name *"
              aria-invalid={!!errors.name}
              className="h-12 rounded-xl text-sm"
              {...register("name")}
            />
            {errors.name && (
              <p role="alert" className="text-[11px] text-destructive pl-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Input
              id="email"
              type="email"
              placeholder="Email Address *"
              aria-invalid={!!errors.email}
              className="h-12 rounded-xl text-sm"
              {...register("email")}
            />
            {errors.email && (
              <p role="alert" className="text-[11px] text-destructive pl-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="subject"
            className="text-[10px] font-semibold tracking-[0.15em] uppercase text-neutral-800"
          >
            Subject *
          </label>
          <select
            id="subject"
            defaultValue=""
            aria-invalid={!!errors.subject}
            className="h-11 rounded-xl border border-input bg-input/30 px-3 text-sm text-neutral-700 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            {...register("subject")}
          >
            <option value="" disabled>
              How can we help you?
            </option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p role="alert" className="text-[11px] text-destructive pl-1">
              {errors.subject.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="message"
            className="text-[10px] font-semibold tracking-[0.15em] uppercase text-neutral-800"
          >
            Your Message *
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Write your message here..."
            aria-invalid={!!errors.message}
            className="rounded-xl border border-input bg-input/30 px-3 py-2.5 text-sm text-neutral-700 outline-none resize-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            {...register("message")}
          />
          {errors.message && (
            <p role="alert" className="text-[11px] text-destructive pl-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="mt-1 h-12 rounded-xl bg-[#5c0016] hover:bg-[#4a0011] text-white font-semibold tracking-[0.1em] text-xs uppercase shadow-lg shadow-[#5c0016]/20 gap-2"
        >
          {submitting ? (
            <>
              <LoadingSpinner /> Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
