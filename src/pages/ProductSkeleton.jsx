const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-gray-100">
      {/* Image area skeleton */}
      <div className="aspect-square w-full bg-gray-200 rounded-[1.5rem] animate-pulse" />
      
      {/* Text lines skeletons */}
      <div className="mt-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
        
        {/* Button skeleton */}
        <div className="h-10 bg-gray-200 rounded-xl w-full mt-4 animate-pulse" />
      </div>
    </div>
  );
};

export default ProductSkeleton;