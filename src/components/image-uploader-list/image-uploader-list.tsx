import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { s3, s3Bucket } from 'helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { ProgressBar } from 'components'
import { Checkbox } from 'components'
import {
  UploadContainer,
  List,
  ListItem,
  ImageContainer,
  PreviewImg,
  ProgressContainer,
  SizeError,
  Overlay,
  ImageOptionsContainer,
  ImageOptionsList,
  ImageOption,
  DeleteBox,
  MobileCreate,
} from './image-uploader-list-components'

type Props = {
  imageList: any[]
  isMultiple?: boolean
  limit?: number
  editable?: boolean
  additionalOptions?: boolean
  onUpdate: (e: any) => void
  onSelect: (e: any, i: number) => void
  onDelete?: (e: any, i: number) => void
  hideUploader?: boolean
}

export default function ImageUploaderList({
  imageList,
  onUpdate,
  onSelect,
  onDelete,
  additionalOptions = false,
  hideUploader = false,
}: Props) {
  const [file, setFile] = useState<any>()
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showProgressBar, setShowProgressBar] = useState(false)
  const [showSizeError, setShowSizeError] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(-1)

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  })

  function onDrop(acceptedFiles: any) {
    if (acceptedFiles.length === 1) {
      setShowSizeError(false)
      acceptFile(acceptedFiles[0])
    } else {
      setShowSizeError(true)
    }
  }

  function acceptFile(newFile: any) {
    setFile(
      Object.assign(newFile, {
        preview: URL.createObjectURL(newFile),
      }),
    )
    uploadFile(newFile)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    minSize: 0,
    maxSize: 2 * 1024 * 1024,
  })

  async function uploadFile(fileObj: any) {
    const params = {
      Bucket: s3Bucket,
      Key: 'order/' + new Date().getTime() + '-' + fileObj.name,
      Body: fileObj,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: `image/*`,
    }

    setUploadProgress(0)
    setShowProgressBar(true)

    s3.upload(params)
      .on('httpUploadProgress', function (evt) {
        const progress = Math.round((evt.loaded / evt.total) * 100)
        setUploadProgress(progress)

        if (progress === 100) {
          setTimeout(() => setShowProgressBar(false), 250)
        }
      })
      .promise()
      .then(function (data: any) {
        onUpdate([...imageList, { src: data.Location }])
        setFile(null)
      })
  }
  function onListImageSelect(obj: any, index: number) {
    if (additionalOptions) {
      if (activeImageIndex !== index) {
        setActiveImageIndex(index)
      } else {
        setActiveImageIndex(-1)
      }
    } else {
      onSelect(obj, index)
    }
  }

  function getAdditionalOptionsClassName(index: number) {
    let colIndex = index + 2
    let className = ['image-options']

    if (colIndex % 4 === 0) {
      className.push('right')
    } else if (colIndex % 4 === 1) {
      className.push('left')
    }

    return className.join(' ')
  }

  function handleDocumentClick(e: any) {
    if (
      !e.target.closest('.image-box') &&
      !e.target.closest('.image-options')
    ) {
      setActiveImageIndex(-1)
    }
  }

  function getPositionIndex(pattern: any, position: string) {
    if (!pattern.position) {
      return -1
    }

    return pattern.position.findIndex((obj: any) => obj.name === position)
  }

  function changeAdditionalOption(obj: any, index: number, position: string) {
    if (!obj.position) {
      obj.position = []
    }
    const positionIndex = getPositionIndex(obj, position)
    if (positionIndex > -1) {
      obj.position.splice(positionIndex, 1)
    } else {
      if (position === 'Right') {
        imageList.forEach((pattern) => {
          if (pattern.position) {
            const prevPositionIndex = getPositionIndex(pattern, 'Right')
            if (prevPositionIndex > -1) {
              pattern.position.splice(prevPositionIndex, 1)
            }
          }
        })
      } else if (position === 'Left') {
        imageList.forEach((pattern) => {
          if (pattern.position) {
            const prevPositionIndex = getPositionIndex(pattern, 'Left')
            if (prevPositionIndex > -1) {
              pattern.position.splice(prevPositionIndex, 1)
            }
          }
        })
      }
      imageList.forEach((imageItem) => {
        if (imageItem.position) {
          const prevPositionIndex = getPositionIndex(obj, position)
          if (prevPositionIndex > -1) {
            imageItem.position.splice(prevPositionIndex, 1)
          }
        }
      })
      obj.position.push({ name: position })
    }
    onSelect(obj, index)
  }

  function deleteImage(e: any, obj: any, index: any) {
    e.stopPropagation()

    if (onDelete) {
      onDelete(obj, index)
    }
  }

  return (
    <List>
      {hideUploader ? null : (
        <ListItem>
          <UploadContainer {...getRootProps()} active={isDragActive}>
            <input {...getInputProps()} />
            <FontAwesomeIcon icon={faPlus} />
            {showSizeError && <SizeError>Size Error</SizeError>}
          </UploadContainer>
        </ListItem>
      )}

      {imageList.map((obj, index) => {
        return (
          <ListItem key={'image-' + index}>
            <ImageContainer
              onClick={() => onListImageSelect(obj, index)}
              className="image-box">
              <PreviewImg src={obj.src} />
              {!hideUploader && (
                <DeleteBox className="cross-hover">
                  <MobileCreate onClick={(e) => deleteImage(e, obj, index)}>
                    <FontAwesomeIcon
                      color="#fff"
                      icon={faTimes}
                      style={{ width: 12, height: 12 }}
                    />
                  </MobileCreate>
                </DeleteBox>
              )}
              {obj.selected && (
                <Overlay>
                  <FontAwesomeIcon icon={faCheck} />
                </Overlay>
              )}
            </ImageContainer>
            {activeImageIndex === index && (
              <ImageOptionsContainer
                className={getAdditionalOptionsClassName(index)}>
                <ImageOptionsList>
                  <ImageOption>
                    <Checkbox
                      label="Right Palm"
                      size="small"
                      value="Right"
                      checked={getPositionIndex(obj, 'Right') > -1}
                      onChange={() =>
                        changeAdditionalOption(obj, index, 'Right')
                      }
                    />
                  </ImageOption>
                  <ImageOption>
                    <Checkbox
                      label="Left Palm"
                      size="small"
                      value="Left"
                      checked={getPositionIndex(obj, 'Left') > -1}
                      onChange={() =>
                        changeAdditionalOption(obj, index, 'Left')
                      }
                    />
                  </ImageOption>
                </ImageOptionsList>
              </ImageOptionsContainer>
            )}
          </ListItem>
        )
      })}

      {file && (
        <ListItem>
          <ImageContainer>
            {file.preview && <PreviewImg src={file.preview} />}
            {showProgressBar && (
              <ProgressContainer>
                <ProgressBar height="3px" progress={uploadProgress} />
              </ProgressContainer>
            )}
          </ImageContainer>
        </ListItem>
      )}
    </List>
  )
}
