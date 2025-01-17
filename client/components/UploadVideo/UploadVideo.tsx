import { Button, FileInput, Flex, Modal, Progress, Stack, Switch, Text, TextInput } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "react-query";
import { ArrowBigUpLine } from "tabler-icons-react";
import { updateVideo, uploadVideo } from "../../api";
import { video } from "../../interface";

const EditVideoForm = ({ videoId, setOpened, setProgress }: { videoId: string, setOpened: Dispatch<SetStateAction<boolean>>, setProgress: Dispatch<SetStateAction<number>> }) => {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      published: false,
      thumbnail: "update your file (optional)",
    },
  });

  const router = useRouter();
  type input = Parameters<typeof updateVideo>["0"];

  const mutation = useMutation<AxiosResponse<video>, AxiosError, input>(updateVideo, {
    onSuccess: () => {
      setProgress(0);
      setOpened(false);
      router.replace(router.asPath);
    },
    onError: (error: AxiosError) => {
      console.error("Error updating video:", error.message);
      alert("There was an error updating the video. Please try again.");
    },
  });

  const handleSubmit = (values: any) => {
    const { title, description, published, thumbnail } = values;
    mutation.mutate({
      videoId,
      title,
      description,
      published,
      thumbnailPath: thumbnail, 
      _id: "", 
      videoPath: "", 
      extension: "", 
      comments: [], 
      createdAt: "", 
      updatedAt: "", 
      previewPath: "", 
      videoLength: "", 
      user: { 
        _id: "", 
        name: "", 
        surname: "",   
        __v: 0,       
        email: "", 
        photo: "",     
        displayName: "" 
      },
      views: 0, 
      subscribers: [],
      datePublished: "",
      likeId: [],
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label="Title"
          required
          placeholder="Input the title of the video"
          {...form.getInputProps("title")}
        />
        <TextInput
          label="Description"
          required
          placeholder="Input your description of the video"
          {...form.getInputProps("description")}
        />
        <Switch
          label="Published"
          {...form.getInputProps("published")}
        />
        <FileInput
          accept="image/png,image/jpeg, image/bmp, image/jpg, image/tiff"
          label="Thumbnail"
          description="Video thumbnail (optional)"
          radius="md"
          {...form.getInputProps("thumbnail")}
        />
        <Button type="submit">Save</Button>
      </Stack>
    </form>
  );
};

export const UploadVideo = () => {
  const [opened, setOpened] = useState(false);
  const [progress, setProgress] = useState(0);

  const mutation = useMutation(uploadVideo, {
    onError: (error: AxiosError) => {
      console.error("Error uploading video:", error.message);
      alert("There was an error uploading the video. Please try again.");
    },
  });

  const config = {
    onUploadProgress: (progressEvent: ProgressEvent) => {
      const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      setProgress(percent);
    },
  };

  const upload = (files: File[]) => {
    const formData = new FormData();
    formData.append("video", files[0]);
    mutation.mutate({ formData, config });
  };

  return (
    <>
      <Modal
        closeOnClickOutside={false}
        onClose={() => setOpened(false)}
        opened={opened}
        title="Upload Video"
        size="xl"
      >
        {progress === 0 && (
          <Dropzone
            onDrop={(files) => {
              upload(files);
            }}
            accept={[
              "video/mp4",
              "video/mov",
              "video/3gp",
              "video/mkv",
              "video/flv",
            ]}
            multiple={false}
          >
            <Flex
              style={{
                minHeight: "50vh",
              }}
              gap="sm"
              justify="center"
              align="center"
              direction="column"
              wrap="wrap"
            >
              <ArrowBigUpLine />
              <Text>Drag video here or click to find</Text>
            </Flex>
          </Dropzone>
        )}

        {progress > 0 && (
          <Progress
            size="xl"
            label={`${progress}%`}
            value={progress}
            mb="xl"
          />
        )}

        {mutation.data && progress === 100 && (
          <EditVideoForm
            setOpened={setOpened}
            videoId={mutation.data.videoId}
            setProgress={setProgress}
          />
        )}
      </Modal>
      <Button onClick={() => setOpened(true)}>Upload Video</Button>
    </>
  );
};
