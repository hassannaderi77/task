function ErrorMessage({
  message = "خطایی در دریافت اطلاعات رخ داده است.",
}) {
  return (
    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-center">
      <p className="font-semibold text-red-400">
        {message}
      </p>
    </div>
  );
}

export default ErrorMessage;