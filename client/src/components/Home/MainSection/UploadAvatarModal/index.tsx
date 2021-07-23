import React, { ChangeEvent, useState } from 'react'
import { createPortal } from 'react-dom'

import closeIcon from '../../../../assets/images/closeIcon.svg'
import { Backdrop, Overlay } from './styles'

const UploadAvatarModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [avatar, setAvatar] = useState<string>()

  const onSelectFile = (evt: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader()
    const file = evt.target.files[0]

    if (!file.type.startsWith('image')) {
      alert('Invalid file format')
      return
    }

    fileReader.readAsDataURL(file)
    fileReader.onload = evt => {
      setAvatar(evt.target.result as string)
    }
  }

  return (
    <>
      {createPortal(
        <>
          <Backdrop />
          <Overlay>
            <button aria-label="Close Modal" onClick={onClose}>
              <img src={closeIcon} alt="Close Modal" />
            </button>
            <h1>Do you want upload a new avatar?</h1>
            {avatar && <img src={avatar} alt="" />}
            <input type="file" onChange={onSelectFile} accept="image/*" />
          </Overlay>
        </>,
        document.getElementById('modal')
      )}
    </>
  )
}

export default UploadAvatarModal
