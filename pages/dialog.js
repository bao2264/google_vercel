import {useState} from 'react'
import Input from './input'
import Button from './button'

const Dialog = props => {
  const { visible, onCancel, onSubmit, data } = props
  const [name, setName] = useState(data ? data.name : '')
  const [addr, setAddr] = useState(data ? data.addr : '')
  const handleSubmit = () => {
    if (!(name && addr)) return
    const params = {
      name,
      addr,
    }
    const res = onSubmit(params)
    if (res) {
      setName('')
      setAddr('')
    }
  }
  const handleCancel = () => {
    setName('')
    setAddr('')
    onCancel()
  }
  return (
    visible ?
    <div className="wrapper">
      <div className="mask"></div>
      <div className="content">
        <h5 className="head">添加快捷方式</h5>
        <Input
          isFocus={true}
          label="名称"
          value={name}
          onChange={e => setName(e.target.value.trim())}
        />
        <Input
          label="网址"
          value={addr}
          onChange={e => setAddr(e.target.value.trim())}
        />
        <div className="buttons">
          <Button text="取消" onClick={handleCancel} />&nbsp;
          <Button text="完成" className={(addr && name) ? 'primary' : 'disabled'} onClick={handleSubmit} />
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background-color: rgba(0,0,0,0.5);
          z-index: -1;
        }
        .content {
          box-sizing: border-box;
          width: 512px;
          height: 267px;
          border-radius: 8px;
          background-color: #fff;
          padding: 20px;
        }
        .head {
          font-size: 15px;
          margin: 0;
          font-weight: normal;
        }
        .buttons {
          display: flex;
          justify-content: flex-end;
          margin-top: 38px;
        }
      `}</style>
    </div> :
    null
  )
}

export default Dialog