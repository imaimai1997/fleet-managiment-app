const Loading = () => {
  return (
    <div className="bg-white p-4 mx-4 mt-4 mb-16 rounded-md border-2 border-gray-200 animate-pulse">
      <div className="flex justify-between mb-6">
        <div className="h-10 bg-gray-200 rounded w-64" />
        <div className="h-10 bg-gray-200 rounded w-24" />
      </div>
      <div className="space-y-3">
        <div className="h-10 bg-gray-200 rounded w-full" />
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-100 rounded w-full" />
        ))}
      </div>
    </div>
  );
};

export default Loading;
