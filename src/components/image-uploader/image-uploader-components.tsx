import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 86px;
  height: 86px;
  padding: 5px;
  position: relative;
  border-radius: 4px;
  -webkit-transition: all 0.15s ease-in-out;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  flex: 0 0 86px;
  background-color: #e8eaed;
  box-shadow: inset 0px 0px 2px rgba(12, 12, 12, 0.2);
  &::before {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    content: '';
    opacity: 0;
    background-image: url('https://nikegloverteamlogo.s3.us-east-2.amazonaws.com/team/1594196847559-placeholder_camera.png');
    background-repeat: no-repeat;
    background-position: center;
    background-color: hsla(0, 0%, 100%, 0.6);
    transform: scale(1, 1);
    transition: all 0.3s ease;
  }
  &:hover {
    &::before {
      opacity: 1;
      transform: scale(1.1, 1.1);
    }
  }
  ${({ url }: { url: string; active: boolean }) => {
    if (!url) {
      return `&::before {
        opacity: 1
      }`
    }
  }}
  ${({ active }: { url: string; active: boolean }) => {
    if (active) {
      return `
            background-color: #DEEBFF;
          `
    }
  }}
`

export const PreviewImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`

export const SizeError = styled.div`
  color: red;
  position: absolute;
  top: 0;
`

export const ProgressContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`
