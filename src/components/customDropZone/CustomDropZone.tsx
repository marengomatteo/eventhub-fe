import { Group, Text } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';

import uploadIcon from "@icons/upload.svg"
import errorIcon from "@icons/error.svg"
import photoIcon from "@icons/photo.svg"

import "./styles/index.scss"
import { useState } from 'react';

const CustomDropZone = (props: Partial<DropzoneProps>) => {
    const [files, setFiles] = useState<File[]>([]);

    return (
        files.length > 0 ? <div>{files.map((file) => <p>{file.name}</p>)}</div> :
            <Dropzone
                className='dropzone'
                onDrop={(files) => setFiles(files)}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={5 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                {...props}
            >
                <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <img src={uploadIcon} />
                        <div>
                            <Text className='full-title' size="xl" inline>
                                Carica qui le tue foto e/o video
                            </Text>
                            <Text className='small-title' size="sm" c="dimmed" inline mt={7}>
                                Non superare il limite di 5mb!
                            </Text>
                        </div>
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <img src={errorIcon} />
                        <div>
                            <Text className='full-title' size="xl" inline>
                                Formato non valido
                            </Text>
                            <Text className='small-title' size="sm" c="dimmed" inline mt={7}>
                                Formati accettati: .jpg, .jpeg, .png, .webp, .gif, .svg                            </Text>
                        </div>
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <img src={photoIcon} />
                        <div>
                            <Text className='full-title' size="xl" inline>
                                Carica qui le tue foto e/o video
                            </Text>
                            <Text className='small-title' size="sm" c="dimmed" inline mt={7}>
                                Non superare il limite di 5mb!
                            </Text>
                        </div>
                    </Dropzone.Idle>


                </Group>
            </Dropzone>
    )
}

export default CustomDropZone;