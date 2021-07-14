import { useReducer, ChangeEvent } from 'react'

type FormState = Record<
  string,
  {
    value: string
    touched: boolean
    valid: boolean
  }
>

type FormAction = {
  type: string
  input?: {
    field: string
    value?: string
  }
}

export type UseFormProps = Record<
  string,
  {
    value: string
    validationFn: (value: string) => boolean
    nullable: boolean
  }
>

const validation: Record<string, (value: string) => boolean> = {}

function formStateReducer(state: FormState, action: FormAction) {
  const stateCopy = JSON.stringify(state) // security object copy

  if (action.type === 'INPUT_CHANGE') {
    const { field, value } = action.input
    const updatedState = JSON.parse(stateCopy)
    updatedState[field].value = value
    updatedState[field].valid = validation[field](value.trim())
    return updatedState
  }

  if (action.type === 'INPUT_BLUR') {
    const { field } = action.input
    const updatedState = JSON.parse(stateCopy)
    updatedState[field].touched = true
    return updatedState
  }

  if (action.type === 'RESET') {
    const updatedState = JSON.parse(stateCopy)
    for (let field in updatedState) {
      updatedState[field].value = ''
      updatedState[field].touched = false
      updatedState[field].valid = false
    }
    return updatedState
  }

  return state
}

function useForm(fieldsCfg: UseFormProps) {
  const fields: FormState = {}

  Object.entries(fieldsCfg).forEach(
    ([field, { validationFn, value, nullable }]) => {
      validation[field] = validationFn
      fields[field] = { value, touched: false, valid: nullable }
    }
  )

  const [state, formStateDispatch] = useReducer(formStateReducer, fields)

  const formIsValid = Object.keys(state)
    .map(key => state[key].valid)
    .reduce((acc, val) => acc && val)

  const changeInputHandler = (
    field: string,
    event: ChangeEvent<HTMLInputElement>
  ) =>
    formStateDispatch({
      type: 'INPUT_CHANGE',
      input: { field, value: event.target.value }
    })

  const blurInputHandler = (field: string) =>
    formStateDispatch({ type: 'INPUT_BLUR', input: { field } })

  const reset = () => formStateDispatch({ type: 'RESET' })

  return {
    state: { ...state, valid: formIsValid },
    changeInputHandler,
    blurInputHandler,
    reset
  }
}

export default useForm
