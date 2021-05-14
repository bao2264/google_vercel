import React, { useCallback, useState } from 'react'
import Head from 'next/head'
import Dialog from './dialog'
import Item from './item'

export default function Home() {
  const [visible, setVisible] = useState(false)
  const [list, setList] = useState([])
  const [current, setCurrent] = useState(null)
  const onSubmit = values => {
    if (current) {
      // 修改
      const arr = list.filter(v => v.addr !== current.addr)
      if (arr.find(v => v.addr === values.addr)) return false
      const _arr = list.map(v => {
        if (v.addr === current.addr) {
          return values
        }
        return v
      })
      setList(_arr)
      setVisible(false)
      setCurrent(null)
      return true
    } else {
      // 添加
      if (list.find(v => v.addr === values.addr)) return false
      const arr = list.slice()
      arr.push(values)
      setList(arr)
      setVisible(false)
      return true
    }
  }
  const onCancel = () => {
    setVisible(false)
    setCurrent(null)
  }
  const handleAdd = useCallback(() => setVisible(true))
  const handleEdit = (val) => {
    setCurrent(val)
    setVisible(true)
  }
  const goTo = link => {
    const a = document.createElement('a')
    a.setAttribute('target', '_blank')
    a.href = (link.startsWith("http://") || link.startsWith("https://")) ? link : `https://${link}`
    a.click()
  }
  const handleDel = addr => {
    const arr = list.filter(v => v.addr !== addr)
    setList(arr)
  }
  return (
    <div className="container">
      <Head>
        <title>新标签页</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="logo"></div>
        <div className="links">
        {
          list.map(v => {
            return <Item text={v.name} href={v.addr} key={v.addr} onEdit={handleEdit} onClick={goTo.bind(null, v.addr)} onDelete={handleDel} />
          })
        }
        {
          list.length < 10 ?
          <Item text="添加快捷方式" isDefault={true} onClick={handleAdd} /> :
          null
        }
        </div>
        {
          visible ?
          <Dialog visible={true} onCancel={onCancel} onSubmit={onSubmit} data={current} /> :
          null
        }
      </main>

      <style jsx>{`
        main {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 160px;
        }
        .links {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 577px;
        }
        .logo {
          -webkit-mask-image: url(${'/google_logo.svg'});
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-size: 100%;
          background-color: rgba(53, 105, 116, 1);
          width: 272px;
          height: 92px;
        }
      `}</style>

      <style jsx global>{`
        body {
          background-color: #025a6c;
        }
      `}</style>
    </div>
  )
}
