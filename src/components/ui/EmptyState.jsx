function EmptyState({
  message = "اطلاعاتی برای نمایش وجود ندارد.",
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
      <div className="mb-3 text-3xl">
        📭
      </div>

      <p className="text-slate-400">
        {message}
      </p>
    </div>
  );
}

export default EmptyState;