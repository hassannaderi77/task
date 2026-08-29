import React, { useContext, useState } from "react";
import { FiX } from "react-icons/fi";

import { AuthContext } from "../context/authContext";

import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useHistory } from "../hooks/useHistory";
import MainContainerDashboard from "../components/mainContainerDashboard/MainContainerDashboard";

function HistoryPage() {
  const { user } = useContext(AuthContext);
  const { historyQuery, deleteMutation } = useHistory(user?.id);

  const { data: history = [], isLoading, isError } = historyQuery;

  const [deletingId, setDeletingId] = useState("");
  const [copiedPromptId, setCopiedPromptId] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  

  const handleDelete = async (historyId) => {
  if (!historyId || !user?.id) return;

  const confirmed = window.confirm(
    "آیا از حذف این مورد از تاریخچه مطمئن هستید؟",
  );

  if (!confirmed) return;

  try {
    setDeletingId(historyId);

    await deleteMutation.mutateAsync({
      historyId,
      userId: user.id,
    });
  } catch (error) {
    console.error("Delete history error:", error);
  } finally {
    setDeletingId("");
  }
};

  const handleCopyPrompt = async (text, historyId) => {
    console.log("COPY CLICKED");
    console.log("TEXT:", text);
    console.log("HISTORY ID:", historyId);

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");

        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "-9999px";

        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        const successful = document.execCommand("copy");

        document.body.removeChild(textArea);

        if (!successful) {
          throw new Error("Clipboard copy failed.");
        }
      }

      console.log("COPY SUCCESS");

      setCopiedPromptId(historyId);

      setTimeout(() => {
        setCopiedPromptId("");
      }, 2000);
    } catch (error) {
      console.error("COPY ERROR:", error);
    }
  };

  if (isLoading) {
  return (
    <div
      dir="rtl"
      className="
        flex min-h-screen
        items-center justify-center
        bg-gradient-to-br
        from-[#08040f]
        via-[#160d2b]
        to-[#0d0718]
        px-4
        text-white
      "
    >
      <Loading />
    </div>
  );
}

if (isError) {
  return (
    <div
      dir="rtl"
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#08040f]
        via-[#160d2b]
        to-[#0d0718]
        px-4 py-10
        text-white
      "
    >
      <div className="mx-auto max-w-4xl">
        <ErrorMessage message="دریافت تاریخچه با مشکل مواجه شد" />
      </div>
    </div>
  );
}

  return (
    <div
      dir="rtl"
      className="
        relative min-h-screen
        overflow-hidden
        bg-gradient-to-br
        from-[#08040f]
        via-[#160d2b]
        to-[#0d0718]
        px-3 py-8
        text-white
        sm:px-5
        sm:py-10
      "
    >
      {/* Background glows */}
      <div
        className="
          pointer-events-none absolute
          -right-40 -top-40
          h-80 w-80
          rounded-full
          bg-purple-600/15
          blur-[110px]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-40 -left-40
          h-80 w-80
          rounded-full
          bg-fuchsia-600/10
          blur-[110px]
        "
      />

      {/* Main Container */}

      <MainContainerDashboard
        history={history}
        copiedPromptId={copiedPromptId}
        handleCopyPrompt={handleCopyPrompt}
        setPreviewImage={setPreviewImage}
        deletingId={deletingId}
        handleDelete={handleDelete}
      />

      {previewImage && (
        <div
          className="
      fixed inset-0 z-50
      flex items-center justify-center
      bg-black/80
      p-4
      backdrop-blur-sm
    "
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="
        relative
        max-h-[90vh]
        max-w-5xl
        overflow-hidden
        rounded-2xl
        border border-purple-400/20
        bg-[#0d0718]
        p-2
        shadow-2xl
        shadow-purple-950/50
      "
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="
          absolute
          right-3
          top-3
          z-10
          flex h-9 w-9
          items-center justify-center
          rounded-xl
          border border-white/20
          bg-black/60
          text-white
          backdrop-blur-md
          transition-all
          hover:bg-red-500/70
          active:scale-95
        "
              title="بستن"
              aria-label="بستن پیش‌نمایش"
            >
              <FiX size={18} />
            </button>

            <img
              src={previewImage.src}
              alt={previewImage.title}
              className="
          max-h-[85vh]
          max-w-full
          rounded-xl
          object-contain
        "
            />

            <div
              className="
          absolute
          bottom-4
          left-1/2
          -translate-x-1/2
          rounded-xl
          border border-purple-400/20
          bg-black/70
          px-4 py-2
          text-xs
          font-semibold
          text-purple-100
          backdrop-blur-md
        "
            >
              {previewImage.title}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoryPage;
