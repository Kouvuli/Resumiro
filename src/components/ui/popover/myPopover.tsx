import React from 'react'
import { Popover } from 'antd'
import { PopoverProps } from 'antd'
import styles from './styles.module.css'

const MyPopover: React.FC<PopoverProps> = ({
  children,
  placement,
  content,
  trigger
}) => {
  return (
    <Popover
      placement={placement}
      content={content}
      trigger={trigger}
      overlayClassName={styles['my-popover']}
      overlayInnerStyle={{ padding: 0 }}
    >
      {children}
    </Popover>
  )
}

export default MyPopover
