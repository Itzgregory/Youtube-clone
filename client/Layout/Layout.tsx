import { Anchor, AppShell, Avatar, Box, Button, Flex, Group, Header, Menu, Navbar, Text } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { UploadVideo } from '../components'
import { UserLoged } from '../context'
import { Home2, BrandYoutube, DeviceTv, ChevronDown, Settings, Logout } from "tabler-icons-react"
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { LogoutUser } from '../api'
import { useMutation } from 'react-query'
const Layout = ({ children }: { children: React.ReactNode }) => {
    const { user, refetch } = UserLoged()

    const router = useRouter()
    const google = () => {
        router.push("http://localhost:8080/login/google")
    }

    const logout = useMutation(LogoutUser, {
        onSuccess: () => {
            refetch()
            router.push('http://www.google.com/accounts/Logout?continue=http://appengine.google.com/_ah/logout?continue=http://localhost:3000')
        }
    })

    useEffect(() => {
        !user && router.push('/')
    }, [user])


    return (
        <AppShell
            padding="md"
            style={{ 'marginLeft': '3vw' }}
            header={
                <Header height={80} p='xs'>
                    <Box sx={() => ({ display: "flex" })}>
                        <Box sx={() => ({ flex: "1" })}>
                            <Link href={'/'}>
                                <Image src="/logo.jpg" alt='logo' width="150" height="60" />
                            </Link>
                        </Box>
                        <Flex align='center' justify='center'>
                            {user && <UploadVideo />}
                            {!user ?
                                <Button ml='lg' onClick={google} className="button">Login with Google</Button>

                                : <Group position="center" ml='md' mr='md'>
                                    <Menu>
                                        <Menu.Target>
                                            <Flex align='self-end' justify='center'>
                                                <Avatar src={user.photo} radius="xl" />
                                                <ChevronDown size={16} />
                                            </Flex>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item component="a" icon={<Logout size={18} />} onClick={() => logout.mutate()}>
                                                <Text size='md' mr='xs'>Logout</Text>
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Group>
                            }
                        </Flex>
                    </Box>
                </Header>
            }
            navbar={
                <Navbar width={{ base: 100 }} height={500} p='xs'>
                    <Flex
                        direction='column'
                        align='center'
                        justify='center'
                        sx={(theme) => ({
                            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                            textAlign: 'center',
                            padding: theme.spacing.xl,
                            borderRadius: theme.radius.md,
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor:
                                    theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],

                            },
                        })}>
                        <Link href={'/'}>
                            <Flex direction='column' align='center' justify='center' mb='md' sx={{ '&:hover': { scale: '1.1' } }}>
                                <Home2 viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" stroke="#2c3e50" fill="none" size={35} />
                                <Text id='text' weight={400}>Home</Text>

                            </Flex>
                        </Link>
                        {user && <>
                            <Link href={'/videos/myvideos'}>
                                <Flex direction='column' align='center' justify='center' mb='md' sx={{ '&:hover': { scale: '1.1' } }}>
                                    <BrandYoutube viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" stroke="#2c3e50" fill="none" size={35} />
                                    <Text id='text' weight={400}>My Videos</Text>
                                </Flex>
                            </Link>
                            <Link href={'/subs/mysubs'}>
                                <Flex direction='column' align='center' justify='center' sx={{ '&:hover': { scale: '1.1' } }}>
                                    <DeviceTv viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" stroke="#2c3e50" fill="none" size={35} />
                                    <Text id='text' weight={400}>My Subs</Text>
                                </Flex>
                            </Link>
                        </>}
                    </Flex>
                </Navbar>
            }

        >
            <main>
                {children}
            </main>
        </AppShell>
    )

}


export default Layout