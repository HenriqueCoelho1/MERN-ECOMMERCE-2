import React, { useState } from 'react'
import { Menu } from 'antd'
import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux'
import { USER_LOGOUT } from '../actions/types'
import { useHistory } from 'react-router-dom'

const { SubMenu, Item } = Menu

const Header = () => {
    const [current, setCurrent] = useState('home')

    let dispatch = useDispatch()
    let { userLogin } = useSelector((state) => ({ ...state }))
    // let userLogin = useSelector(state => state.userLogin)
    // const { userInfo } = userLogin

    const history = useHistory()

    const handleClick = (e) => {
        setCurrent(e.key)

    }

    const logout = () => {
        firebase.auth().signOut()

        dispatch({
            type: USER_LOGOUT,
            payload: null
        })
        history.push('/login')
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to='/'>Home</Link>
            </Item>

            {!userLogin && (<Item key="register" icon={<UserAddOutlined />} className='float-right'>
                <Link to='/register'>Register</Link>
            </Item>)}

            {!userLogin && (<Item key="login" icon={<UserOutlined />} className='float-right'>
                <Link to='/login'>Login</Link>
            </Item>)}


            {userLogin &&
                (<SubMenu key="SubMenu"
                    icon={<SettingOutlined />}
                    title={userLogin.email && userLogin.email.split('@')[0]}
                    className='float-right'>
                    <Item key="setting:1">Option 1</Item>
                    <Item key="setting:2">Option 2</Item>
                    <Item icon={<LogoutOutlined />} onClick={logout} >Logout</Item>
                </SubMenu>)}
        </Menu>
    )
}

export default Header
