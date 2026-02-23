"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/lib/data";
import SectionLabel from "@/components/ui/SectionLabel";
import { contactSchema } from "@/lib/contactSchema";

type FormData = { name: string; email: string; message: string };
type FormErrors = Partial<Record<keyof FormData, string>>;
type TouchedFields = Partial<Record<keyof FormData, boolean>>;
type SubmitStatus = "idle" | "loading" | "success" | "error";

const inputStyle = {
  background: "var(--bg-sub)",
  border: "1px solid var(--border)",
  color: "var(--text)",
  borderRadius: "0.375rem",
  padding: "0.625rem 0.75rem",
  fontSize: "0.875rem",
  width: "100%",
  transition: "border-color 0.15s ease",
} as const;

const inputErrorStyle = {
  ...inputStyle,
  border: "1px solid #f87171",
} as const;

function validateField(field: keyof FormData, value: string): string {
  const result = contactSchema.shape[field].safeParse(value);
  return result.success ? "" : (result.error.issues[0]?.message ?? "");
}

function FieldWrapper({
  label,
  error,
  children,
}: {
  label: string;
  error: string | false | undefined;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
      <label style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{label}</label>
      {children}
      {error && (
        <p style={{ fontSize: "0.75rem", color: "#f87171", marginTop: "0.125rem" }}>{error}</p>
      )}
    </div>
  );
}

const fields: { key: keyof FormData; label: string; type?: string; isTextarea?: boolean }[] = [
  { key: "name", label: "名前" },
  { key: "email", label: "メールアドレス", type: "email" },
  { key: "message", label: "メッセージ", isTextarea: true },
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  useEffect(() => {
    if (showConfirm) {
      window.dispatchEvent(new Event("lenis:stop"));
      document.body.style.overflow = "hidden";
    } else {
      window.dispatchEvent(new Event("lenis:start"));
      document.body.style.overflow = "";
    }
    return () => {
      window.dispatchEvent(new Event("lenis:start"));
      document.body.style.overflow = "";
    };
  }, [showConfirm]);

  const handleChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (touched[field]) {
        setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
      }
    };

  const handleBlur = (field: keyof FormData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, formData[field]) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    const parsed = contactSchema.safeParse(formData);
    if (!parsed.success) {
      const fe = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fe.name?.[0] ?? "",
        email: fe.email?.[0] ?? "",
        message: fe.message?.[0] ?? "",
      });
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirmSend = async () => {
    setShowConfirm(false);
    setSubmitStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus("success");
      } else {
        const json = await res.json();
        setServerError(json.error ?? "送信に失敗しました");
        setSubmitStatus("error");
      }
    } catch {
      setServerError("ネットワークエラーが発生しました");
      setSubmitStatus("error");
    }
  };

  const resetForm = () => {
    setSubmitStatus("idle");
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setTouched({});
    setServerError("");
    setShowConfirm(false);
  };

  const isLoading = submitStatus === "loading";

  return (
    <section id="contact" className="mb-24">
      <SectionLabel>Contact</SectionLabel>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-6 rounded-md p-6"
        style={{
          background: "var(--glass-bg)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          border: "1px solid var(--badge-border)",
        }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          プロジェクトのご相談・お仕事のご依頼など、お気軽にご連絡ください。
          フリーランスとして新しいプロジェクトを随時受け付けています。
        </p>

        {submitStatus === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ textAlign: "center", padding: "2rem 1rem" }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 56,
                height: 56,
                borderRadius: "50%",
                border: "2px solid var(--accent)",
                marginBottom: "1.25rem",
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </motion.div>
            <p style={{ color: "var(--text)", fontWeight: 600, fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              メッセージを送信しました
            </p>
            <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
              お返事は3〜5営業日以内にご連絡します。
            </p>
            <button
              onClick={resetForm}
              style={{
                background: "transparent",
                border: "1px solid var(--accent)",
                color: "var(--accent)",
                padding: "0.5rem 1.25rem",
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              別のメッセージを送る →
            </button>
          </motion.div>
        ) : (
          <form noValidate onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {fields.map(({ key, label, type, isTextarea }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <FieldWrapper label={label} error={touched[key] && errors[key]}>
                  {isTextarea ? (
                    <textarea
                      className="contact-input"
                      style={{
                        ...inputStyle,
                        resize: "none",
                        minHeight: "120px",
                        ...(touched[key] && errors[key] ? { border: "1px solid #f87171" } : {}),
                      }}
                      value={formData[key]}
                      onChange={handleChange(key)}
                      onBlur={handleBlur(key)}
                      placeholder={label}
                      disabled={isLoading}
                    />
                  ) : (
                    <input
                      className="contact-input"
                      type={type ?? "text"}
                      style={touched[key] && errors[key] ? inputErrorStyle : inputStyle}
                      value={formData[key]}
                      onChange={handleChange(key)}
                      onBlur={handleBlur(key)}
                      placeholder={label}
                      disabled={isLoading}
                    />
                  )}
                </FieldWrapper>
              </motion.div>
            ))}

            {submitStatus === "error" && serverError && (
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#f87171",
                  background: "rgba(248,113,113,0.08)",
                  border: "1px solid rgba(248,113,113,0.25)",
                  borderRadius: "0.375rem",
                  padding: "0.625rem 0.75rem",
                }}
              >
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              style={{
                alignSelf: "flex-start",
                background: "transparent",
                border: `1px solid ${isLoading ? "var(--muted)" : "var(--accent)"}`,
                color: isLoading ? "var(--muted)" : "var(--accent)",
                padding: "0.625rem 1.5rem",
                borderRadius: "0.5rem",
                cursor: isLoading ? "not-allowed" : "pointer",
                fontSize: "0.875rem",
                fontWeight: 500,
                transition: "opacity 0.15s ease",
              }}
            >
              {isLoading ? "送信中…" : submitStatus === "error" ? "再試行する" : "送信する"}
            </button>
          </form>
        )}
      </motion.div>

      {/* Confirm Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {showConfirm && (
          <motion.div
            key="confirm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              padding: "1rem",
            }}
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                background: "var(--bg-sub)",
                border: "1px solid var(--border)",
                borderRadius: "0.75rem",
                padding: "1.75rem",
                width: "100%",
                maxWidth: "480px",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <p style={{ fontWeight: 600, fontSize: "1rem", color: "var(--text)" }}>
                送信内容の確認
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { label: "名前", value: formData.name },
                  { label: "メールアドレス", value: formData.email },
                  { label: "メッセージ", value: formData.message },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{label}</span>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--text)",
                        background: "var(--bg)",
                        border: "1px solid var(--border)",
                        borderRadius: "0.375rem",
                        padding: "0.5rem 0.75rem",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setShowConfirm(false)}
                  style={{
                    background: "transparent",
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                    padding: "0.5rem 1.25rem",
                    borderRadius: "0.375rem",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                  }}
                >
                  キャンセル
                </button>
                <button
                  onClick={handleConfirmSend}
                  style={{
                    background: "transparent",
                    border: "1px solid var(--accent)",
                    color: "var(--accent)",
                    padding: "0.5rem 1.25rem",
                    borderRadius: "0.375rem",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  送信する
                </button>
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
