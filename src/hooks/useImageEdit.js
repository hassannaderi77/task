import { useMutation } from "@tanstack/react-query";
import { editImage } from "../api/services/imageEditService";

export function useImageEdit() {
  return useMutation({
    mutationFn: editImage,
  });
}