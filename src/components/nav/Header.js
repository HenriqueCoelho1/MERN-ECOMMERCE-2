import React, { useState } from 'react'
import { Menu } from 'antd'
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined
} from '@ant-design/icons'
import Link from 'react-router-dom'

const { SubMenu, Item } = Menu

const Header = () => {

    const [home, setHome] = useState('')
    const handleClick = (e) => {
        setHome(e.key)
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[home]} mode="horizontal">
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">Home</Link>
            </Item>


            <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Username" className="mr-auto">
                <Item key="setting:1">Register</Item>
                <Item key="setting:2">Option 2</Item>

            </SubMenu>

            <Item key="register" icon={<UserAddOutlined />}>
                <Link to="/register">Register</Link>
            </Item>
            <Item key="login" icon={<UserOutlined />}>
                <Link to="/Login">Login</Link>
            </Item>
        </Menu>
    )

}

export default Header