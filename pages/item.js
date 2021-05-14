import React, {useEffect, useState, useRef, useCallback} from 'react'

const Item = props => {
  const [isError, setIsError] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const temp = useRef()
  const {
    text,
    isDefault,
    href,
    onClick,
    onDelete,
    onEdit,
  } = props
  const imgSrc = href && (href.startsWith("http://") || href.startsWith("https://")) ? href : `https://${href}`
  const renderIcon = () => {
    const img = document.createElement('img')
    img.src = `${imgSrc}/favicon.ico`
    img.onerror = () => {
      setIsError(true)
    }
  }
  const handleMouseOver = useCallback(e => {
    setShowEdit(true)
  })
  const handleMouseLeave = useCallback(e => {
    setShowEdit(false)
  })
  const randomColor = () => {
    const r = Math.floor(Math.random()*255)
    const g = Math.floor(Math.random()*255)
    const b = Math.floor(Math.random()*255)
    return 'rgba('+ r +','+ g +','+ b +',1)'
  }
  useEffect(() => {
    temp.current = randomColor()
    !isDefault && renderIcon()
  }, [])
  const handleEditClick = e => {
    e.stopPropagation()
    e.preventDefault()
    setShowMenu(true)
  }
  const handleEdit = e => {
    e.stopPropagation()
    e.preventDefault()
    setShowMenu(false)
    onEdit({name: text, addr: href})
  }
  const handleDelt = e => {
    e.stopPropagation()
    e.preventDefault()
    setShowMenu(false)
    onDelete(href)
  }
  return (
    <div className="wrapper" onClick={onClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <div className="icon">
        {
          isDefault ?
          <img src="/add.png" width="28" /> :
          isError ?
          <span className="texticon" style={{backgroundColor: temp.current, fontSize: 13}}>{text.slice(0,1).toUpperCase()}</span> :
          <img src={`${imgSrc}/favicon.ico`} width="24"></img>
        }
      </div>
      <span className="text">{text}</span>
      {
        showEdit && !isDefault ?
        <img onClick={handleEditClick} className="edit" src="/dot.png" /> :
        null
      }
      {
        showMenu ?
        <div className="menu">
          <span className="menu-item" onClick={handleEdit}>修改快捷方式</span>
          <span className="menu-item" onClick={handleDelt}>移除</span>
        </div> :
        null
      }
      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 112px;
          height: 112px;
          border-radius: 4px;
          cursor: pointer;
          position: relative;
        } 
        .edit {
          position: absolute;
          right: 4px;
          top: 6px;
          width: 16px;
        }
        .menu {
          position: absolute;
          right: 0;
          top: 0;
          width: 132px;
          background-color: #fff;
          padding: 8px 0;
          border-radius: 4px;
          overflow: hidden;
        }
        .menu-item {
          display: block;
          font-size: 13px;
          color: #202124;
          padding: 0 24px;
          height: 32px;
          line-height: 32px;
        }
        .menu-item:hover {
          background-color: rgb(189 193 198);
        }
        .wrapper:hover {
          background-color: rgb(255 255 255 / 10%);
        } 
        .texticon {
          display: inline-block;
          width: 24px;
          height: 24px;
          font-size: 14px;
          color: #fff;
          text-align: center;
          line-height: 24px;
          border-radius: 50%;
        }
        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #000;
          font-size: 28px;
          color: #fff;
          margin-bottom: 12px;
        }
        .text {
          color: rgb(144 210 224);
          font-size: 13px;
        }
      `}</style>
    </div>
  )
}

export default Item