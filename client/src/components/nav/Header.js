import React, { useState } from 'react'
import { Menu } from 'antd'
import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    LogoutOutlined,
    ShopOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT } from '../../actions/types'
import { useHistory } from 'react-router-dom'
import Search from '../form/Search'

const { Item } = Menu



const Header = () => {

    const [current, setCurrent] = useState('')
    const dispatch = useDispatch()
    const { user } = useSelector((state) => ({ ...state }))
    const history = useHistory()

    const handleClick = (e) => {
        setCurrent(e.key)
    }

    const logout = () => {
        firebase.auth().signOut()
        dispatch({
            type: LOGOUT,
            payload: null
        })
        history.push('/login')
    }


    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">
                    Home
                </Link>
            </Item>
            <Item key="shop" icon={<ShopOutlined />} className="mr-auto">
                <Link to="/shop">
                    Shop
                </Link>
            </Item>

            <Item key="search" className="p-2 no-decoration">
                <Search />
            </Item>


            {!user && (
                <Item key="register" icon={<UserAddOutlined />} >
                    <Link to="/register">
                        Register
                    </Link>
                </Item>
            )}

            {!user && (
                <Item key="login" icon={<UserOutlined />}>
                    <Link to="/login">
                        Login
                    </Link>
                </Item>
            )}


            {user && (
                <Menu.SubMenu
                    icon={<SettingOutlined />}
                    title={user.email && user.email.split('@')[0]}
                    key="dashboard"
                >
                    {user && user.role === "subscriber" && (
                        <Item key={user && user.role === "subscriber" && "subscriber"}>
                            <Link to="user/history">Dashboard</Link>
                        </Item>
                    )}
                    {user && user.role === "admin" && (
                        <Item key={user && user.role === "admin" && "admin"}>
                            <Link to="admin/dashboard">Dashboard</Link>
                        </Item>
                    )}
                    <Item icon={<LogoutOutlined />} onClick={logout}>
                        Logout
                    </Item>
                </Menu.SubMenu>
            )}



        </Menu>
    )

}

export default Header