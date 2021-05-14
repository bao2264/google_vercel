const Button = props => {
  const {
    text,
    onClick,
    className
  } = props
  return (
    <>
      <span onClick={onClick} className={`button ${className}`}>{text}</span>
      <style jsx>{`
        .button {
          padding: 6px 20px;
          font-size: 13px;
          border-radius: 4px;
          border: 1px solid rgb(218 220 224);
          cursor: pointer;
          color: #1a73e8;
        }
        .disabled {
          color: #80868b;
          background-color: rgb(241 243 244);
          border-color: transparent;
        }
        .primary {
          color: #fff;
          border-color: transparent;
          background-color: rgb(26 115 232 / 90%);
        }
      `}</style>
    </>
  )
}

export default Button