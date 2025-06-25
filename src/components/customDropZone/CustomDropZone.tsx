import { useRef, useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import { Group, Text } from "@mantine/core";
import { Dropzone, DropzoneProps } from "@mantine/dropzone";

import uploadIcon from "@icons/upload.svg";
import errorIcon from "@icons/error.svg";
import photoIcon from "@icons/photo.svg";
import addIcon from "@icons/add.svg";
import Button from "@components/common/button/Button";

import "./styles/index.scss";

interface CustomDropZoneProps extends Partial<DropzoneProps> {
  required?: boolean;
  error?: boolean;
  files: File[];
  setFiles: (files: File[]) => void;
  onFilesChange?: (files: File[]) => void;
}

const CustomDropZone = ({
  required,
  error = false,
  onFilesChange,
  files,
  setFiles,
  ...props
}: CustomDropZoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files ? Array.from(event.target.files) : [];
    setFiles([...files, ...newFiles]);
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    onFilesChange?.(files);
  }, [files]);

  return files.length > 0 ? (
    <div
      className={
        required && error && files.length === 0 ? "has-error item" : "item"
      }
    >
      <Button className="button-add" icon={addIcon} onClick={openFileDialog} />
      <input
        type="file"
        accept="image/*,video/*"
        multiple
        hidden
        ref={inputRef}
        onChange={handleInputChange}
      />
      <Carousel
        withIndicators
        height={200}
        slideSize="auto"
        emblaOptions={{ dragFree: true, align: "start" }}
        slideGap="0"
        className="files-carousel"
      >
        {files.map((file, index) => {
          const url = URL.createObjectURL(file);
          const isImage = file.type.startsWith("image");
          const isVideo = file.type.startsWith("video");

          return (
            <Carousel.Slide key={index}>
              {isImage && <img src={url} alt={file.name} />}
              {isVideo && (
                <video controls autoPlay>
                  <source src={url} type={file.type} />
                  Il tuo browser non supporta il video.
                </video>
              )}
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </div>
  ) : (
    <Dropzone
      className={required && error ? "has-error dropzone" : "dropzone"}
      onDrop={(files) => setFiles(files)}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={5 * 1024 ** 2}
      accept={["image/*", "video/*"]}
      {...props}
    >
      <Group
        justify="center"
        gap="xl"
        mih={220}
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <img src={uploadIcon} />
          <div>
            <Text className="full-title" size="xl" inline>
              Carica qui le tue foto e/o video
            </Text>
            <Text className="small-title" size="sm" c="dimmed" inline mt={7}>
              Non superare il limite di 5mb!
            </Text>
          </div>
        </Dropzone.Accept>
        <Dropzone.Reject>
          <img src={errorIcon} />
          <div>
            <Text className="full-title" size="xl" inline>
              Formato non valido
            </Text>
            <Text className="small-title" size="sm" c="dimmed" inline mt={7}>
              Formati accettati: .jpg, .jpeg, .png, .webp, .gif, .svg
            </Text>
          </div>
        </Dropzone.Reject>
        <Dropzone.Idle>
          <img src={photoIcon} />
          <div>
            <Text className="full-title" size="xl" inline>
              Carica qui le tue foto e/o video
            </Text>
            <Text className="small-title" size="sm" c="dimmed" inline mt={7}>
              Non superare il limite di 5mb!
            </Text>
          </div>
        </Dropzone.Idle>
      </Group>
    </Dropzone>
  );
};

export default CustomDropZone;
