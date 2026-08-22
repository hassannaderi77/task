export function getApiErrorMessage(error) {
  const status = error.response?.status;
  const apiError = error.response?.data?.error;

  const code = apiError?.code;
  const message = apiError?.message?.toLowerCase() || "";

  // ارتباط با سرور برقرار نشده
  if (!error.response) {
    return "ارتباط با سرور برقرار نشد. لطفاً اتصال اینترنت خود را بررسی کنید.";
  }

  // خطاهای مخصوص تصاویر
  if (message.includes("at least one image is required")) {
    return "لطفاً حداقل یک تصویر انتخاب کنید.";
  }

  if (
    code === "insufficient_tier" ||
    (message.includes("model") && message.includes("restricted"))
  ) {
    return "مدل انتخاب‌شده برای حساب فعلی شما در دسترس نیست.";
  }

  if (
    code === "invalid_image" ||
    message.includes("invalid image") ||
    message.includes("unsupported image")
  ) {
    return "فرمت یا محتوای تصویر قابل پردازش نیست. لطفاً تصویر دیگری انتخاب کنید.";
  }

  if (
    message.includes("image count") ||
    message.includes("too many images")
  ) {
    return "تعداد تصاویر انتخاب‌شده بیشتر از حد مجاز است.";
  }

  // خطاهای عمومی HTTP
  switch (status) {
    case 400:
      return "اطلاعات ارسال‌شده صحیح نیست. لطفاً موارد انتخاب‌شده را بررسی کنید.";

    case 401:
      return "احراز هویت انجام نشد. لطفاً دوباره وارد حساب کاربری شوید.";

    case 403:
      return "شما اجازه دسترسی به این سرویس را ندارید.";

    case 404:
      return "سرویس یا اطلاعات موردنظر پیدا نشد.";

    case 409:
      return "این درخواست با وضعیت فعلی قابل انجام نیست.";

    case 422:
      return "اطلاعات واردشده قابل قبول نیست. لطفاً موارد انتخاب‌شده را بررسی کنید.";

    case 429:
      return "تعداد درخواست‌ها بیش از حد مجاز است. لطفاً کمی بعد دوباره تلاش کنید.";

    case 500:
    case 502:
    case 503:
    case 504:
      return "سرور موقتاً با مشکل مواجه شده است. لطفاً چند لحظه بعد دوباره تلاش کنید.";

    default:
      return "خطایی در ارتباط با سرور رخ داد. لطفاً دوباره تلاش کنید.";
  }
}