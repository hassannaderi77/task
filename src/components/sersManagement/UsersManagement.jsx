import React, { useState } from "react";

import Loading from "../ui/Loading";

import {
  FiCheck,
  FiCopy,
  FiDownload,
  FiImage,
  FiUsers,
  FiX,
} from "react-icons/fi";
import PreviewImage from "../PreviewImage/PreviewImage";
import DekstopTable from "../dekstopTable/DekstopTable";
import HistoryUserCard from "../HistoryUserCard/HistoryUserCard";

function UsersManagement({
  users,
  usersError,
  isLoadingUsers,
  onClose,
  onHistoryClick,
  selectedUser,
  userHistory,
  isLoadingHistory,
  historyError,
  onCloseHistory,
}) {
  const [copiedItem, setCopiedItem] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);


  const downloadImage = async (imageUrl, fileName) => {
    try {
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error("دانلود تصویر ناموفق بود");
      }

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = fileName;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);

      // اگر fetch به خاطر CORS شکست خورد
      window.open(imageUrl, "_blank");
    }
  };

  const handleCopy = async (text, type, id) => {
    if (!text) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");

        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";

        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        const successful = document.execCommand("copy");

        document.body.removeChild(textArea);

        if (!successful) {
          throw new Error("Clipboard copy failed.");
        }
      }

      const copyId = `${id}-${type}`;

      setCopiedItem(copyId);

      setTimeout(() => {
        setCopiedItem(null);
      }, 2000);
    } catch (error) {
      console.error("Copy error:", error);
    }
  };

  return (
    <div
      className="
        mt-6
        overflow-hidden
        rounded-3xl
        border border-purple-500/20
        bg-gradient-to-br
        from-[#160d2b]/95
        via-[#1d1038]/90
        to-[#0d0718]/95
        shadow-2xl
        shadow-purple-950/30
      "
    >
      {/* Users Header */}
      <div
        className="
          flex flex-col gap-4
          border-b border-purple-500/10
          p-5
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:p-6
        "
      >
        <div>
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                bg-purple-500/10
                text-purple-300
              "
            >
              <FiUsers size={20} />
            </div>

            <div>
              <h2 className="text-xl font-black text-purple-100">
                مدیریت کاربران
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                مشاهده کاربران ثبت شده در سیستم
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="
            flex w-fit items-center gap-2
            rounded-xl
            border border-purple-500/20
            bg-purple-500/10
            px-4 py-2
            text-sm
            text-purple-200
            transition
            hover:bg-purple-500/20
          "
        >
          <FiX size={16} />
          بستن
        </button>
      </div>

      {/* Loading */}
      {isLoadingUsers && (
        <div className="flex justify-center px-5 py-10">
          <Loading />
        </div>
      )}

      {/* Error */}
      {!isLoadingUsers && usersError && (
        <div className="p-5">
          <div
            className="
              rounded-2xl
              border border-red-500/20
              bg-red-500/5
              p-5
              text-center
              text-sm
              text-red-300
            "
          >
            {usersError}
          </div>
        </div>
      )}

      {/* Users */}
      {!isLoadingUsers && !usersError && users.length > 0 && (
        <DekstopTable users={users} onHistoryClick={onHistoryClick} />
      )}

      {/* Empty */}
      {!isLoadingUsers && !usersError && users.length === 0 && (
        <div className="px-5 py-12 text-center">
          <div className="flex justify-center text-purple-400">
            <FiUsers size={42} />
          </div>

          <p className="mt-4 font-bold text-purple-100">
            هنوز کاربری ثبت نشده است
          </p>

          <p className="mt-2 text-sm text-slate-500">
            کاربران ثبت شده در این بخش نمایش داده می‌شوند.
          </p>
        </div>
      )}

      {/* User History */}
      {selectedUser && (
        <HistoryUserCard
          selectedUser={selectedUser}
          onCloseHistory={onCloseHistory}
          isLoadingHistory={isLoadingHistory}
          historyError={historyError}
          userHistory={userHistory}
          setPreviewImage={setPreviewImage}
          downloadImage={downloadImage}
          handleCopy={handleCopy}
          copiedItem={copiedItem}
        />
      )}
      {previewImage && (
        <PreviewImage
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
        />
      )}
    </div>
  );
}

export default UsersManagement;
