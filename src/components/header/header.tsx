import React, { useContext, useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from 'providers'
import { getInitialsFromName } from 'helpers'
import { iconNames } from 'components/icon/icon'
import { Icon } from 'components'
import {
  Container,
  Logo,
  Nav,
  NavItem,
  NavItemContainer,
  NavFocus,
  UserIcon,
  IconContainer,
  Label,
  ToolTipBody,
  ToolTipContainer,
  LogoutText,
  LogoutBox,
  UserImage,
  PreviewImg,
} from './header-components'

type NavItem = {
  path: string
  alternatePath?: string
  icon: keyof typeof iconNames
  label: string
  animate?: boolean
}

export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, unsetUser } = useContext(UserContext)

  const [isInitialized, setIsInitialized] = useState(false)
  const [animateSport, setAnimateSport] = useState(false)
  const [showUserOptions, setShowUserOptions] = useState(false)
  const [activeNavStyles, setActiveNavStyles] = useState<any>({})
  const navRef: any = useRef(null)
  const accountRef: any = useRef(null)

  const { name: userName, userProfileLogo: userLogo, sportId, sportName } = user
  const navItems: NavItem[] = [
    {
      path: '/admin/sports',
      icon: sportId as keyof typeof iconNames,
      label: sportName || sportId,
    },
    {
      path: '/admin/orders',
      alternatePath: '/admin',
      icon: 'home',
      label: 'Designs',
    },
    {
      path: '/admin/teams',
      icon: 'team',
      label: 'Teams',
    },
  ]
  if (sportId !== 'football-ncaa') {
    navItems.push({
      path: '/admin/players',
      icon: 'player',
      label: 'Players',
    })
  }
  navItems.push(
    {
      path: '/admin/styles',
      icon: 'product',
      label: 'Styles',
    },
    {
      path: '/admin/users',
      icon: 'player',
      label: 'Admins',
    },
    {
      path: '/admin/create-order',
      icon: 'add',
      label: '',
    },
  )

  useEffect(() => {
    const timer = isInitialized ? 0 : 200

    setTimeout(() => {
      const activeNavIndex = navItems.findIndex((item) => {
        return item.path === pathname || item.alternatePath === pathname
      })

      if (activeNavIndex > -1) {
        const parentScroll = navRef.current.scrollTop
        const parentObj = navRef.current.getBoundingClientRect()
        const childObj =
          navRef.current.children[activeNavIndex].getBoundingClientRect()

        setActiveNavStyles({
          top: childObj.top - parentObj.top + 10 + parentScroll + 'px',
          height: childObj.height - 22 + 'px',
        })
      }
    }, timer)

    setIsInitialized(true)

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [pathname])

  useEffect(() => {
    setAnimateSport(true)

    setTimeout(() => setAnimateSport(false), 300)
  }, [sportId])

  function handleClickOutside(e: any) {
    if (
      showUserOptions &&
      accountRef.current &&
      !accountRef.current.contains(e.target)
    ) {
      setShowUserOptions(false)
    }
  }

  function logout() {
    unsetUser()
    navigate('/admin/login')
  }

  function UserOptions() {
    return (
      <ToolTipContainer>
        <ToolTipBody>
          <LogoutBox onClick={logout}>
            <Icon name="logout" />
            <LogoutText>Logout</LogoutText>
          </LogoutBox>
        </ToolTipBody>
      </ToolTipContainer>
    )
  }

  function navItem(item: any) {
    return (
      <NavItemContainer
        className={
          item.path === '/admin/sports' && animateSport ? 'animate' : ''
        }>
        <IconContainer>
          <Icon name={item.icon} />
        </IconContainer>
        {item.label && <Label>{item.label}</Label>}
      </NavItemContainer>
    )
  }

  return (
    <Container>
      <Link to="/admin/orders">
        <Logo>
          <IconContainer>
            <Icon name="nike" />
          </IconContainer>
          <Label>Equipment Builder</Label>
        </Logo>
      </Link>

      <Nav ref={navRef}>
        {navItems.map((item, index) => {
          return (
            <NavItem
              active={pathname === item.path || pathname === item.alternatePath}
              key={index}>
              <Link to={item.path}>{navItem(item)}</Link>
            </NavItem>
          )
        })}
        <NavFocus style={activeNavStyles} />
      </Nav>

      <UserIcon ref={accountRef}>
        <UserImage onClick={() => setShowUserOptions(!showUserOptions)}>
          {getInitialsFromName(userName)}
          {userLogo && <PreviewImg image={userLogo} />}
        </UserImage>

        {showUserOptions && <UserOptions />}
      </UserIcon>
    </Container>
  )
}
