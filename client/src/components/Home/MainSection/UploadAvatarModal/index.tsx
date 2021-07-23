import React, { ChangeEvent, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'

import { uploadAvatar } from '../../../../services/api'
import { actions as userActions } from '../../../../store/user/userSlice'
import { RootState, AppDispatch } from '../../../../store'
import closeIcon from '../../../../assets/images/closeIcon.svg'
import { Backdrop, Overlay } from './styles'

const UploadAvatarModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [avatar, setAvatar] = useState<string>()
  const [avatarFile, setAvatarFile] = useState<File>()
  const token = useSelector((state: RootState) => state.auth.token)
  const dispatch = useDispatch<AppDispatch>()

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
      setAvatarFile(file)
    }
  }

  const onUploadAvatar = async () => {
    try {
      const formData = new FormData()
      formData.append('avatar', avatarFile)

      const avatar = await uploadAvatar(token, formData)
      dispatch(userActions.setAvatar({ avatar }))
      onClose()
    } catch (err) {
      alert(err.message)
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
            {avatar && (
              <button id="upload" onClick={onUploadAvatar}>
                Upload
              </button>
            )}
          </Overlay>
        </>,
        document.getElementById('modal')
      )}
    </>
  )
}

export default UploadAvatarModal
