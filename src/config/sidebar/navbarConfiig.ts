

interface NavbarItemsProps{
    name: string;
    icon: string;
    link: string;
  }
  
  const navbarItemsDefaultConfig: NavbarItemsProps[] =[
  
        {
          name: "Dashboard",
          icon: "M3 10h7v2H3v2h7v2H3v2h7v2H3v2h7v2h8V4H10v2H8v2H3v2z",
          link: "/dashboard"
        },
        {
          name: "Home",
          icon: "M12 14v2M9 14v2M15 14v2M6 14v2M18 14v2M21 12h2M3 12h2M12 2v2M12 22v2M6 7l6 7 6-7M6 10h12M9 7h6",
          link: "/home"
        },
        {
          name: "Projects",
          icon: "M12 8V4M8 12V8M16 12V8M8 16V12M16 16V12M12 16V12M4 12h8M16 16h4M16 8h4M12 20v-4m4-4h4m-8 4h4M8 20h4M4 4h16v16H4V4z",
          link: "/test"
        },
      
      ];
  
      export {navbarItemsDefaultConfig}
    
    