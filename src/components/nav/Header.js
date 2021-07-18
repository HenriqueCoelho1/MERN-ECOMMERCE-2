import React, { useState } from 'react'
import { Menu } from 'antd'
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined
} from '@ant-design/icons'

const { SubMenu, Item } = Menu

const Header = () => {

    const [home, setHome] = useState('')
    const handleClick = (e) => {
        setHome(e.key)
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[home]} mode="horizontal">
            <Item key="home" icon={<AppstoreOutlined />}>
                Home
            </Item>


            <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Username" className="mr-auto">
                <Item key="setting:1">Register</Item>
                <Item key="setting:2">Option 2</Item>

            </SubMenu>

            <Item key="register" icon={<UserAddOutlined />}>
                Register
            </Item>
            <Item key="login" icon={<UserOutlined />}>
                Login
            </Item>
        </Menu>
    )

}

export default Header