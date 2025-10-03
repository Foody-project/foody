export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--text-basic)]">
      <div className="flex flex-col text-center">
        <span className="uppercase text-[6rem] font-bold text-[var(--text-orange)]">
          Error
        </span>
        <span className="text-lg font-thin text-white/60 mt-[-2rem]">
          You can't access this page
        </span>
      </div>
    </div>
  );
}
