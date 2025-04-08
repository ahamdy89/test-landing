import { useTranslation, Trans } from "next-i18next";
import * as Dialog from "@radix-ui/react-dialog";

interface Props {
  isOpen: boolean;
  close: () => void;
}

export default function ThankYouModal({ isOpen, close }: Props) {
  const { t } = useTranslation("business");
  return (
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
        <Dialog.Content className="fixed left-1/2 top-1/2 flex max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-sm origin-center -translate-x-1/2 -translate-y-1/2 animate-fade-in flex-col overflow-auto rounded bg-white p-8 shadow-lg">
          <Dialog.Title className="mb-4 text-brand-primary-dark">
            <Trans t={t} i18nKey="START_TODAY_SUCCESS_MODAL_TITLE" />
          </Dialog.Title>

          <div className="flex flex-col items-center">
            <p className="mb-6 text-center">
              <Trans t={t} i18nKey="START_TODAY_SUCCESS_MODAL_PARAGRAPH" />
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
