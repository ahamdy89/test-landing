import Image from "next/image";

interface Props {
  openVideoModal: () => void;
  setVideoUrl: (videoUrl: string) => void;
  videos: any;
  locale: string;
}

const isArabic = (title: string) => {
  const pattern = /[\u0600-\u06FF\u0750-\u077F]/;
  const result = pattern.test(title);
  return result;
};

const Section2 = ({ openVideoModal, setVideoUrl, videos, locale }: Props) => {
  const videosList =
    locale === "en"
      ? videos?.items.filter((i: any) => !isArabic(i.snippet.title))
      : videos?.items.filter((i: any) => isArabic(i.snippet.title));

  return (
    <>
      <div className="max-w-screen-mobile relative mb-10 mt-10 grid w-full justify-between gap-x-5 gap-y-12 align-middle laptop:max-w-screen-laptop laptop:grid-cols-3 ">
        {videosList.map((video: any) => {
          return (
            <button
              key={video.id}
              onClick={() => {
                openVideoModal();
                setVideoUrl(
                  `https://www.youtube.com/embed/${
                    video.snippet.resourceId.videoId as string
                  }`
                );
              }}
            >
              <div className="relative flex h-[333px] flex-col rounded-[20px] shadow-xl">
                <span className="absolute rounded-md bg-black/50 p-2 text-sm text-white [inset-block-start:1rem] [inset-inline-end:1rem] rtl:flex-row-reverse">
                </span>
                <div className="-z-10 flex h-2/3 justify-center rounded-t-[20px] bg-[#E3F6F2]">
                  <div className="relative w-full">
                    <Image
                      src={video.snippet.thumbnails.maxres.url}
                      alt={video.snippet.title}
                      fill
                    />
                  </div>
                </div>
                <div className="flex h-1/3 justify-center p-5 align-middle">
                  <h1 className="self-center text-2xl text-[#022821]">
                    {video.snippet.title}
                  </h1>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Section2;
