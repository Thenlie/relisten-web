const RowLoading = (): JSX.Element => (
  <div className="content h-full animate-pulse">
    <div className="w-1/2 py-1">
      <div className="h-[1em] w-full bg-[#dddddd]" />
    </div>
    <div className="w-2/12">
      <div className="mb-1 h-[0.7em] w-full bg-[#dddddd]" />
      <div className="h-[0.7em] w-full bg-[#dddddd]" />
    </div>
  </div>
);

export default RowLoading;
