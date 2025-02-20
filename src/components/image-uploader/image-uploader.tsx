import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { s3, s3Bucket } from 'helpers'
import { ProgressBar } from 'components'
import {
  Container,
  PreviewImg,
  ProgressContainer,
  SizeError,
} from './image-uploader-components'

type Props = {
  location: 'team' | 'player' | 'profile' | 'palm' | 'boh' | 'diecast'
  url: string
  allowAi?: Boolean
  onUpload: (e: any, name?: String) => void
}

export default function ImageUploader({
  location,
  onUpload,
  url,
  allowAi,
}: Props) {
  const [file, setFile] = useState<any>()
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showProgressBar, setShowProgressBar] = useState(false)
  const [showSizeError, setShowSizeError] = useState(false)

  function onDrop(acceptedFiles: any) {
    if (acceptedFiles.length === 1) {
      if (allowAi) {
        if (acceptedFiles[0].type === 'application/postscript') {
          setShowSizeError(false)
          acceptFile(acceptedFiles[0])
        } else {
          if (acceptedFiles[0].size < 2 * 1024 * 1024) {
            setShowSizeError(false)
            acceptFile(acceptedFiles[0])
          } else {
            setShowSizeError(true)
          }
        }
      } else {
        setShowSizeError(false)
        acceptFile(acceptedFiles[0])
      }
    } else {
      setShowSizeError(true)
    }
  }

  function acceptFile(newFile: any) {
    if (newFile.type === 'application/postscript') {
      setFile(
        Object.assign(newFile, {
          preview: url,
        }),
      )
    } else {
      url = URL.createObjectURL(newFile)
      setFile(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        }),
      )
    }
    uploadFile(newFile)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: allowAi ? 'image/*,application/postscript' : 'image/*',
    minSize: 0,
    maxSize: allowAi ? 25 * 1024 * 1024 : 2 * 1024 * 1024,
  })

  async function uploadFile(fileObj: any) {
    const params = {
      Bucket: s3Bucket,
      Key: location + '/' + new Date().getTime() + '-' + fileObj.name,
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
        if (fileObj.type === 'application/postscript') {
          onUpload(data.Location, fileObj.name)
        } else {
          onUpload(data.Location)
        }
      })
  }

  return (
    <Container {...getRootProps()} url={url} active={isDragActive}>
      <input {...getInputProps()} />
      {url && !file && <PreviewImg src={url} />}
      {file && (
        <>
          {file.preview && <PreviewImg src={file.preview} />}
          {showProgressBar && (
            <ProgressContainer>
              <ProgressBar height="3px" progress={uploadProgress} />
            </ProgressContainer>
          )}
        </>
      )}
      {showSizeError && <SizeError>Size Error</SizeError>}
    </Container>
  )
}
