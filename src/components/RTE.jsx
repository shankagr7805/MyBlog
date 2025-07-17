import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import "tinymce/tinymce";
import "tinymce/plugins/image";
import "tinymce/plugins/media";

//& Controller ek middleman hota hai jo user se request leta hai, us request ko process karta hai, aur phir response bhejta hai.
//& User button dabaye → Controller uska kaam samjhe → Database ya model se data le → View ko update kare.
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            tinymceScriptSrc="/tinymce/tinymce.min.js"
            apiKey=""
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              base_url: "/tinymce",
              skin_url: "/tinymce/skins/ui/oxide",
              content_css: "/tinymce/skins/content/default/content.css",
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "table",
                "help",
                "wordcount",
                "image",
                "media",
              ],
              toolbar:
                "undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image media | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              images_upload_handler: function (blobInfo) {
                return new Promise((resolve, reject) => {
                  try {
                    const base64 = blobInfo.base64();
                    const mimeType = blobInfo.blob().type;
                    if (!base64 || !mimeType) {
                      throw new Error("Invalid image data");
                    }
                    resolve(`data:${mimeType};base64,${base64}`);
                  } catch (err) {
                    reject("Image upload failed: " + err.message);
                  }
                });
              },
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
