function Loading({ text = "در حال دریافت اطلاعات..." }) {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-white/10 border-t-blue-500" />

        <p className="text-sm text-slate-400">
          {text}
        </p>
      </div>
    </div>
  );
}

export default Loading;