import classes from "./ArticleCardSkeleton.module.css";

export default function ArticleCardSkeleton() {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0px_0px_30px] shadow-[rgba(220,220,220,0.5)]">
      <div className={`h-72 w-full ${classes.skeleton || ""}`} />
      <div className="flex flex-wrap p-6">
        <div className={`mb-2 h-4 w-1/2  ${classes.skeleton || ""}`} />
        <div className={`mb-2 h-6 w-full ${classes.skeleton || ""}`}></div>
        <div className="flex w-full items-center gap-2">
          <div className={`h-8 w-8 rounded-full ${classes.skeleton || ""}`} />
          <div className={`h-5 grow ${classes.skeleton || ""}`} />
        </div>
      </div>
    </div>
  );
}
