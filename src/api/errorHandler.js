export function getApiErrorMessage(error) {
  const status = error.response?.status;

  if (!error.response) {
    return "ارتباط با سرور برقرار نشد.";
  }

  switch (status) {
    case 400:
      return "اطلاعات ارسال شده صحیح نیست.";

    case 401:
      return "احراز هویت انجام نشده است.";

    case 403:
      return "شما اجازه دسترسی به این بخش را ندارید.";

    case 404:
      return "اطلاعات موردنظر پیدا نشد.";

    case 409:
      return "این اطلاعات قبلاً ثبت شده است.";

    case 422:
      return "اطلاعات وارد شده قابل قبول نیست.";

    case 500:
      return "خطایی در سرور رخ داده است.";

    default:
      return "خطایی در ارتباط با سرور رخ داده است.";
  }
}