"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LoaderCircle, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { submitContactForm } from "@/app/[locale]/(marketing)/contact/actions";
import { Button } from "@/components/ui/button";
import {
  CONTACT_MESSAGE_MAX_LENGTH,
  CONTACT_NEEDS,
  contactFormSchema,
} from "@/lib/contact-form";
import type {
  ContactFormData,
  ContactSubmissionStatus,
} from "@/lib/contact-form";

type ContactFormProps = {
  locale: ContactFormData["locale"];
  whatsappUrl: string;
};

type FormStatus = "idle" | ContactSubmissionStatus;

const fieldClassName =
  "min-h-12 w-full rounded-control border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 focus:border-primary focus:ring-3 focus:ring-primary/15 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/15 disabled:cursor-not-allowed disabled:opacity-60";

export function ContactForm({ locale, whatsappUrl }: ContactFormProps) {
  const t = useTranslations("ContactPage.form");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [startedAt] = useState(() => Date.now());
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      business: "",
      contact: "",
      need: "unsure",
      message: "",
      locale,
      website: "",
      startedAt,
    },
    mode: "onBlur",
  });
  const messageLength = useWatch({ control, name: "message" }).length;

  const errorText = (message?: string) => {
    if (!message) {
      return undefined;
    }

    return t(`validation.${message}`);
  };

  const onSubmit = handleSubmit(
    async (data) => {
      setStatus("idle");

      try {
        const result = await submitContactForm(data);
        setStatus(result.status);

        if (result.status === "success") {
          reset({
            name: "",
            business: "",
            contact: "",
            need: "unsure",
            message: "",
            locale,
            website: "",
            startedAt,
          });
        }
      } catch {
        setStatus("failure");
      }
    },
    () => setStatus("invalid"),
  );
  const generalMessage = isSubmitting
    ? t("status.submitting")
    : status === "idle"
      ? undefined
      : t(`status.${status}`);

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-card-large border border-border bg-card p-5 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium">{t("fields.name.label")}</label>
          <input
            id="contact-name"
            autoComplete="name"
            maxLength={80}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={`${fieldClassName} mt-2`}
            {...register("name")}
          />
          {errors.name ? <p id="contact-name-error" className="mt-2 text-sm text-destructive">{errorText(errors.name.message)}</p> : null}
        </div>

        <div>
          <label htmlFor="contact-business" className="text-sm font-medium">{t("fields.business.label")}</label>
          <input
            id="contact-business"
            autoComplete="organization"
            maxLength={120}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.business)}
            aria-describedby={errors.business ? "contact-business-error" : undefined}
            className={`${fieldClassName} mt-2`}
            {...register("business")}
          />
          {errors.business ? <p id="contact-business-error" className="mt-2 text-sm text-destructive">{errorText(errors.business.message)}</p> : null}
        </div>

        <div>
          <label htmlFor="contact-detail" className="text-sm font-medium">{t("fields.contact.label")}</label>
          <input
            id="contact-detail"
            type="text"
            maxLength={160}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={errors.contact ? "contact-detail-help contact-detail-error" : "contact-detail-help"}
            className={`${fieldClassName} mt-2`}
            {...register("contact")}
          />
          <p id="contact-detail-help" className="mt-2 text-sm text-muted-foreground">{t("fields.contact.help")}</p>
          {errors.contact ? <p id="contact-detail-error" className="mt-2 text-sm text-destructive">{errorText(errors.contact.message)}</p> : null}
        </div>

        <div>
          <label htmlFor="contact-need" className="text-sm font-medium">{t("fields.need.label")}</label>
          <select
            id="contact-need"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.need)}
            aria-describedby={errors.need ? "contact-need-error" : undefined}
            className={`${fieldClassName} mt-2`}
            {...register("need")}
          >
            {CONTACT_NEEDS.map((need) => (
              <option key={need} value={need}>{t(`fields.need.options.${need}`)}</option>
            ))}
          </select>
          {errors.need ? <p id="contact-need-error" className="mt-2 text-sm text-destructive">{t("validation.need.invalid")}</p> : null}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-end justify-between gap-4">
          <label htmlFor="contact-message" className="text-sm font-medium">{t("fields.message.label")}</label>
          <span className="font-mono text-xs text-muted-foreground">{messageLength}/{CONTACT_MESSAGE_MAX_LENGTH}</span>
        </div>
        <textarea
          id="contact-message"
          rows={7}
          maxLength={CONTACT_MESSAGE_MAX_LENGTH}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-help contact-message-error" : "contact-message-help"}
          className={`${fieldClassName} mt-2 resize-y`}
          {...register("message")}
        />
        <p id="contact-message-help" className="mt-2 text-sm text-muted-foreground">{t("fields.message.help")}</p>
        {errors.message ? <p id="contact-message-error" className="mt-2 text-sm text-destructive">{errorText(errors.message.message)}</p> : null}
      </div>

      <div aria-hidden="true" className="absolute left-[-10000px] top-auto size-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <input type="hidden" {...register("locale")} />
      <input type="hidden" {...register("startedAt", { valueAsNumber: true })} />

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={isSubmitting} className="h-12 px-5 text-base">
          {isSubmitting ? <LoaderCircle aria-hidden="true" className="animate-spin motion-reduce:animate-none" /> : <ArrowRight aria-hidden="true" />}
          {isSubmitting ? t("submit.submitting") : t("submit.idle")}
        </Button>
        <p aria-live="polite" role={status === "failure" || status === "spam" || status === "invalid" ? "alert" : "status"} className="text-sm leading-6 text-fuentivo-secondary">
          {generalMessage}
        </p>
      </div>

      {status === "failure" ? (
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-control font-medium text-primary">
          <MessageCircle aria-hidden="true" className="size-4" />
          {t("status.whatsappFallback")}
        </a>
      ) : null}
    </form>
  );
}
