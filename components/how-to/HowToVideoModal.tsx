import * as Dialog from "@radix-ui/react-dialog";

interface Props {
  isOpen: boolean;
  close: () => void;
  video: string;
}
export default function HowToVideoModal({ isOpen, close, video }: Props) {
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
          <Dialog.Content className="fixed left-1/2 top-1/2 flex h-[360px]  min-w-[360px] max-w-lg origin-center -translate-x-1/2 -translate-y-1/2 animate-fade-in flex-col overflow-auto rounded laptop:h-[480px] laptop:min-w-[720px]">
            <iframe
              loading="lazy"
              width="100%"
              height="100%"
              src={video}
              title="YouTube video player"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
