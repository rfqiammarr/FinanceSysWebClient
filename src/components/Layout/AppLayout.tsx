import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  AppShell,
  Group,
  NavLink,
  Stack,
  Avatar,
  Menu,
  Box,
  Text,
  Button,
  ThemeIcon,
  useMantineTheme,
  Tooltip,
  Divider,
  Burger,
} from '@mantine/core';
import {
  IconLogout,
  IconHome2,
  IconExchange,
  IconChartBar,
  IconDatabaseCog,
  IconSettings2,
  IconSearch,
  IconBell,
  IconChevronRight,
  IconCreditCard,
} from '@tabler/icons-react';
import classes from './AppLayout.module.css';

interface AppLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  icon: React.ComponentType<Record<string, unknown>>;
  label: string;
  link: string;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useMantineTheme();
  const isDesktop = useMediaQuery('(min-width: 48em)');
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] =
    useDisclosure(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navItems: NavItem[] = [
    { icon: IconHome2, label: 'Dashboard', link: '/dashboard' },
    { icon: IconExchange, label: 'Transaksi', link: '/transactions' },
    { icon: IconChartBar, label: 'Laporan', link: '/reports' },
    { icon: IconDatabaseCog, label: 'Masterdata', link: '/masterdata' },
  ];

  const settingsItems: NavItem[] = [
    { icon: IconSettings2, label: 'Pengaturan', link: '/settings' },
  ];

  const isActive = (link: string) => location.pathname === link;

  const handleLogout = () => {
    navigate('/login');
  };

  const handleNavClick = (link: string) => {
    navigate(link);
    closeMobile();
  };

  const NavItemComponent = ({ icon: Icon, label, link }: NavItem) => {
    const active = isActive(link);

    return (
      <Tooltip label={label} position="right" disabled={!sidebarCollapsed}>
        <NavLink
          key={link}
          label={sidebarCollapsed ? undefined : label}
          leftSection={<Icon size={20} />}
          rightSection={
            active && !sidebarCollapsed ? (
              <IconChevronRight size={16} />
            ) : undefined
          }
          onClick={() => handleNavClick(link)}
          active={active}
          className={classes.navLink}
          classNames={{
            root: `${classes.navLinkRoot} ${active ? classes.navLinkActive : ''}`,
            label: classes.navLinkLabel,
          }}
          styles={{
            root: {
              padding: sidebarCollapsed ? '8px' : '12px 16px',
              borderRadius: '8px',
              transition: 'all 200ms ease',
              marginBottom: '4px',
              backgroundColor: active ? theme.colors.blue[0] : 'transparent',
              borderLeft: active
                ? `3px solid ${theme.colors.blue[6]}`
                : '3px solid transparent',
              '&:hover': {
                backgroundColor: active
                  ? theme.colors.blue[0]
                  : theme.colors.gray[0],
              },
            },
            label: {
              fontSize: '14px',
              fontWeight: 500,
              color: active ? theme.colors.blue[7] : theme.colors.gray[7],
            },
          }}
        />
      </Tooltip>
    );
  };

  const burgerOpened = isDesktop ? !sidebarCollapsed : mobileOpened;
  const handleBurgerClick = () => {
    if (isDesktop) {
      setSidebarCollapsed((v) => !v);
    } else {
      toggleMobile();
    }
  };

  return (
    <AppShell
      padding="0"
      layout="alt"
      header={{ height: { base: 56, sm: 60 } }}
      navbar={{
        width: { base: 280, sm: 260, md: 280 },
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: sidebarCollapsed },
      }}
      transitionDuration={300}
      transitionTimingFunction="ease"
    >
      {/* Header */}
      <AppShell.Header className={classes.header}>
        <Group justify="space-between" h="100%" px={{ base: 'sm', sm: 'md' }} wrap="nowrap">
          {/* Left side: Hamburger (always visible) & Logo */}
          <Group gap={{ base: 'xs', sm: 'md' }} wrap="nowrap" style={{ flexShrink: 0 }}>
            <Box className={classes.burgerWrapper}>
              <Burger
                opened={burgerOpened}
                onClick={handleBurgerClick}
                size="sm"
                aria-label="Toggle navigation"
              />
            </Box>
            <Box>
              <Text fw={700} size={{ base: 'md', sm: 'lg' }} c="blue">
                FinanceSystem
              </Text>
            </Box>
          </Group>

          {/* Right side: Features */}
          <Group gap="md">
            <Tooltip label="Cari">
              <ThemeIcon
                variant="light"
                size="lg"
                radius="md"
                className={classes.headerIcon}
              >
                <IconSearch size={18} />
              </ThemeIcon>
            </Tooltip>

            <Tooltip label="Notifikasi">
              <ThemeIcon
                variant="light"
                size="lg"
                radius="md"
                className={classes.headerIcon}
              >
                <IconBell size={18} />
              </ThemeIcon>
            </Tooltip>

            {/* User Menu */}
            <Menu shadow="md" width={220} position="bottom-end">
              <Menu.Target>
                <Group gap="sm" className={classes.userMenu}>
                  <Box>
                    <Text fw={500} size="sm">
                      Abdullah Ibraheem
                    </Text>
                    <Text size="xs" c="dimmed">
                      Admin
                    </Text>
                  </Box>
                  <Avatar
                    src="https://avatars.githubusercontent.com/u/1?v=4"
                    alt="User"
                    radius="xl"
                    size="md"
                  />
                </Group>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item disabled>
                  <Text fw={600} size="sm">
                    Abdullah.Ibr@example.com
                  </Text>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item leftSection={<Avatar size={24} radius="xl" />}>
                  Profil
                </Menu.Item>
                <Menu.Item leftSection={<IconSettings2 size={16} />}>
                  Pengaturan Akun
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  leftSection={<IconLogout size={16} />}
                  onClick={handleLogout}
                  color="red"
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      {/* Sidebar */}
      <AppShell.Navbar
        className={classes.navbar}
        p={sidebarCollapsed ? '8px' : '12px'}
      >
        <Stack gap="md" h="100%">
          {/* Main Menu */}
          <Stack gap={4}>
            <Text
              size="xs"
              fw={700}
              c="dimmed"
              px="md"
              py="md"
              className={sidebarCollapsed ? classes.hidden : ''}
            >
              MENU UTAMA
            </Text>
            {navItems.map((item) => (
              <NavItemComponent key={item.link} {...item} />
            ))}
          </Stack>

          {/* Settings Menu */}
          <Stack gap={4}>
            <Text
              size="xs"
              fw={700}
              c="dimmed"
              px="md"
              py="md"
              className={sidebarCollapsed ? classes.hidden : ''}
            >
              LAINNYA
            </Text>
            {settingsItems.map((item) => (
              <NavItemComponent key={item.link} {...item} />
            ))}
          </Stack>

          {/* Footer Section */}
          <Stack gap={4} mt="auto">
            <Divider />
            <Box
              p="md"
              style={{
                borderRadius: '8px',
                backgroundColor: theme.colors.blue[0],
              }}
              className={sidebarCollapsed ? classes.hidden : ''}
            >
              <Group justify="space-between" mb="xs">
                <Text fw={600} size="sm">
                  Pro Plan
                </Text>
                <IconCreditCard size={16} color={theme.colors.blue[6]} />
              </Group>
              <Text size="xs" c="dimmed" mb="md">
                Upgrade untuk fitur unlimited
              </Text>
              <Button
                size="xs"
                fullWidth
                variant="filled"
                onClick={() => navigate('/upgrade')}
              >
                Upgrade Sekarang
              </Button>
            </Box>
            <Text mt={20} size="xs" c="dimmed" fw={500}>
              &copy; Rifqi Ammar Ramadhan 2026
            </Text>
          </Stack>
        </Stack>
      </AppShell.Navbar>

      {/* Main Content */}
      <AppShell.Main
        className={classes.main}
        style={{
          backgroundColor: '#e8eaed',
          padding: 0,
          margin: 0,
        }}
      >
        <div className={classes.mainContent}>{children}</div>
      </AppShell.Main>

      {/* Footer */}
      <AppShell.Footer className={classes.footer}>
        <Group justify="space-between" h="100%" px={{ base: 'sm', sm: 'md' }}>
          <Text size="sm" c="dimmed">
            &copy; 2025 FinanceSystem. All rights reserved.
          </Text>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}
