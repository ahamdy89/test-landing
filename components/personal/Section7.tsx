import Image from "next/image";
import { useTranslation } from "next-i18next";
import starIcon from "../../public/images/common/star-icon.png";
import { useState } from "react";
import HowToVideoModal from "../how-to/HowToVideoModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../src/components/ui/carousel";
import { cn } from "@/lib/utils";

interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    channelTitle: string;
    resourceId: {
      videoId: string;
    };
  };
}

interface Section7Props {
  videos: {
    items: YouTubeVideo[];
  } | null;
}

interface ParsedTitle {
  company: string;
  position: string;
  names: string;
}

const parseVideoTitle = (title: string): ParsedTitle | null => {
  const [left, right] = title.split(" - ");
  if (!left || !right) {
    return null;
  }

  const firstSpaceIndex = left.indexOf(" ");
  if (firstSpaceIndex === -1) {
    return null;
  }

  const company = left.slice(0, firstSpaceIndex).trim();
  const position = left.slice(firstSpaceIndex).trim();
  const names = right.trim();

  return { company, position, names };
};

export default function Section7({ videos }: Section7Props) {
  const { t } = useTranslation(["personal", "common"]);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string>("");

  if (!videos?.items?.length) {
    return (
      <section className="w-full">
        <div className="bg-main-background-gradient px-9 py-12 text-center text-white tablet:px-20 laptop:px-52">
          <h2 className="text-[40px] font-semibold">
            No testimonials available
          </h2>
        </div>
      </section>
    );
  }

  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(`https://www.youtube.com/embed/${videoId}`);
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
    setSelectedVideo("");
  };

  return (
    <section className="w-full">
      <div className="bg-main-background-gradient px-9 py-12 text-center text-white tablet:px-20 laptop:px-52">
        <h2 className="text-[40px] font-semibold">
          Don&apos;t just take our word for it!
        </h2>
        <p className="mx-auto max-w-2xl pt-8 text-xl font-semibold">
          See what our clients have to say about how axis has transformed their
          operations, enhanced security, and saved time!
        </p>
      </div>

      <div className="flex items-center justify-center px-4 py-12">
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          className="w-full max-w-[1080px] px-6"
        >
          <CarouselContent className=" sm:mx-0  mx-5 gap-5">
            {videos.items.map((video, index) => (
              <CarouselItem
                key={video.id}
                className={cn(
                  "flex w-[19.875rem] basis-auto flex-col rounded-[3.4rem] bg-off-white-card p-2.5",
                  index === videos.items.length - 1 && "mr-5" // Add margin-right to the last item
                )}
                onClick={() =>
                  handleVideoClick(video.snippet.resourceId.videoId)
                }
              >
                <div className="relative cursor-pointer">
                  <Image
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    width={320}
                    height={180}
                    className="h-[17rem] w-full rounded-[3rem] object-cover "
                    priority={false}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-black/50 p-4">
                      <svg
                        className="h-8 w-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-between px-7 pb-8 pt-4">
                  <div className="text-black">
                    {(() => {
                      const parsed = parseVideoTitle(video.snippet.title);
                      return (
                        <>
                          <p className="text-xs font-medium">
                            {parsed?.company}
                          </p>
                          <p className="text-xs font-medium">
                            {parsed?.position}
                          </p>
                          <p className="text-xs font-medium">{parsed?.names}</p>
                        </>
                      );
                    })()}
                  </div>
                  <div className="gap.05 flex items-start">
                    <Image src={starIcon} alt="star-icon" />
                    <Image src={starIcon} alt="star-icon" />
                    <Image src={starIcon} alt="star-icon" />
                    <Image src={starIcon} alt="star-icon" />
                    <Image src={starIcon} alt="star-icon" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>

      <HowToVideoModal
        isOpen={isVideoOpen}
        close={closeVideo}
        video={selectedVideo}
      />
    </section>
  );
}
