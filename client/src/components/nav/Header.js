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

    const [home, setHome] = useState('')
    const [shop, setShop] = useState('')
    const dispatch = useDispatch()
    const { user } = useSelector((state) => ({ ...state }))
    const history = useHistory()

    const handleClick = (e) => {
        setHome(e.key)
        setShop(e.key)
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
        <>
            {user && <Menu onClick={handleClick} selectedKeys={[home, shop]} mode="horizontal">
                <div>
                    <Item key="home" icon={<AppstoreOutlined />}>
                        <Link to="/">Home</Link>
                    </Item>
                </div>

                <div className="mr-auto">
                    <Item key="shop" icon={<ShopOutlined />}>
                        <Link to="/shop">Shop</Link>
                    </Item>
                </div>

                <Menu.SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]}>
                    {user && user.role === "subscriber" &&
                        <Item>
                            <Link to="/user/history">Dashboard</Link>
                        </Item>
                    }
                    {user && user.role === "admin" &&
                        <Item>
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </Item>
                    }
                    <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>

                </Menu.SubMenu>


                <span className="ml-auto p-1">
                    <Search />
                </span>

            </Menu>}

            {!user && <Menu onClick={handleClick} selectedKeys={[home]} mode="horizontal">
                <div>
                    <Item key="home" icon={<AppstoreOutlined />}>
                        <Link to="/">Home</Link>
                    </Item>
                </div>

                <div className="mr-auto">
                    <Item key="shop" icon={<ShopOutlined />}>
                        <Link to="/shop">Shop</Link>
                    </Item>
                </div>


                <Item key="register" icon={<UserAddOutlined />}>
                    <Link to="/register">Register</Link>
                </Item>
                <Item key="login" icon={<UserOutlined />}>
                    <Link to="/Login">Login</Link>
                </Item>
                <span className="ml-auto p-1">
                    <Search />
                </span>
            </Menu>}


        </>
    )

}

export default Header