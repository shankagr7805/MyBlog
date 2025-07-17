import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/configure";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] //& Agar nayi image di hai to upload kro varna null krdo.
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (
        file &&
        post.featuredImage &&
        typeof post.featuredImage === "string" &&
        post.featuredImage.trim().length > 0
      ) {
        try {
          await appwriteService.deleteFile(post.featuredImage);
          console.log("image deleted");
        } catch (error) {
          console.warn("DeleteFile failed:", error.code, error.message);
        }
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        //& Post ki saari fields update karo.
        ...data,
        featuredImage: file ? file.$id : undefined, //& Nayi image mili hai to uska ID rakho.
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
      //& Agar naya post banana hai to :-
    } else {
      let file = null;
      if (data.image && data.image[0]) {
        //& Agar user ne image di hai to upload karo.
        file = await appwriteService.uploadFile(data.image[0]);
      }

      if (file) {
        data.featuredImage = file.$id; //& Upload ki hui image ka ID data mein daal do.
      }

      const dbPost = await appwriteService.createPost({
        ...data,
        userId: userData.$id, //& User ka ID bhi daalo.
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  // const slugTransform = useCallback((value) => {
  //   if (value && typeof value === "string")
  //     // const slug = value.toLowerCase().replace(/ /g, '-')
  //     // setValue('slug' , slug)
  //     // return slug

  //     //& Use above lines or below lines.

  //     return value
  //       .trim()
  //       .toLowerCase()
  //       .replace(/^[a-zA-Z\d]+/g, "-");           //& d:digits s:spaces +:remaining all ^:negation
  //                                                 //& In place of above line you can use {.replace(/\s/g, '-')} to replace spaces.
  //   return "";
  // }, []);

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-") // spaces → single dash
        .replace(/[^a-z0-9-]/g, "") // remove invalid chars
        .replace(/-+/g, "-") // collapse multiple dashes
        .replace(/^-+|-+$/g, ""); // trim leading/trailing dashes
    }
    return "";
  }, []);

  //& Jab bhi title field ki value change ho, automatically slug banake set karo :-

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      //& watch React Hook Form ka function hai jo form ke fields ki value change hone par sunta (listen) hai.
      if (name == "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe(); //& Watch ki subscription ko unsubscribe kar do → memory leak na ho.
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2 ">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
