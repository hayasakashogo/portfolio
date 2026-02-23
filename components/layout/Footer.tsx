"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import SocialLinks from "@/components/layout/SocialLinks";

export default function Footer() {
  const [showTerms, setShowTerms] = useState(false);
  const mounted = useSyncExternalStore(() => () => { }, () => true, () => false);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  // モーダル内の wheel event が Lenis に届かないよう stopPropagation
  useEffect(() => {
    const el = modalScrollRef.current;
    if (!el) return;
    const preventLenis = (e: WheelEvent) => e.stopPropagation();
    el.addEventListener("wheel", preventLenis);
    return () => el.removeEventListener("wheel", preventLenis);
  }, [showTerms]);

  useEffect(() => {
    if (showTerms) {
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
  }, [showTerms]);

  return (
    <footer className="py-8" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Top row: SNS links + Terms button */}
        <div className="flex items-center justify-between mb-4">
          <SocialLinks />
          <button
            onClick={() => setShowTerms(true)}
            className="text-xs hover:opacity-70 transition-opacity"
            style={{ color: "var(--muted)", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
          >
            利用規約
          </button>
        </div>

        {/* Bottom rows: copyright + built with */}
        <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>
          © {new Date().getFullYear()} Shogo Hayasaka
        </p>
      </div>

      {/* Terms Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {showTerms && (
            <motion.div
              key="terms-overlay"
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
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                padding: "1rem",
              }}
              onClick={() => setShowTerms(false)}
            >
              <motion.div
                ref={modalScrollRef}
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                  background: "var(--glass-bg)",
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "0.75rem",
                  padding: "1.75rem",
                  width: "100%",
                  maxWidth: "560px",
                  maxHeight: "80vh",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontWeight: 600, fontSize: "1rem", color: "var(--text)" }}>利用規約</p>
                  <button
                    onClick={() => setShowTerms(false)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--muted)",
                      fontSize: "1.25rem",
                      lineHeight: 1,
                      padding: "0.25rem",
                    }}
                    aria-label="閉じる"
                  >
                    ✕
                  </button>
                </div>

                {/* Content */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.875rem", color: "var(--muted)", lineHeight: "1.7" }}>
                  <section>
                    <p style={{ fontWeight: 600, color: "var(--text)", marginBottom: "0.375rem" }}>著作権</p>
                    <p>
                      本サイトに掲載されているすべてのコンテンツ（文章・画像・コードなど）の著作権は Shogo Hayasaka に帰属します。
                      無断での複製・転載・改変はご遠慮ください。
                    </p>
                  </section>

                  <section>
                    <p style={{ fontWeight: 600, color: "var(--text)", marginBottom: "0.375rem" }}>免責事項</p>
                    <p>
                      本サイトに掲載する情報の正確性・完全性について最善を尽くしておりますが、その内容を保証するものではありません。
                      掲載情報によって生じた損害について、当方は一切の責任を負いかねます。
                    </p>
                  </section>

                  <section>
                    <p style={{ fontWeight: 600, color: "var(--text)", marginBottom: "0.375rem" }}>メールアドレスの取り扱い</p>
                    <p>
                      お問い合わせフォームよりご提供いただいたメールアドレスは、ご返信の目的にのみ使用します。
                      第三者への提供・開示、または営業目的での使用は一切行いません。
                    </p>
                  </section>

                  <section>
                    <p style={{ fontWeight: 600, color: "var(--text)", marginBottom: "0.375rem" }}>外部リンクについて</p>
                    <p>
                      本サイトには外部サービスへのリンクが含まれます。リンク先の内容・運営については当方の管理外であり、責任を負いかねます。
                    </p>
                  </section>

                  <section>
                    <p style={{ fontWeight: 600, color: "var(--text)", marginBottom: "0.375rem" }}>お問い合わせ</p>
                    <p>
                      本サイトに関するご質問・ご意見は、Contactフォームよりお気軽にお送りください。
                    </p>
                  </section>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </footer>
  );
}
