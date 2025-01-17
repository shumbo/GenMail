import React, { ReactNode, useEffect, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import { FiHome, FiMenu, FiMail, FiTwitter, FiSend } from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as GenPlateLogo } from "../assets/icons/GenPlateLogo.svg";
import { ReactComponent as GenPlateLogoDarkMode } from "../assets/icons/GenPlateLogoDarkMode.svg";
import ChangeThemeColor from "./ChangeThemeColor";
import { ReactComponent as JapanFlag } from "../assets/icons/Japan.svg";
import { ReactComponent as UsaFlag } from "../assets/icons/USA.svg";
import { ChevronDownIcon } from "@chakra-ui/icons";
//Use this link for flag SVGs https://uxwing.com/usa-flag-round-circle-icon/

type SidebarProps = {
  children?: JSX.Element | JSX.Element[];
  userLanguage: string;
  setUserLanguage: (lang: string) => void;
};

export default function Sidebar({
  children,
  userLanguage,
  setUserLanguage,
}: SidebarProps) {
  // const [ theme, setTheme ] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Sidebar_Content_Bg = useColorModeValue("gray.200", "gray.900");
  const Sidebar_Body_Bg = useColorModeValue("gray.50", "gray.800");

  return (
    <Box minH="100vh">
      <SidebarContent
        bg={Sidebar_Content_Bg}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        userLanguage={userLanguage}
        setUserLanguage={setUserLanguage}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            userLanguage={userLanguage}
            setUserLanguage={setUserLanguage}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box
        ml={{ base: 0, md: 60 }}
        minH="100vh"
        // bgGradient="linear(to-r, gray.50, gray.50)"
        bg={Sidebar_Body_Bg}
      >
        {children}
      </Box>
    </Box>
  );
}

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
  userLanguage: string;
  setUserLanguage: (lang: string) => void;
}

const SidebarContent = ({
  onClose,
  userLanguage,
  setUserLanguage,
  ...rest
}: SidebarContentProps) => {
  const { t, i18n } = useTranslation();

  interface LinkItemProps {
    name: string;
    link: string;
    icon: IconType;
  }
  const LinkItems: Array<LinkItemProps> = [
    // { name: t("sidebar.home"), link: "home", icon: FiHome },
    { name: t("sidebar.email"), link: "email", icon: FiMail },
    { name: t("sidebar.sns"), link: "sns", icon: FiTwitter },
    { name: t("sidebar.chat"), link: "chat", icon: FiSend },
    // { name: t("sidebar.trend"), icon: FiTrendingUp },
    // { name: t("sidebar.favorite"), icon: FiStar },
    // { name: t("sidebar.settings"), icon: FiSettings },
  ];

  const Sidebar_Border = useColorModeValue("gray.200", "gray.700");
  const SelectLang_Border = useColorModeValue("gray.400", "gray.300");
  const Divider_Color = useColorModeValue("gray.400", "gray.600");
  const { colorMode } = useColorMode();

  return (
    <Box
      borderRight="1px"
      borderRightColor={Sidebar_Border}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        mb="30px"
        mt="40px"
      >
        {colorMode === "dark" ? (
          <GenPlateLogoDarkMode height="140px" width="140px" />
        ) : (
          <GenPlateLogo height="140px" width="140px" />
        )}
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Flex flexDirection={"column"} height="70%">
        <Box>
          {LinkItems.map((link) => (
            <NavItem key={link.name} link={link.link} icon={link.icon}>
              {link.name}
            </NavItem>
          ))}
        </Box>
        <Spacer />
        <Box margin={"20px 15px"}>
          <Divider borderColor={Divider_Color} />
        </Box>
        <Box mt="10px" ml="25px">
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={
                userLanguage === "ja" ? (
                  <JapanFlag margin-right="12px" width="22px" height="22px" />
                ) : (
                  <UsaFlag margin-right="12px" width="22px" height="22px" />
                )
              }
              rightIcon={<ChevronDownIcon />}
              variant="outline"
              borderColor={SelectLang_Border}
            >
              <Text fontWeight="500">
                {userLanguage === "ja" ? t("japanese") : t("english")}
              </Text>
            </MenuButton>
            <MenuList>
              <MenuItem
                minH="48px"
                onClick={(e) => setUserLanguage("ja")}
                icon={
                  <JapanFlag margin-right="12px" width="22px" height="22px" />
                }
              >
                <Text>{t("japanese")}</Text>
              </MenuItem>
              <MenuItem
                minH="40px"
                onClick={(e) => setUserLanguage("en")}
                icon={
                  <UsaFlag margin-right="12px" width="22px" height="22px" />
                }
              >
                <Text>{t("english")}</Text>
              </MenuItem>
            </MenuList>
          </Menu>
          <ChangeThemeColor />
        </Box>
      </Flex>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  link: string;
  children: ReactText;
}
const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  const NavItem_Bg = useColorModeValue("cyan.400", "cyan.600");

  return (
    <Link
      as={ReactRouterLink}
      to={link}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: NavItem_Bg,
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};
