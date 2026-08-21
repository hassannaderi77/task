function PageLoading() {
  return (
    <div
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-slate-950 text-white"
    >
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-blue-500" />

        <p className="text-sm text-slate-400">
          در حال بارگذاری صفحه...
        </p>
      </div>
    </div>
  );
}

export default PageLoading;