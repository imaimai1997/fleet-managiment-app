import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";

const supabase = await createClient();
const bucket = "test";

export const uploadPDF = async (image: File) => {
  const newName = `${Date.now()}.pdf`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, image);

  if (error) {
    console.error("アップロードエラー:", error.message);
    toast.error("画像アップロードに失敗しました", { id: "1" });
    throw new Error(error.message); // エラー内容を明示
  }
  if (!data) throw new Error("画像アップロードに失敗しました");

  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};

export const deletePDF = async (fileURL: string) => {
  const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const filePath = fileURL.replace(
    `https://${supabaseURL}/storage/v1/object/public/${bucket}/`,
    "",
  );
  console.log(filePath);
  const { data, error } = await supabase.storage
    .from(bucket)
    .remove([filePath]);

  if (error) {
    console.error("ファイル削除エラー:", error.message);
    toast.error("ファイル削除に失敗しました", { id: "1" });
  }

  console.log("ファイル削除成功:", data);
  return data;
};

export const replacePDF = async (fileURL: string, newFile: File) => {
  const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const filePath = fileURL.replace(
    `https://${supabaseURL}/storage/v1/object/public/${bucket}/`,
    "",
  );
  await supabase.storage.from(bucket).remove([filePath]);
  const newName = `${Date.now()}.pdf`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, newFile);

  if (error) {
    console.error("ファイル更新エラー:", error.message);
    toast.error("ファイル更新に失敗しました", { id: "1" });
  }

  console.log("ファイル更新成功:", data);
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
