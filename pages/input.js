import { useRef, useEffect } from 'react'

const Input = props => {
  const inputRef = useRef()
  const {
    label,
    value,
    onChange,
    isFocus
  } = props
  useEffect(() => {
    isFocus && inputRef.current.focus()
  }, [])
  return (
    <div className="wrapper">
      <label className="label">{label}</label>
      <input value={value} onChange={onChange} ref={inputRef} />
      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          margin-top: 20px;
        }
        .label {
          color: #5f6368;
          font-size: 12px;
          margin-bottom: 8px;
        }
        input {
          border: none;
          outline: none;
          padding: 6px 8px;
          background-color: aliceblue;
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}

export default Input