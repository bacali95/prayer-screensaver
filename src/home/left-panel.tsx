export function LeftPanel() {
  return (
    <div className="w-1/2 bg-[#F2EBE2] text-black relative">
      <img
        className="absolute inset-0 h-full w-full object-cover rotate-180"
        src="/left-panel-background.jpg"
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}
