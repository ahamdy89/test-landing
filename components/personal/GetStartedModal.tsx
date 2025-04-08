import { useState } from "react";
import { useTranslation, Trans } from "next-i18next";
import confetti from "canvas-confetti";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

interface Props {
  isOpen: boolean;
  close: () => void;
  openSuccessModal: () => void;
}
export default function GetStartedModal({
  isOpen,
  close,
  openSuccessModal,
}: Props) {
  const { t } = useTranslation("personal");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <>
      <Dialog.Root
        modal
        open={isOpen}
        onOpenChange={(open) => {
          if (open) {
            return;
          }

          close();
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 animate-fade-in bg-gray-500 opacity-60" />
          <Dialog.Content className="fixed left-1/2 top-1/2 flex max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-lg origin-center -translate-x-1/2 -translate-y-1/2 animate-fade-in flex-col overflow-auto rounded bg-white p-8 shadow-lg">
            <Dialog.Close asChild>
              <button
                className="absolute end-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full"
                aria-label={t("GET_STARTED_MODAL_CLOSE_LABEL")}
                disabled={isLoading}
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>

            <Dialog.Title className="mb-4 text-brand-primary-dark">
              <Trans t={t} i18nKey="GET_STARTED_MODAL_TITLE" />
            </Dialog.Title>

            <div className="flex flex-col items-center">
              <p className="mb-6 text-center">
                <Trans t={t} i18nKey="GET_STARTED_MODAL_PARAGRAPH" />
              </p>
              <form
                className="flex flex-col gap-4"
                method="POST"
                action="/api/consumer-lead"
                onSubmit={async (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const values = Object.fromEntries(formData.entries());

                  setIsLoading(true);
                  try {
                    await fetch("/api/consumer-lead", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(values),
                    });

                    confetti({
                      particleCount: 100,
                      spread: 70,
                      origin: { y: 0.6 },
                    });
                    setIsSuccessModalOpen(true);
                    close();
                  } catch (error) {
                    setHasError(true);
                  }
                  setIsLoading(false);
                }}
              >
                <fieldset className="flex w-full items-center gap-5">
                  <label htmlFor="name" className="shrink-0 basis-1/3 text-end">
                    <Trans t={t} i18nKey="GET_STARTED_MODAL_FIRST_NAME_LABEL" />
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="flex-1"
                    disabled={isLoading}
                  />
                </fieldset>
                <fieldset className="flex w-full items-center gap-5">
                  <label htmlFor="name" className="shrink-0 basis-1/3 text-end">
                    <Trans t={t} i18nKey="GET_STARTED_MODAL_LAST_NAME_LABEL" />
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="flex-1"
                    disabled={isLoading}
                  />
                </fieldset>
                <fieldset className="flex w-full items-center gap-5">
                  <label
                    htmlFor="email"
                    className="shrink-0 basis-1/3 text-end"
                  >
                    <Trans t={t} i18nKey="GET_STARTED_MODAL_EMAIL_LABEL" />
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="flex-1"
                    inputMode="email"
                    disabled={isLoading}
                  />
                </fieldset>
                <fieldset className="flex w-full items-center gap-5">
                  <label
                    htmlFor="mobile"
                    className="shrink-0 basis-1/3 text-end"
                  >
                    <Trans t={t} i18nKey="GET_STARTED_MODAL_MOBILE_LABEL" />
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    required
                    className="flex-1"
                    pattern="^\d*$"
                    inputMode="tel"
                    disabled={isLoading}
                  />
                </fieldset>
                {hasError && (
                  <p className="animate-shake text-red-500">
                    <Trans t={t} i18nKey="GET_STARTED_MODAL_ERROR" />
                  </p>
                )}
                <div className="flex justify-end">
                  <button
                    className="mt-4 rounded border border-black px-3 py-1 transition-shadow solid-shadow-brand-primary active:shadow-sm active:shadow-brand-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Trans t={t} i18nKey="GET_STARTED_MODAL_LOADING_LABEL" />
                    ) : (
                      <Trans t={t} i18nKey="GET_STARTED_MODAL_SUBMIT_LABEL" />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Dialog.Root
        modal
        open={isSuccessModalOpen}
        onOpenChange={(open) => {
          if (open) {
            return;
          }

          setIsSuccessModalOpen(false);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 animate-fade-in bg-gray-500 opacity-60" />
          <Dialog.Content className="fixed left-1/2 top-1/2 flex max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-sm origin-center -translate-x-1/2 -translate-y-1/2 animate-fade-in flex-col overflow-auto rounded bg-white p-8 shadow-lg">
            <Dialog.Title className="mb-4 text-brand-primary-dark">
              <Trans t={t} i18nKey="GET_STARTED_SUCCESS_MODAL_TITLE" />
            </Dialog.Title>

            <div className="flex flex-col items-center">
              <p className="mb-6 text-center">
                <Trans t={t} i18nKey="GET_STARTED_SUCCESS_MODAL_PARAGRAPH" />
              </p>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
